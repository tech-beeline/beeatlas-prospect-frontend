import { nodeDisplayName } from '../../utils';
import { C4Node } from '../GraphCanvas/types';

export const sortNodesByDisplayName = (nodes: C4Node[]): C4Node[] =>
    [...nodes].sort((a, b) =>
        nodeDisplayName(a).localeCompare(nodeDisplayName(b), undefined, {
            sensitivity: 'base',
        }),
    );

export const filterNodesByName = (nodes: C4Node[], query: string): C4Node[] => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
        return nodes;
    }
    return nodes.filter((node) => nodeDisplayName(node).toLowerCase().includes(normalized));
};
