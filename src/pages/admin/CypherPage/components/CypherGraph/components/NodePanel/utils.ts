import { formatNullableString } from 'utils/formatters';

import { GraphNode } from '../../types';

export const ROWS: { label: string; getValue: (n: GraphNode) => string }[] = [
    { label: 'ID', getValue: (n) => formatNullableString(n.id) },
    { label: 'Labels', getValue: (n) => formatNullableString(n.label) },
    { label: 'Original name', getValue: (n) => formatNullableString(n.originalName) },
    {
        label: 'Structurizr dsl identifier',
        getValue: (n) => formatNullableString(n.structurizrDslIdentifier),
    },
    { label: 'Name', getValue: (n) => formatNullableString(n.name) },
    { label: 'Description', getValue: (n) => formatNullableString(n.description) },
    { label: 'Technology', getValue: (n) => formatNullableString(n.cmdb) },
    { label: 'Graph tag', getValue: (n) => formatNullableString(n.graphTag) },
    { label: 'External name', getValue: (n) => formatNullableString(n.externalName) },
];
