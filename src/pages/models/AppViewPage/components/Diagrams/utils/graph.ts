import { C4Node, GraphData, GraphEdge } from '../components';
import { GraphTag } from '../types';

export const graphTagPredicate = (alias: string, tag: GraphTag): string => {
    if (tag === 'All') {
        return 'true';
    }
    return `toLower(coalesce(${alias}.graphTag, '')) CONTAINS '${tag.toLowerCase()}'`;
};

export const dedupeGraphEdges = (edges: GraphEdge[]): GraphEdge[] => {
    const seen = new Set<string>();

    return edges.filter((edge) => {
        const key =
            edge.source + '|' + edge.target + '|' + edge.type + '|' + (edge.technology ?? '');

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
    });
};

export const mergeGraphData = (a: GraphData, b: GraphData): GraphData => {
    const map = new Map<string, C4Node>();
    a.nodes.forEach((n) => map.set(n.id, n));
    b.nodes.forEach((n) => map.set(n.id, n));
    return {
        nodes: Array.from(map.values()),
        edges: dedupeGraphEdges([...a.edges, ...b.edges]),
    };
};

export const cloneGraphData = (graph: GraphData): GraphData => ({
    nodes: graph.nodes.map((n) => ({
        ...n,
        labels: [...n.labels],
        properties: { ...n.properties },
    })),
    edges: graph.edges.map((e) => ({ ...e })),
});

export const filterDirectNeighborhood = (graph: GraphData, anchorId: string): GraphData => {
    const allowed = new Set<string>([anchorId]);
    graph.edges.forEach((e) => {
        if (e.source === anchorId) {
            allowed.add(e.target);
        }
        if (e.target === anchorId) {
            allowed.add(e.source);
        }
    });

    const nodes = graph.nodes.filter((n) => allowed.has(n.id));
    const idSet = new Set(nodes.map((n) => n.id));
    const edges = graph.edges.filter((e) => idSet.has(e.source) && idSet.has(e.target));
    return { nodes, edges };
};

export const enumeratePinnedPairs = (
    selectedId: string,
    pinnedIds: string[],
): Array<[string, string]> => {
    const ids = [...new Set([selectedId, ...pinnedIds])];
    const pairs: Array<[string, string]> = [];
    for (let i = 0; i < ids.length; i += 1) {
        for (let j = i + 1; j < ids.length; j += 1) {
            pairs.push([ids[i]!, ids[j]!]);
        }
    }
    return pairs;
};
