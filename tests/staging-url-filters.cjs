/* Run with: node tests/staging-url-filters.cjs */
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const root = path.resolve(__dirname, '../src');
let params = new URLSearchParams();
const cache = new Map();
function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText;
    const localRequire = (name) => {
        if (name === 'dayjs') return require('dayjs');
        if (name === 'react-router-dom') return {
            useSearchParams: () => [params, (next, options) => {
                assert.equal(options.replace, true);
                params = next;
            }],
        };
        const target = name.startsWith('.') ? path.resolve(path.dirname(filename), name) : path.resolve(root, name);
        return load([target + '.ts', path.join(target, 'index.ts')].find(fs.existsSync));
    };
    new Function('require', 'module', 'exports', code)(localRequire, module, module.exports);
    return module.exports;
}
const base = path.join(root, 'features/staging/urlFilters');
const { readFilters, buildStagingUrl, writeFilters } = load(path.join(base, 'utils.ts'));
const { useStagingURLFilters } = load(path.join(base, 'index.ts'));
params = new URLSearchParams('id=42&runs.page=7&children.page=3&children.pageSize=25');
useStagingURLFilters('children').setFilters({ search: 'имя & ? / +' });
assert.equal(params.get('id'), '42');
assert.equal(params.get('runs.page'), '7');
assert.equal(readFilters(params, 'children').page, 1);
assert.equal(readFilters(params, 'children').pageSize, 25);
useStagingURLFilters('children').setFilters({ page: 4, pageSize: 50 });
const pipeline = buildStagingUrl('/pipeline', params, ['runs', 'children'], { id: '100', preAdapterRunId: '42' });
const pipelineParams = new URL(pipeline, 'https://example.test').searchParams;
const parent = buildStagingUrl('/pre-adapter', pipelineParams, ['runs', 'children'], { id: '42' });
const restored = new URL(parent, 'https://example.test').searchParams;
assert.equal(readFilters(restored, 'children').search, 'имя & ? / +');
assert.equal(readFilters(restored, 'children').page, 4);
assert.equal(restored.has('preAdapterRunId'), false);
assert.equal(new URL(buildStagingUrl('/runs', restored, ['runs']), 'https://example.test').searchParams.toString(), 'runs.page=7');
params = restored;
useStagingURLFilters('children').resetFilters();
assert.equal(params.get('id'), '42');
assert.equal(params.get('runs.page'), '7');
assert.equal(readFilters(params, 'children').search, '');
assert.equal(readFilters(params, 'children').pageSize, 50);
params = new URLSearchParams('children.search=back&children.page=2');
assert.equal(useStagingURLFilters('children').filters.search, 'back');
assert.equal(useStagingURLFilters('children').filters.page, 2);
const invalid = readFilters(new URLSearchParams('runs.status=invalid&runs.page=-1&runs.pageSize=11&runs.depth=oops&runs.dateRange=2026-02-30,2026-03-01'), 'runs');
assert.equal(invalid.status, null);
assert.equal(invalid.page, 1);
assert.equal(invalid.pageSize, 10);
assert.equal(invalid.depth, '10');
assert.deepEqual(invalid.dateRange, []);
const dates = ['2026-10-01', '2026-10-20'];
const dateParams = writeFilters(new URLSearchParams('uid=a&type=b'), 'runs', { ...invalid, dateRange: dates });
assert.deepEqual(readFilters(dateParams, 'runs').dateRange, dates);
assert.equal(dateParams.get('uid'), 'a');
const searchParams = new URLSearchParams('entities.search=hello&entities.type=3&artifact.search=hit&artifact.depth=50&annotations.search=note');
const artifact = new URL(buildStagingUrl('/artifact', searchParams, ['entities', 'artifact'], { uid: 'a&b', type: 'x/y' }), 'https://example.test');
assert.equal(artifact.searchParams.get('uid'), 'a&b');
assert.equal(readFilters(artifact.searchParams, 'artifact').depth, '50');
assert.equal(artifact.searchParams.has('annotations.search'), false);
console.log('Staging URL filters: passed');
const pickerDates = ['2026-10-01T12:00:00.000Z', '2026-10-20T12:00:00.000Z'];
assert.deepEqual(readFilters(writeFilters(new URLSearchParams(), 'runs', { ...invalid, dateRange: pickerDates }), 'runs').dateRange, dates);
assert.equal(buildStagingUrl('/runs', new URLSearchParams('id=1'), ['runs']), '/runs');
assert.deepEqual(readFilters(new URLSearchParams('runs.dateRange=2026-10-20,2026-10-01'), 'runs').dateRange, []);
