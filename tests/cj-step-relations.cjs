/* Run with: node tests/cj-step-relations.cjs. No browser or network required. */
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const root = path.resolve(__dirname, '../src');
const cache = new Map();
const overrides = {
    react: require('react'),
    'components/other': { Link: () => null },
    'utils/formatters': { formatNullableString: value => value || '—' },
    'router/const': { MODELS_PATH: '/models', APPS_PATH: '/apps', VIEW_PATH: '/view', FDM_PATH: '/fdm' },
};
function load(filename) {
    if (cache.has(filename)) return cache.get(filename);
    const exports = {};
    cache.set(filename, exports);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, esModuleInterop: true },
    }).outputText;
    const localRequire = name => {
        if (overrides[name]) return overrides[name];
        const base = name.startsWith('.') ? path.resolve(path.dirname(filename), name) : path.resolve(root, name);
        const target = [base + '.ts', base + '.tsx', path.join(base, 'index.ts')].find(fs.existsSync);
        if (!target) throw new Error(`Unexpected import: ${name}`);
        return load(target);
    };
    new Function('require', 'exports', code)(localRequire, exports);
    return exports;
}
const { relationToDto, relationToFormValues, buildRelationsUpdate, buildRelationsRemoval } = load(path.join(root, 'pages/cx/CJPage/components/BIEditScenario/utils.ts'));
const relation = id => ({ id, productId: id * 10, tcId: id * 20, interfaceId: id * 30, operationId: id * 40, description: `Call ${id}` });
const relations = [relation(1), relation(2), relation(3)];
const original = JSON.parse(JSON.stringify(relations));
const step = { description: 'New call', product: 11, tc: 22, iface: 33, operation: 44, stepName: 'Title' };
const added = buildRelationsUpdate(relations, [step], { mode: 'add' });
assert.deepEqual(added.slice(0, 3), relations.map(relationToDto));
assert.equal(added.length, 4);
assert.equal(added[3].id, undefined);
assert.equal(added[3].operationId, 44);
const edited = buildRelationsUpdate(relations, [{ ...step, id: 999 }], { mode: 'edit', relationId: 2 });
assert.deepEqual(edited[0], relationToDto(relations[0]));
assert.deepEqual(edited[2], relationToDto(relations[2]));
assert.equal(edited[1].id, 2);
assert.equal(edited[1].description, 'New call');
assert.equal(edited[1].productId, 11);
assert.deepEqual(edited.map(item => item.id), [1, 2, 3]);
const cleared = buildRelationsUpdate(relations, [{ description: '', stepName: '' }], { mode: 'edit', relationId: 2 });
assert.deepEqual(cleared[1], { id: 2, description: '', productId: null, tcId: null, interfaceId: null, operationId: null });
assert.deepEqual(buildRelationsRemoval(relations, 2), [relationToDto(relations[0]), relationToDto(relations[2])]);
assert.deepEqual(buildRelationsRemoval([relations[0]], 1), []);
assert.throws(() => buildRelationsRemoval(relations, 999), /больше не существует/);
assert.throws(() => buildRelationsUpdate(relations, [step], { mode: 'edit', relationId: 999 }), /больше не существует/);
for (const mode of ['add', 'edit']) {
    assert.throws(() => buildRelationsUpdate(relations, [], { mode, relationId: 2 }), /один вызов/);
    assert.throws(() => buildRelationsUpdate(relations, [step, step], { mode, relationId: 2 }), /один вызов/);
}
assert.equal(buildRelationsUpdate([], [step, step], { mode: 'initial' }).length, 2);
assert.equal(relationToFormValues(relations[1], 1).id, 2);
assert.equal(relationToFormValues(relations[1], 1).operation, 80);
assert.deepEqual(relations, original);

const { formatRootCalls } = load(path.join(root, 'features/e2e/utils.ts'));
const operations = [{ id: 7, name: 'Real operation', productAlias: 'APP' }];
const discoveredOperations = [{ id: 7, name: 'Unlinked operation' }, { id: 8, name: 'Linked operation', operation: { id: 42 } }];
const rootCall = (id, type, order) => ({ relatedOperationId: id, entityTypeRelatedOperation: type, order, stereotype: '' });
const data = { operations, discoveredOperations, operationsRelations: [rootCall(8, 'discovered_operation', 3), rootCall(7, 'operation', 1), rootCall(7, 'discovered_operation', 2)] };
const calls = formatRootCalls(data);
assert.deepEqual(calls.map(call => call.operationId), [7, null, 42]);
assert.equal(data.operationsRelations[0].order, 3);
assert.deepEqual(formatRootCalls(undefined), []);
const { getE2ECallFields } = load(path.join(root, 'pages/cx/CJPage/components/Table/components/BIScenario/components/ImplementationSources/components/SourceSideBlock/components/E2ECall/utils.tsx'));
const containers = [{ interfaces: [{ id: 5, name: 'Interface', operations: [{ id: 7, name: 'Endpoint', type: 'GET', techCapability: { id: 9, name: 'Capability' } }] }] }];
const fields = getE2ECallFields(calls[0], containers);
assert.equal(fields.find(field => field.label === 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ').value.props.title, 'Capability');
assert.equal(fields.find(field => field.label === 'ИНТЕРФЕЙС').value.props.title, 'Interface');
assert.equal(getE2ECallFields(calls[1], containers).find(field => field.label === 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ').value, '—');
assert.equal(getE2ECallFields(calls[0], [], false, true).find(field => field.label === 'ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ').value, 'Не удалось загрузить');
console.log('CJ single-call updates, removals, and E2E details passed');
