import type { GraphEdge } from '../types';

export function stringHash32(input: string): number {
    // FNV-1a 32-bit constants
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
}

function mix32(x: number): number {
    let v = x >>> 0;
    v ^= v >>> 16;
    v = Math.imul(v, 0x7feb352d);
    v ^= v >>> 15;
    v = Math.imul(v, 0x846ca68b);
    v ^= v >>> 16;
    return v >>> 0;
}

export function hashGraphKey(nodes: Array<{ id: string }>, edges: GraphEdge[]): string {
    let acc = 0;

    acc ^= mix32(nodes.length);
    acc ^= mix32(edges.length << 1);

    for (const n of nodes) {
        acc ^= mix32(stringHash32(n.id));
    }

    for (const e of edges) {
        const s = `${e.source}|${e.target}|${e.type}|${e.technology ?? ''}`;
        acc ^= mix32(stringHash32(s));
    }

    return `g${acc.toString(16)}`;
}
