import { C4Node, DiagramLayoutPersist, GraphData, GraphEdge } from './components';
import { KNOWN_LABELS, LAYOUT_STORAGE_PREFIX, PINNED_STORAGE_PREFIX } from './const';
import {
    type ICypherDiagram,
    type ICypherNode,
    type ICypherRelationship,
    C4Label,
    GraphTag,
    PinnedEntry,
} from './types';

export const nodeDisplayName = (node: C4Node): string => {
    const originalName = node.properties.originalName;
    if (typeof originalName === 'string' && originalName.trim()) {
        return originalName.trim();
    }
    if (typeof node.name === 'string' && node.name.trim()) {
        return node.name.trim();
    }
    return node.id;
};

export const layoutStorageKey = (productAlias: string, anchorNodeId: string) =>
    `${LAYOUT_STORAGE_PREFIX}${productAlias}::${anchorNodeId}`;

export const dedupeGraphEdges = (edges: GraphEdge[]): GraphEdge[] => {
    const seen = new Set<string>();

    return edges.filter((edge) => {
        const key = `${edge.source}|${edge.target}|${edge.type}|${edge.technology ?? ''}`;

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

const isCypherNode = (value: unknown): value is ICypherNode =>
    typeof value === 'object' &&
    value !== null &&
    'labels' in value &&
    Array.isArray((value as ICypherNode).labels) &&
    'properties' in value &&
    typeof (value as ICypherNode).properties === 'object' &&
    (value as ICypherNode).properties !== null;

const isCypherRelationship = (value: unknown): value is ICypherRelationship =>
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as ICypherRelationship).type === 'string' &&
    'properties' in value &&
    typeof (value as ICypherRelationship).properties === 'object' &&
    (value as ICypherRelationship).properties !== null;

export const stableNodeId = (raw: ICypherNode): string => {
    const props = raw.properties as ICypherNode['properties'] & Record<string, unknown>;
    const name =
        (typeof props.name === 'string' && props.name.trim()) ||
        (typeof props.external_name === 'string' && props.external_name.trim()) ||
        (typeof props.cmdb === 'string' ? props.cmdb : undefined) ||
        (props.id != null ? String(props.id) : undefined);
    if (name != null && name !== '') {
        return String(name);
    }
    return `${(raw.labels ?? []).join(':')}:${JSON.stringify(props)}`;
};

export const toC4Node = (raw: ICypherNode): C4Node => {
    const labels = raw.labels ?? [];
    const props = raw.properties as unknown as Record<string, unknown>;
    const id = stableNodeId(raw);
    return {
        id,
        labels: [...labels],
        properties: props,
        name: String(
            props.name ?? props.external_name ?? (typeof props.cmdb === 'string' ? props.cmdb : id),
        ),
        description: typeof props.description === 'string' ? props.description : undefined,
        technology: typeof props.technology === 'string' ? props.technology : undefined,
    };
};

export const parseNodesFromRows = (
    rows: ICypherDiagram[],
    column: keyof ICypherDiagram = 'n',
): C4Node[] => {
    const out: C4Node[] = [];
    rows.forEach((row) => {
        const firstKey = Object.keys(row)[0] as keyof ICypherDiagram | undefined;
        const value = (firstKey != null ? row[column] ?? row[firstKey] : row[column]) as unknown;
        if (isCypherNode(value)) {
            out.push(toC4Node(value));
        }
    });

    const seen = new Set<string>();
    return out.filter((node) => {
        if (seen.has(node.id)) {
            return false;
        }
        seen.add(node.id);
        return true;
    });
};

export const parseGraphFromRows = (rows: ICypherDiagram[]): GraphData => {
    const nodesMap = new Map<string, C4Node>();
    const edges: GraphEdge[] = [];

    rows.forEach((row) => {
        const nVal = row.n;
        const mVal = row.m;
        const rVal = row.r;

        if (isCypherNode(nVal)) {
            const n = toC4Node(nVal);
            nodesMap.set(n.id, n);
        }
        if (isCypherNode(mVal)) {
            const m = toC4Node(mVal);
            nodesMap.set(m.id, m);
        }

        if (isCypherNode(nVal) && isCypherNode(mVal) && isCypherRelationship(rVal)) {
            const nId = stableNodeId(nVal);
            const mId = stableNodeId(mVal);
            const rel = rVal;
            const relType = rel.type.trim() ? rel.type : 'RELATED';
            const technology = rel.properties.technology;
            edges.push({
                source: nId,
                target: mId,
                type: relType,
                technology: typeof technology === 'string' ? technology : undefined,
            });
        }
    });

    return { nodes: Array.from(nodesMap.values()), edges: dedupeGraphEdges(edges) };
};

export const graphTagPredicate = (alias: string, tag: GraphTag): string => {
    if (tag === 'All') {
        return 'true';
    }
    return `toLower(coalesce(${alias}.graphTag, '')) CONTAINS '${tag.toLowerCase()}'`;
};

export const mainLabel = (labels: string[]): string =>
    labels.find((l) => KNOWN_LABELS.includes(l as C4Label)) ?? labels[0] ?? 'unknown';

export const escapeCypherString = (value: string): string => {
    let out = '';
    for (let i = 0; i < value.length; ) {
        const cp = value.codePointAt(i);
        if (cp == null) {
            break;
        }
        if (cp === 0x5c) {
            out += '\\\\';
        } else if (cp === 0x27) {
            out += "\\'";
        } else if (cp < 128) {
            out += String.fromCodePoint(cp);
        } else if (cp <= 0xffff) {
            out += `\\u${cp.toString(16).padStart(4, '0')}`;
        } else {
            const h = Math.floor((cp - 0x10000) / 0x400) + 0xd800;
            const l = ((cp - 0x10000) % 0x400) + 0xdc00;
            out += `\\u${h.toString(16).padStart(4, '0')}\\u${l.toString(16).padStart(4, '0')}`;
        }
        i += cp > 0xffff ? 2 : 1;
    }
    return out;
};

export const loadLayout = (key: string): DiagramLayoutPersist | null => {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            return null;
        }
        const parsed = JSON.parse(raw) as DiagramLayoutPersist;
        if (!parsed || typeof parsed !== 'object' || !parsed.nodePositions) {
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
};

export const saveLayout = (key: string, data: DiagramLayoutPersist) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        // no-op
    }
};

