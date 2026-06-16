import { useMemo } from 'react';

import { C4Label } from '../types';
import { filterDirectNeighborhood, mainLabel } from '../utils';

import { IUseDiagramsState } from './types';

export const useDiagramsDerived = (state: IUseDiagramsState) => {
    const graphData = useMemo(() => {
        if (!state.selectedNode) {
            return state.graph;
        }
        if (
            state.selectedNode.labels.includes('SoftwareSystem') ||
            state.pinnedEntries.length > 0
        ) {
            return state.graph;
        }
        return filterDirectNeighborhood(state.graph, state.selectedNode.id);
    }, [state.graph, state.pinnedEntries.length, state.selectedNode]);

    const visibleTypeSet = useMemo(() => {
        const out = new Set<C4Label>();
        (Object.keys(state.typeVisibility) as C4Label[]).forEach((key) => {
            if (state.typeVisibility[key]) {
                out.add(key);
            }
        });
        return out;
    }, [state.typeVisibility]);

    const visibleGraphData = useMemo(() => {
        const nodes = graphData.nodes.filter((node) =>
            visibleTypeSet.has(mainLabel(node.labels) as C4Label),
        );
        const idSet = new Set(nodes.map((node) => node.id));
        const edges = graphData.edges.filter(
            (edge) => idSet.has(edge.source) && idSet.has(edge.target),
        );
        return { nodes, edges };
    }, [graphData, visibleTypeSet]);

    const tagCountByNodeId = useMemo(() => {
        const map = new Map<string, number>();
        Object.entries(state.tagsState).forEach(([id, tags]) => {
            if (tags.length > 0) {
                map.set(id, tags.length);
            }
        });
        return map;
    }, [state.tagsState]);

    return { visibleGraphData, tagCountByNodeId };
};
