/* Run with: node tests/usecase-plantuml.cjs. No network or browser required. */
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const root = path.resolve(__dirname, '../src');
function load(filename) {
    const exports = {};
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const localRequire = (name) => load(path.resolve(root, `${name}.ts`));
    new Function('require', 'exports', code)(localRequire, exports);
    return exports;
}
const { getLatestCompletedUsecaseRun } = load(path.join(root, 'api/queries/usecase/utils.ts'));
const run = (runId, status, executionStartedAt, rawDataRefId = runId) => ({
    runId, status, executionStartedAt, startedAt: executionStartedAt, rawDataRefId,
});
const older = run(10, 'completed', '2026-10-01T10:00:00Z');
const latest = run(11, 'completed', '2026-10-02T10:00:00Z');
const failed = run(12, 'failed', '2026-10-03T10:00:00Z');
const pending = run(13, 'awaiting_review', '2026-10-04T10:00:00Z');
const runs = [pending, older, failed, latest];
const original = [...runs];
assert.equal(getLatestCompletedUsecaseRun(runs), latest);
assert.deepEqual(runs, original, 'Selection must not reorder the query data');
assert.equal(getLatestCompletedUsecaseRun([...runs].reverse()), latest);
assert.equal(getLatestCompletedUsecaseRun([]), null);
assert.equal(getLatestCompletedUsecaseRun([failed, pending]), null);
const missingRawData = run(14, 'completed', '2026-10-05T10:00:00Z', null);
assert.equal(getLatestCompletedUsecaseRun([...runs, missingRawData]), missingRawData,
    'Missing raw data must not cause a silent fallback to an older source');
const sameTime = run(15, 'completed', missingRawData.executionStartedAt);
assert.equal(getLatestCompletedUsecaseRun([sameTime, missingRawData]), sameTime);
const timestampWins = run(1, 'completed', '2026-10-06T10:00:00Z');
assert.equal(getLatestCompletedUsecaseRun([...runs, timestampWins]), timestampWins);
console.log('PASS: latest completed Use Case pipeline selection');
