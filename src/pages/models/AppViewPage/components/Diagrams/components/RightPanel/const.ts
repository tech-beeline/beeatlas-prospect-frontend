import { C4Node } from '../GraphCanvas/types';

export const RIGHT_PANEL_WIDTH = 380;

type NodeRow = {
    label: string;
    getValue: (node: C4Node) => unknown;
};

export const ROWS: NodeRow[] = [
    {
        label: 'ID',
        getValue: (node) => node.id,
    },
    {
        label: 'Description',
        getValue: (node) => node.description,
    },
    {
        label: 'Technology',
        getValue: (node) => node.technology,
    },
    {
        label: 'Labels',
        getValue: (node) => node.labels.join(', '),
    },
];
