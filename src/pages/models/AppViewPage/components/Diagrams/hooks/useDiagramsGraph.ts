import { useCallback } from 'react';

import { useGetCypherQuery } from 'api/queries/graph';

import { C4Node, GraphData } from '../components';
import { C4Label, GraphTag, PinnedEntry } from '../types';
import {
    c4NodeFromPinnedEntry,
    enumeratePinnedPairs,
    escapeCypherString,
    graphTagPredicate,
    mainLabel,
    mergeGraphData,
    parseGraphFromRows,
    parseNodesFromRows,
} from '../utils';
import {
    buildAnchorQuery,
    buildNeighborhoodQuery,
    buildSearchQuery,
    buildShortestPathQuery,
} from '../utils/cypherBuilders';

export const useDiagramsGraph = () => {
    const { mutateAsync: executeCypher } = useGetCypherQuery();

    const findNodeByStableId = useCallback(
        async (tag: GraphTag, stableId: string): Promise<C4Node | null> => {
            const id = escapeCypherString(stableId.trim());
            const query = `
                MATCH (n)
                WHERE ${graphTagPredicate('n', tag)}
                  AND coalesce(n.name, n.external_name, n.cmdb, toString(n.id)) = '${id}'
                RETURN n
                LIMIT 1
            `.trim();
            const rows = await executeCypher(query);
            const nodes = parseNodesFromRows(rows, 'n');
            return nodes[0] ?? null;
        },
        [executeCypher],
    );

    const searchByLabelAndName = useCallback(
        async (tag: GraphTag, label: C4Label, name?: string): Promise<C4Node[]> => {
            const query = buildSearchQuery(tag, label, name);
            const rows = await executeCypher(query);

            return parseNodesFromRows(rows, 'n');
        },
        [executeCypher],
    );

    const anchorWhereClause = useCallback((node: C4Node, tag: GraphTag, alias: string): string => {
        const mLabel = mainLabel(node.labels);
        const nodeName = escapeCypherString(node.name);
        const label = escapeCypherString(mLabel);
        return `${alias}.name = '${nodeName}' AND '${label}' IN labels(${alias}) AND ${graphTagPredicate(
            alias,
            tag,
        )}`;
    }, []);

    const loadNeighborhoodSubgraph = useCallback(
        async (node: C4Node, tag: GraphTag): Promise<GraphData> => {
            const where = anchorWhereClause(node, tag, 'anchor');

            const anchorQuery = buildAnchorQuery(where);

            const edgesQuery = buildNeighborhoodQuery(where);

            const [anchorRows, edgeRows] = await Promise.all([
                executeCypher(anchorQuery),
                executeCypher(edgesQuery),
            ]);

            return parseGraphFromRows([...anchorRows, ...edgeRows]);
        },
        [anchorWhereClause, executeCypher],
    );

    const emptyGraph = (): GraphData => ({
        nodes: [],
        edges: [],
    });

    const loadMergedSubgraph = useCallback(
        async (selected: C4Node, tag: GraphTag, pins: PinnedEntry[]): Promise<GraphData> => {
            const base = await loadNeighborhoodSubgraph(selected, tag);

            if (pins.length === 0) {
                return base;
            }

            const pinnedMap = new Map(pins.map((p) => [p.id, p]));

            const pairs = enumeratePinnedPairs(
                selected.id,
                pins.map((p) => p.id),
            );

            const resolveNode = (id: string): C4Node | null => {
                if (id === selected.id) {
                    return selected;
                }

                const fromBase = base.nodes.find((n) => n.id === id);

                if (fromBase) {
                    return fromBase;
                }

                const pin = pinnedMap.get(id);

                return pin ? c4NodeFromPinnedEntry(pin) : null;
            };

            const parts = await Promise.all(
                pairs.map(async ([idA, idB]) => {
                    const nodeA = resolveNode(idA);

                    const nodeB = resolveNode(idB);

                    if (!nodeA || !nodeB) {
                        return emptyGraph();
                    }

                    const query = buildShortestPathQuery(nodeA, nodeB, tag, anchorWhereClause);

                    try {
                        const rows = await executeCypher(query);

                        return parseGraphFromRows(rows);
                    } catch {
                        return emptyGraph();
                    }
                }),
            );

            return parts.reduce((acc, part) => mergeGraphData(acc, part), base);
        },
        [anchorWhereClause, executeCypher, loadNeighborhoodSubgraph],
    );

    return { findNodeByStableId, searchByLabelAndName, loadMergedSubgraph };
};
