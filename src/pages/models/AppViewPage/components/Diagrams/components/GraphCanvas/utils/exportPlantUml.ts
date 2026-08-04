import { nodeDisplayName } from '../../../utils';
import type { C4Node, GraphEdge } from '../types';

import { graphEdgeLabel, isStructuralEdgeRelationship } from './common';
import { getMainLabel } from './labels';

function sanitizeAlias(raw: string): string {
    let s = raw.replace(/[^a-zA-Z0-9_]/g, '_');
    if (/^[0-9]/.test(s)) s = `n_${s}`;
    if (!s) s = 'node';
    return s;
}

function uniqueAliasMap(ids: string[]): Map<string, string> {
    const m = new Map<string, string>();
    const used = new Set<string>();
    for (const id of ids) {
        const base = sanitizeAlias(id);
        let a = base;
        let i = 0;
        while (used.has(a)) {
            i += 1;
            a = `${base}_${i}`;
        }
        used.add(a);
        m.set(id, a);
    }
    return m;
}

function escapeQuoted(name: string): string {
    return name.replace(/\r?\n/g, ' ').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeLinkLabel(line: string): string {
    return line.replace(/\r?\n/g, ' ').replace(/:/g, '\\:').trim();
}

function isClusterNode(n: C4Node): boolean {
    return (n.properties as Record<string, unknown> | undefined)?.__cluster === true;
}

function clusterPlantUmlTitle(n: C4Node): string {
    const p = (n.properties ?? {}) as Record<string, unknown>;
    const list =
        typeof p.__clusterMemberNames === 'string' && p.__clusterMemberNames.trim()
            ? p.__clusterMemberNames.trim()
            : nodeDisplayName(n);
    return `Группа: ${list}`;
}

export function buildPlantUmlComponentDiagram(nodes: C4Node[], edges: GraphEdge[]): string {
    const lines: string[] = [
        '@startuml',
        'skinparam componentStyle rectangle',
        'skinparam wrapWidth 220',
        'left to right direction',
        '',
    ];
    const aliasMap = uniqueAliasMap(nodes.map((n) => n.id));
    for (const n of nodes) {
        const alias = aliasMap.get(n.id)!;
        const ml = getMainLabel(n.labels);
        const title = escapeQuoted(isClusterNode(n) ? clusterPlantUmlTitle(n) : nodeDisplayName(n));
        lines.push(`component "${title}" <<${ml}>> as ${alias}`);
    }
    lines.push('');
    for (const e of edges) {
        const a = aliasMap.get(e.source);
        const b = aliasMap.get(e.target);
        if (!a || !b) continue;
        const lbl = graphEdgeLabel(e);
        const structural = isStructuralEdgeRelationship(e.type);
        const arrow = structural ? `${a} ..> ${b}` : `${a} --> ${b}`;
        if (lbl.trim()) {
            lines.push(`${arrow} : ${escapeLinkLabel(lbl)}`);
        } else {
            lines.push(arrow);
        }
    }
    lines.push('');
    lines.push('@enduml');
    return lines.join('\n');
}
