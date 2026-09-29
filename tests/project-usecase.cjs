/* Run with: node tests/project-usecase.cjs (uses the existing TypeScript dependency). */
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '../src');

function load(filename) {
    const module = { exports: {} };
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
        },
    }).outputText;

    new Function('require', 'module', 'exports', code)(require, module, module.exports);
    return module.exports;
}

const usecaseUtils = load(path.join(root, 'api/usecase/utils.ts'));

const createdOnly = {
    name: 'Создание заказа',
    code: 'UC-ORDER',
    createdDate: '2026-09-30T12:00:00',
    updatedDate: null,
};
const updatedLater = {
    id: 7,
    ...createdOnly,
    updatedDate: '2026-09-30T15:00:00',
};
const updatedEarlier = {
    ...createdOnly,
    updatedDate: '2026-09-29T15:00:00',
};

assert.equal(usecaseUtils.getProjectUsecaseModifiedDate(createdOnly), createdOnly.createdDate);
assert.equal(usecaseUtils.getProjectUsecaseModifiedDate(updatedLater), updatedLater.updatedDate);
assert.equal(
    usecaseUtils.getProjectUsecaseModifiedDate(updatedEarlier),
    updatedEarlier.createdDate,
);
assert.equal(usecaseUtils.mapProjectUsecaseSummary(createdOnly).usecaseId, createdOnly.code);
assert.equal(usecaseUtils.mapProjectUsecaseSummary(updatedLater).usecaseId, updatedLater.id);

const projectApiSource = fs.readFileSync(path.join(root, 'api/usecase/index.ts'), 'utf8');
const stagingApiSource = fs.readFileSync(path.join(root, 'api/staging-service/index.ts'), 'utf8');

assert(projectApiSource.includes('v1/project/${params.projectId}/use-cases'));
assert(projectApiSource.includes('v1/use-case/${id}'));
assert(stagingApiSource.includes('v1/pipeline-runs/by-artifact'));
assert(stagingApiSource.includes("params: { 'artifact-uid': artifactUid }"));
assert(stagingApiSource.includes('v1/raw-data/${rawDataRefId}'));

console.log('PASS: project Use Case API routes, identity fallback, and modified-date mapping.');
