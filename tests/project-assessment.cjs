/* Run with: node tests/project-assessment.cjs (uses the existing TypeScript dependency). */
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const root = path.resolve(__dirname, '../src');
const cache = new Map();
const requests = [];
let response;
let rejection;
const request = async config => {
    requests.push(config);
    if (rejection) throw rejection;
    return { data: response };
};
const overrides = {
    '@tanstack/react-query': { useQuery: config => config, useMutation: config => config },
    'utils/formatters': { formatNullableNumberParam: () => '' },
    'api/const': { GATEWAY_SOLUTION_CHECKER_URL: '/solution-checker/api/' },
    'utils/api/axiosWrapper': { default: { get: request, post: request } },
};
function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const localRequire = name => {
        if (overrides[name]) return overrides[name];
        const target = name.startsWith('.') ? path.resolve(path.dirname(filename), name) : path.resolve(root, name);
        const resolved = [target + '.ts', path.join(target, 'index.ts')].find(fs.existsSync);
        if (!resolved) throw new Error(`Unexpected import: ${name}`);
        return load(resolved);
    };
    new Function('require', 'module', 'exports', code)(localRequire, module, module.exports);
    return module.exports;
}
const storage = new Map();
global.localStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) };
const base = path.join(root, 'pages/models/ProjectAssessmentAddPage');
const { createDraft, readDraft, writeDraft, removeDraft, draftKey } = load(path.join(base, 'draft.ts'));
const { buildImpact } = load(path.join(base, 'impact.ts'));
const { buildCreateAssessmentDto } = load(path.join(base, 'persistence.ts'));
const { getAssessmentErrorMessage } = load(path.join(base, 'errors.ts'));
const { buildRequirementsMarkdown, buildTechnicalCapabilitiesMarkdown } = load(path.join(base, 'markdownExport.ts'));

