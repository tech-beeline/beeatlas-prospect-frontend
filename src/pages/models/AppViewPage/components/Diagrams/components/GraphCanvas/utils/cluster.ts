import { nodeDisplayName } from '../../../utils';
import {
    CLUSTER_BOX_PADDING,
    CLUSTER_HEADER_H,
    CLUSTER_MEMBER_GAP,
    CLUSTER_MEMBER_H,
    CLUSTER_MEMBER_W,
    CLUSTER_MIN_SIZE,
} from '../const';
import type { C4Node, GraphEdge } from '../types';
import type { ClusterMeta, LayoutNode } from '../types';

import { clusterMemberOffsetKey, graphEdgeLabel } from './common';
import { snapSizeToGrid } from './gridRouter';
import { getMainLabel } from './labels';

export function isClusterNode(node: C4Node): boolean {
    return (node.properties as Record<string, unknown>).__cluster === true;
}

function nodeMainLabel(node: C4Node): string {
    return getMainLabel(node.labels);
}

function dedupeEdges(edges: GraphEdge[]): GraphEdge[] {
    const out: GraphEdge[] = [];
    const seen = new Set<string>();
    for (const e of edges) {
        const key = `${e.source}|${e.target}|${e.type}|${e.technology ?? ''}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(e);
    }
    return out;
}

function clusterDimensions(memberCount: number): { width: number; height: number } {
    const pad = CLUSTER_BOX_PADDING;
    const cols = Math.ceil(Math.sqrt(memberCount));
    const rows = Math.ceil(memberCount / cols);
    const innerW = cols * CLUSTER_MEMBER_W + Math.max(0, cols - 1) * CLUSTER_MEMBER_GAP;
    const innerH = rows * CLUSTER_MEMBER_H + Math.max(0, rows - 1) * CLUSTER_MEMBER_GAP;
    const width = pad * 2 + innerW;
    const height = pad * 2 + CLUSTER_HEADER_H + innerH;
    return { width: snapSizeToGrid(width), height: snapSizeToGrid(height) };
}

export function collapseDenseSimilarNodes(
    nodes: C4Node[],
    edges: GraphEdge[],
    selectedNodeId: string | null,
    /** Прикреплённые узлы никогда не схлопываются в группы. */
    pinnedNodeIds?: ReadonlySet<string> | null,
): {
    nodes: C4Node[];
    edges: GraphEdge[];
    clusters: Map<string, ClusterMeta>;
    selectedVisibleId: string | null;
} {
    if (!selectedNodeId) {
        return { nodes, edges, clusters: new Map(), selectedVisibleId: null };
    }
    const eligibleTypes = new Set([
        'Container',
        'SoftwareSystem',
        'Component',
        'ContainerInstance',
        'DeploymentNode',
    ]);
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const candidates = new Map<
        string,
        { ids: Set<string>; memberType: string; edgeLabel: string }
    >();

    edges.forEach((edge) => {
        const rawLabel = graphEdgeLabel(edge).trim();
        const label = rawLabel.length > 0 ? rawLabel : '(no-label)';
        const src = byId.get(edge.source);
        const tgt = byId.get(edge.target);
        if (!src || !tgt) return;
        const addCandidate = (member: C4Node) => {
            if (member.id === selectedNodeId) return;
            if (pinnedNodeIds?.has(member.id)) return;
            const memberType = nodeMainLabel(member);
            if (!eligibleTypes.has(memberType)) return;
            const key = `${memberType}|${label}`;
            let bucket = candidates.get(key);
            if (!bucket) {
                bucket = { ids: new Set<string>(), memberType, edgeLabel: label };
                candidates.set(key, bucket);
            }
            bucket.ids.add(member.id);
        };
        addCandidate(src);
        addCandidate(tgt);
    });

    const sortedGroups = [...candidates.entries()]
        .map(([key, value]) => ({ key, ...value }))
        .filter((x) => x.ids.size >= CLUSTER_MIN_SIZE)
        .sort((a, b) => b.ids.size - a.ids.size);

    if (sortedGroups.length === 0) {
        return { nodes, edges, clusters: new Map(), selectedVisibleId: selectedNodeId };
    }

    const memberToCluster = new Map<string, string>();
    const clusterNodes = new Map<string, C4Node>();
    const clusters = new Map<string, ClusterMeta>();
    const used = new Set<string>();

    sortedGroups.forEach((g, idx) => {
        const members = [...g.ids]
            .filter((id) => !used.has(id) && id !== selectedNodeId)
            .map((id) => byId.get(id))
            .filter((n): n is C4Node => Boolean(n));
        if (members.length < CLUSTER_MIN_SIZE) return;
        members.forEach((m) => used.add(m.id));
        const clusterId = `cluster:${g.memberType}:${idx}:${g.edgeLabel}`;
        const dim = clusterDimensions(members.length);
        const clusterNode: C4Node = {
            id: clusterId,
            labels: [g.memberType, 'ClusterGroup'],
            name: `${g.memberType} x${members.length}`,
            technology: g.edgeLabel === '(no-label)' ? undefined : g.edgeLabel,
            properties: {
                __cluster: true,
                __clusterType: g.memberType,
                __clusterSize: members.length,
                __clusterEdgeLabel: g.edgeLabel === '(no-label)' ? '' : g.edgeLabel,
                __clusterMemberNames: members.map((m) => nodeDisplayName(m)).join(', '),
                __clusterWidth: dim.width,
                __clusterHeight: dim.height,
            },
        };
        clusters.set(clusterId, {
            id: clusterId,
            members,
            memberType: g.memberType,
            edgeLabel: g.edgeLabel,
        });
        clusterNodes.set(clusterId, clusterNode);
        members.forEach((m) => memberToCluster.set(m.id, clusterId));
    });

    if (memberToCluster.size === 0) {
        return { nodes, edges, clusters: new Map(), selectedVisibleId: selectedNodeId };
    }

    const outNodes: C4Node[] = [];
    const added = new Set<string>();
    nodes.forEach((n) => {
        const clusterId = memberToCluster.get(n.id);
        if (!clusterId) {
            outNodes.push(n);
            return;
        }
        if (!added.has(clusterId)) {
            const node = clusterNodes.get(clusterId);
            if (node) outNodes.push(node);
            added.add(clusterId);
        }
    });

    const outEdges = dedupeEdges(
        edges
            .map((e) => ({
                ...e,
                source: memberToCluster.get(e.source) ?? e.source,
                target: memberToCluster.get(e.target) ?? e.target,
            }))
            .filter((e) => e.source !== e.target),
    );

    return {
        nodes: outNodes,
        edges: outEdges,
        clusters,
        selectedVisibleId: memberToCluster.get(selectedNodeId) ?? selectedNodeId,
    };
}

function clusterMemberSlotRect(
    ln: LayoutNode,
    memberIdx: number,
    memberCount: number,
): { mx: number; my: number } {
    const cols = Math.ceil(Math.sqrt(memberCount));
    const col = memberIdx % cols;
    const row = Math.floor(memberIdx / cols);
    const innerStartX = ln.x + CLUSTER_BOX_PADDING;
    const innerStartY = ln.y + CLUSTER_BOX_PADDING + CLUSTER_HEADER_H;
    return {
        mx: innerStartX + col * (CLUSTER_MEMBER_W + CLUSTER_MEMBER_GAP),
        my: innerStartY + row * (CLUSTER_MEMBER_H + CLUSTER_MEMBER_GAP),
    };
}

export function hitTestClusterMember(
    ln: LayoutNode,
    clusterMeta: ClusterMeta,
    x: number,
    y: number,
    memberOffsetsRecord?: Record<string, { dx: number; dy: number }> | null,
): C4Node | null {
    const clusterId = ln.node.id;
    for (let idx = clusterMeta.members.length - 1; idx >= 0; idx--) {
        const member = clusterMeta.members[idx]!;
        const key = clusterMemberOffsetKey(clusterId, member.id);
        const off = memberOffsetsRecord?.[key] ?? { dx: 0, dy: 0 };
        const slot = clusterMemberSlotRect(ln, idx, clusterMeta.members.length);
        const mx = slot.mx + off.dx;
        const my = slot.my + off.dy;
        if (x >= mx && x <= mx + CLUSTER_MEMBER_W && y >= my && y <= my + CLUSTER_MEMBER_H) {
            return member;
        }
    }
    return null;
}

export function clampMemberOffset(
    ln: LayoutNode,
    clusterMeta: ClusterMeta,
    memberIdx: number,
    dx: number,
    dy: number,
): { dx: number; dy: number } {
    const slot = clusterMemberSlotRect(ln, memberIdx, clusterMeta.members.length);
    const innerLeft = ln.x + CLUSTER_BOX_PADDING;
    const innerTop = ln.y + CLUSTER_BOX_PADDING + CLUSTER_HEADER_H;
    const innerRight = ln.x + ln.width - CLUSTER_BOX_PADDING - CLUSTER_MEMBER_W;
    const innerBottom = ln.y + ln.height - CLUSTER_BOX_PADDING - CLUSTER_MEMBER_H;
    let mx = slot.mx + dx;
    let my = slot.my + dy;
    mx = Math.max(innerLeft, Math.min(mx, innerRight));
    my = Math.max(innerTop, Math.min(my, innerBottom));
    return { dx: mx - slot.mx, dy: my - slot.my };
}
