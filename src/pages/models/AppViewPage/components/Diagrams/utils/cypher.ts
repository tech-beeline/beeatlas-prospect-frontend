import { C4Node, GraphData, GraphEdge } from '../components';
import { type ICypherDiagram, type ICypherNode, type ICypherRelationship } from '../types';

import { dedupeGraphEdges } from './graph';

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