export const loadPinnedEntries = (productAlias: string): PinnedEntry[] => {
    try {
        const raw = localStorage.getItem(PINNED_STORAGE_PREFIX + productAlias);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter(
            (x): x is PinnedEntry =>
                x != null &&
                typeof x === 'object' &&
                typeof (x as PinnedEntry).id === 'string' &&
                typeof (x as PinnedEntry).name === 'string' &&
                Array.isArray((x as PinnedEntry).labels),
        );
    } catch {
        return [];
    }
};

export const persistPinnedEntries = (productAlias: string, entries: PinnedEntry[]) => {
    try {
        localStorage.setItem(PINNED_STORAGE_PREFIX + productAlias, JSON.stringify(entries));
    } catch {
        // no-op
    }
};

export const cloneGraphData = (graph: GraphData): GraphData => ({
    nodes: graph.nodes.map((n) => ({
        ...n,
        labels: [...n.labels],
        properties: { ...n.properties },
    })),
    edges: graph.edges.map((e) => ({ ...e })),
});

export const cloneC4Node = (node: C4Node): C4Node => ({
    ...node,
    labels: [...node.labels],
    properties: { ...node.properties },
});

export const c4NodeFromPinnedEntry = (entry: PinnedEntry): C4Node => {
    const properties: Record<string, unknown> = { name: entry.name };
    if (entry.originalName) {
        properties.originalName = entry.originalName;
    }
    return {
        id: entry.id,
        name: entry.name,
        labels: [...entry.labels],
        properties,
    };
};

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