async function main() {
    const draft = createDraft();
    assert.equal(draft.stepVariant, 'BUSINESS_STATEMENT');
    draft.stepVariant = 'TECHNICAL_CAPABILITIES';
    draft.technicalState = 'processing';
    draft.technicalTaskId = 'task-1';
    draft.savedData.businessDescription = 'Project A';
    draft.savedData.confluencePat = 'secret';
    draft.savedData.pageName = 'Report';
    writeDraft('a', draft);
    assert.equal(readDraft('a').technicalTaskId, 'task-1');
    assert.equal(readDraft('a').technicalState, 'processing');
    assert.equal(readDraft('a').stepVariant, 'TECHNICAL_CAPABILITIES');
    assert.equal(readDraft('a').savedData.pageName, 'Report');
    assert.equal(readDraft('b').savedData.businessDescription, '');
    assert.equal(readDraft('b').stepVariant, 'BUSINESS_STATEMENT');
    assert(!storage.get(draftKey('a')).includes('secret'));
    const other = createDraft(); other.savedData.businessDescription = 'Project B'; writeDraft('b', other);
    assert.equal(readDraft('a').savedData.businessDescription, 'Project A');
    removeDraft('a'); assert.equal(storage.has(draftKey('a')), false);
    draft.technicalState = 'starting'; writeDraft('a', draft);
    assert.equal(readDraft('a').technicalState, 'error');
    draft.technicalState = 'processing'; draft.technicalTaskId = null; writeDraft('a', draft);
    assert.equal(readDraft('a').technicalState, 'error');
    storage.set(draftKey('a'), '{broken');
    assert.equal(readDraft('a').stepVariant, 'BUSINESS_STATEMENT');
    storage.set(draftKey('a'), JSON.stringify({ ...draft, version: 99 }));
    assert.equal(readDraft('a').stepVariant, 'BUSINESS_STATEMENT');
    draft.savedData.technicalCapabilities = [{ id: 'bad', name: 'broken', systems: [], frIds: [], matches: [null], decision: 'pending' }];
    writeDraft('a', draft); assert.equal(readDraft('a').stepVariant, 'BUSINESS_STATEMENT');
    const original = global.localStorage;
    global.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } };
    assert.equal(readDraft('a').stepVariant, 'BUSINESS_STATEMENT');
    assert.throws(() => writeDraft('a', createDraft()), /quota/);
    global.localStorage = original;

    const candidate = (code, decision = 'new') => ({ id: code, name: code, description: '', frIds: ['FR-1'], decision, systems: ['UNSELECTED'], system: { code, name: code } });
    for (const [count, level] of [[0, 'S'], [1, 'S'], [2, 'M'], [3, 'L'], [4, 'L'], [5, 'XL'], [8, 'XL']]) {
        assert.equal(buildImpact(Array.from({ length: count }, (_, index) => candidate(String(index)))).impactLevel, level);
    }
    assert.deepEqual(buildImpact([candidate('A'), candidate('A'), candidate('B', 'excluded'), candidate('C', 'pending')]).systems, ['A']);
    const reuse = { ...candidate('unused', 'reused'), selectedCapabilities: [
        { code: 'TC-1', name: 'One', system: { code: 'A', name: 'Alpha' }, parentBc: { code: 'BC-1', name: 'BC' } },
        { code: 'TC-2', name: 'Two', system: { code: 'B', name: 'Beta' } },
    ] };
    const impact = buildImpact([reuse]);
    assert.deepEqual(impact.systems, ['A', 'B']);
    assert.equal(impact.tcs.length, 2);
    assert.equal(impact.tcs[0].parent_bc.code, 'BC-1');
    assert.deepEqual(impact.tcs[0].fr_ids, ['FR-1']);
    assert.equal(buildImpact([{ ...reuse, selectedCapabilities: [] }]).systems.length, 0);
    assert.equal(getAssessmentErrorMessage({ response: { data: { detail: [{ msg: 'Invalid input' }] } } }), 'Invalid input');

    const requirementsMarkdown = buildRequirementsMarkdown([
        { id: 'FR-1', title: 'Use | pipe', description: 'Line 1\nLine 2', type: 'FR' },
        { id: 'NFR-1', title: 'Fast', description: 'Under 1 second', type: 'NFR' },
        { id: 'OQ-1', title: 'Who approves?', description: '', type: 'OQ' },
    ]);
    assert(requirementsMarkdown.includes('## Функциональные требования'));
    assert(requirementsMarkdown.includes('## Нефункциональные требования'));
    assert(requirementsMarkdown.includes('## Вопросы для уточнения'));
    assert(requirementsMarkdown.includes('Use \\| pipe'));
    assert(requirementsMarkdown.includes('Line 1<br>Line 2'));
    const capabilitiesMarkdown = buildTechnicalCapabilitiesMarkdown([reuse]);
    assert(capabilitiesMarkdown.includes('TC-1 — One'));
    assert(capabilitiesMarkdown.includes('TC-2 — Two'));

    const dto = buildCreateAssessmentDto(42, { ...createDraft().savedData, requirements: [{ id: 'FR-1', title: 'Functional', description: 'Description', type: 'FR' }], technicalCapabilities: [] }, 'S');
    assert.equal(dto.projectId, 42); assert.equal(dto.requirementsFunc[0].uniqueIdent, 'FR-1');
    assert.equal('bc' in dto, false);
    const contractDto = buildCreateAssessmentDto(42, { ...createDraft().savedData, technicalCapabilities: [
        { ...candidate('NEW'), parentBc: { code: 'BC-NEW', name: 'New BC' }, system: { code: 'APP-NEW', name: 'New App' } },
        { ...reuse, selectedCapabilities: [{ ...reuse.selectedCapabilities[0], system: { code: 'APP-OLD', name: 'Existing App' }, parentBc: { code: 'BC-OLD', name: 'Existing BC' } }] },
    ] }, 'M');
    assert.deepEqual(contractDto.designTc[0], { name: 'NEW', description: '', productAlias: 'APP-NEW', productName: 'New App', parentBcCode: 'BC-NEW', frIds: ['FR-1'] });
    assert.deepEqual(contractDto.tc[0], { tcCode: 'TC-1', productAlias: 'APP-OLD', productName: 'Existing App', parentBcCode: 'BC-OLD', frIds: ['FR-1'] });

    // Exercise actual query adapters against API-shaped fixtures; no network or React renderer.
    const api = load(path.join(root, 'api/queries/projects/assessment.ts'));
    response = { task_id: 'live-task' };
    await api.useStartTechnicalCandidatesMutation().mutationFn({ requirements: [{ id: 'FR-1', type: 'FR' }], taskDescription: 'summary' });
    assert.equal(requests.at(-1).url, '/solution-checker/api/tc/identify/start');
    assert.equal(requests.at(-1).data.task_description, 'summary');
    assert.equal(requests.at(-1).data.structured_requirements[0].id, 'FR-1');
    response = { candidates: [{ name: 'Candidate', description: 'D', rationale: 'R', fr_ids: ['FR-1'] }] };
    const discovered = await api.useGetTechnicalCandidatesResultQuery('live-task', true).queryFn();
    assert.deepEqual(discovered.candidates[0].frIds, ['FR-1']);
    assert(Number.isFinite(discovered.candidates[0].score));
    response = { task_id: 'catalog-task' };
    await api.useStartCatalogAnalysisMutation().mutationFn({ candidates: discovered.candidates });
    assert.deepEqual(requests.at(-1).data, { candidates: [{ name: 'Candidate', description: 'D' }] });
    response = { results: [{ candidate_name: 'Candidate', bcs: [{ code: 'BC-1', name: 'BC', description: 'B', score: .8, tcs: [{ code: 'TC-1', name: 'TC', description: 'T', score: .9, system_code: 'A', system_name: 'Alpha' }] }] }] };
    const catalog = await api.useGetCatalogAnalysisResultQuery('catalog-task', true).queryFn();
    assert.equal(catalog.candidates[0].matches[0].technicalCapabilities[0].system.code, 'A');
    assert.equal(catalog.candidates[0].matches[0].technicalCapabilities[0].relevance, 90);
    response = { results: [{ candidate_name: 'Candidate', bcs: [] }] };
    assert.deepEqual((await api.useGetCatalogAnalysisResultQuery('empty', true).queryFn()).candidates[0].matches, []);
    response = { done: true, error: 'Task failed' };
    const progress = api.useGetCatalogAnalysisProgressQuery('failed', true);
    await assert.rejects(progress.queryFn, /Task failed/);
    assert.equal(progress.refetchInterval({ state: { error: new Error('404') } }), false);
    assert.equal(progress.refetchInterval({ state: { data: { done: true } } }), false);
    assert.equal(progress.refetchInterval({ state: { data: { done: false } } }), 2000);
    rejection = new Error('task expired');
    await assert.rejects(api.useGetTechnicalCandidatesProgressQuery('expired', true).queryFn, /task expired/);
    rejection = undefined;
    response = new Blob(['# HLD']);
    const payload = { title: 'Report', source: 'text', impact_tcs: impact.tcs, structured_requirements: [], task_description: 'Summary', impact_level: 'M' };
    assert.equal(await api.useExportAssessmentMutation().mutationFn(payload), response);
    assert.equal(requests.at(-1).responseType, 'blob');
    response = { confluence_url: 'https://example.org/report' };
    assert.equal((await api.usePublishAssessmentMutation().mutationFn({ ...payload, pat: 'token', parent_page_url: 'https://example.org/parent' })).confluence_url, response.confluence_url);
    assert.equal(requests.at(-1).data.impact_tcs.length, 2);
    console.log('PASS: project isolation, draft restoration, interrupted tasks, storage failures, impact boundaries, multi-selection, API contracts, polling failures, export and publish.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
