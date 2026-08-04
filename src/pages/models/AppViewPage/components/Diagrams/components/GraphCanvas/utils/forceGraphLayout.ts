import {
    type Simulation,
    type SimulationLinkDatum,
    type SimulationNodeDatum,
    forceCollide,
    forceManyBody,
    forceSimulation,
    forceX,
} from 'd3-force';

import { nodeDisplayName } from '../../../utils';
import { CLUSTER_MIN_H, CLUSTER_MIN_W, NODE_H, NODE_W } from '../const';
import type { C4Node, GraphEdge } from '../types';

import { GRID_CELL, snapSizeToGrid } from './gridRouter';

function nodeSizeFromProperties(node: C4Node): { width: number; height: number } {
    const p = node.properties as Record<string, unknown>;
    const rawW = typeof p.__clusterWidth === 'number' ? p.__clusterWidth : NODE_W;
    const rawH = typeof p.__clusterHeight === 'number' ? p.__clusterHeight : NODE_H;
    const width = Math.max(CLUSTER_MIN_W, snapSizeToGrid(rawW));
    const height = Math.max(CLUSTER_MIN_H, snapSizeToGrid(rawH));
    if (p.__cluster === true) return { width, height };
    return { width: NODE_W, height: NODE_H };
}

function isClusterSimNode(n: SimNode): boolean {
    return (n.node.properties as Record<string, unknown>).__cluster === true;
}

function collideRadiusForNode(d: SimNode): number {
    const base = Math.hypot(d.width, d.height) / 2 + GRID_CELL / 2;
    return isClusterSimNode(d) ? base + GRID_CELL : base;
}

function pairGapExtra(a: SimNode, b: SimNode): number {
    return (isClusterSimNode(a) ? GRID_CELL : 0) + (isClusterSimNode(b) ? GRID_CELL : 0);
}

const LAYER_ORDER = [
    'SoftwareSystem',
    'Container',
    'Component',
    'ContainerInstance',
    'DeploymentNode',
    'DeploymentEnvironment',
] as const;

export function tierFromLabels(labels: string[]): number {
    const normalized = new Set(labels);
    if (normalized.has('Environment')) normalized.add('DeploymentEnvironment');
    const hit = LAYER_ORDER.find((l) => normalized.has(l));
    if (hit !== undefined) return LAYER_ORDER.indexOf(hit);
    return LAYER_ORDER.length;
}

export function baseGap(height: number, maxTierInGraph: number): number {
    const tiers = Math.max(maxTierInGraph + 1, 1);
    return Math.max(118, Math.min(168, (height - 88) / Math.max(tiers, 5)));
}

export function computeTierTops(
    maxTierInGraph: number,
    centralTier: number | null,
    gap: number,
): number[] {
    const tops: number[] = [];
    let y = 40;
    for (let t = 0; t <= maxTierInGraph; t++) {
        tops[t] = y;
        const band = centralTier !== null && t === centralTier ? gap * 2 : gap;
        y += band;
    }
    return tops;
}

export interface SimNode extends SimulationNodeDatum {
    id: string;
    node: C4Node;
    width: number;
    height: number;
}

export type GraphLink = SimulationLinkDatum<SimNode>;

function minColsForLayerCount(n: number): number {
    if (n <= 1) return 1;
    if (n === 2) return 2;
    return Math.min(n, Math.max(2, Math.ceil(Math.sqrt(n))));
}

function chooseBestColsForLayer(n: number, maxW: number, maxH: number, minGap: number): number {
    const targetAspect = 4 / 3;
    const minCols = minColsForLayerCount(n);
    let bestCols = minCols;
    let bestScore = Number.POSITIVE_INFINITY;
    for (let cols = minCols; cols <= n; cols++) {
        const rows = Math.ceil(n / cols);
        const approxW = cols * maxW + Math.max(0, cols - 1) * minGap;
        const approxH = rows * maxH + Math.max(0, rows - 1) * minGap;
        const ratio = approxW / Math.max(approxH, 1);
        const score = Math.abs(ratio - targetAspect);
        if (score < bestScore) {
            bestScore = score;
            bestCols = cols;
        }
    }
    return bestCols;
}

function computeTierContentHeight(tierNodes: SimNode[]): number {
    if (tierNodes.length === 0) return 0;
    const minGap = GRID_CELL;
    const sorted = [...tierNodes].sort((a, b) =>
        nodeDisplayName(a.node).localeCompare(nodeDisplayName(b.node), undefined, {
            sensitivity: 'base',
        }),
    );
    const maxW = sorted.reduce((m, n) => Math.max(m, n.width), NODE_W);
    const maxH = sorted.reduce((m, n) => Math.max(m, n.height), NODE_H);
    const bestCols = chooseBestColsForLayer(sorted.length, maxW, maxH, minGap);
    const rows = Math.ceil(sorted.length / bestCols);
    const rowPitch = maxH + minGap;
    return rows > 0 ? (rows - 1) * rowPitch + maxH : 0;
}

function placeTierWithoutOverlap(tierNodes: SimNode[], centerX: number, baseY: number): void {
    if (tierNodes.length === 0) return;
    const sorted = [...tierNodes].sort((a, b) =>
        nodeDisplayName(a.node).localeCompare(nodeDisplayName(b.node), undefined, {
            sensitivity: 'base',
        }),
    );
    const minGap = GRID_CELL;
    const maxW = sorted.reduce((m, n) => Math.max(m, n.width), NODE_W);
    const maxH = sorted.reduce((m, n) => Math.max(m, n.height), NODE_H);
    const bestCols = chooseBestColsForLayer(sorted.length, maxW, maxH, minGap);
    const rows = Math.ceil(sorted.length / bestCols);
    const rowPitch = maxH + minGap;
    for (let r = 0; r < rows; r++) {
        const rowNodes = sorted.slice(r * bestCols, (r + 1) * bestCols);
        const rowW =
            rowNodes.reduce((sum, n) => sum + n.width, 0) +
            minGap * Math.max(rowNodes.length - 1, 0);
        let x = centerX - rowW / 2;
        const yTop = baseY + r * rowPitch;
        rowNodes.forEach((n) => {
            n.x = x + n.width / 2;
            n.y = yTop + n.height / 2;
            x += n.width + minGap;
        });
    }
}

function compactTierWithGapCenters(tierNodes: SimNode[], centerX: number): void {
    if (tierNodes.length <= 1) return;
    const minGap = GRID_CELL;
    const sorted = [...tierNodes].sort(
        (a, b) => (a.x ?? centerX) - a.width / 2 - ((b.x ?? centerX) - b.width / 2),
    );
    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1]!;
        const cur = sorted[i]!;
        const prevLeft = (prev.x ?? centerX) - prev.width / 2;
        const minLeft = prevLeft + prev.width + minGap;
        const curLeft = (cur.x ?? centerX) - cur.width / 2;
        if (curLeft < minLeft) cur.x = minLeft + cur.width / 2;
    }
}

function relaxTierWithForce(tierNodes: SimNode[], centerX: number, yFixed: number): void {
    if (tierNodes.length === 0) return;
    const minGap = GRID_CELL;
    const byRow = new Map<number, SimNode[]>();
    const rowPitch = tierNodes.reduce((m, n) => Math.max(m, n.height), NODE_H) + minGap;
    tierNodes.forEach((n) => {
        const top = (n.y ?? yFixed) - n.height / 2;
        const row = Math.max(0, Math.floor((top - yFixed) / Math.max(rowPitch, 1)));
        const arr = byRow.get(row);
        if (arr) arr.push(n);
        else byRow.set(row, [n]);
    });
    const rows = [...byRow.keys()].sort((a, b) => a - b);
    rows.forEach((row) => {
        const rowNodes = byRow.get(row)!;
        const rowTop = yFixed + row * rowPitch;
        const pinY = (n: SimNode) => rowTop + n.height / 2;
        rowNodes.forEach((n) => {
            const py = pinY(n);
            n.y = py;
            n.fy = py;
        });
        if (rowNodes.length <= 1) return;
        const sim = forceSimulation<SimNode>(rowNodes)
            .force('charge', forceManyBody<SimNode>().strength(-230))
            .force(
                'collide',
                forceCollide<SimNode>()
                    .radius((d) => collideRadiusForNode(d))
                    .strength(1),
            )
            .force('x', forceX<SimNode>(centerX).strength(0.14))
            .stop();
        for (let i = 0; i < 52; i++) {
            sim.tick();
            rowNodes.forEach((n) => {
                const py = pinY(n);
                n.y = py;
                n.vy = 0;
            });
        }
        compactTierWithGapCenters(rowNodes, centerX);
    });
}

function relaxTierHorizontalPreserveY(
    tierNodes: SimNode[],
    centerX: number,
    baseY: number,
    pinnedNodeId?: string | null,
): void {
    if (tierNodes.length === 0) return;
    const minGap = GRID_CELL;
    const rowPitch = tierNodes.reduce((m, n) => Math.max(m, n.height), NODE_H) + minGap;
    const byRow = new Map<number, SimNode[]>();
    tierNodes.forEach((n) => {
        const top = (n.y ?? baseY) - n.height / 2;
        const row = Math.max(0, Math.floor((top - baseY) / Math.max(rowPitch, 1)));
        const arr = byRow.get(row);
        if (arr) arr.push(n);
        else byRow.set(row, [n]);
    });
    const rows = [...byRow.keys()].sort((a, b) => a - b);
    rows.forEach((row) => {
        const rowNodes = byRow.get(row)!;
        if (rowNodes.length <= 1) return;
        const ySnap = new Map(rowNodes.map((n) => [n.id, n.y ?? baseY]));
        const pin =
            pinnedNodeId && rowNodes.some((n) => n.id === pinnedNodeId)
                ? (() => {
                      const p = rowNodes.find((n) => n.id === pinnedNodeId)!;
                      return { x: p.x ?? centerX, y: p.y ?? baseY };
                  })()
                : null;
        const sim = forceSimulation<SimNode>(rowNodes)
            .force('charge', forceManyBody<SimNode>().strength(-340))
            .force(
                'collide',
                forceCollide<SimNode>()
                    .radius((d) => collideRadiusForNode(d))
                    .strength(1),
            )
            .force('x', forceX<SimNode>(centerX).strength(0.17))
            .stop();
        for (let i = 0; i < 56; i++) {
            sim.tick();
            rowNodes.forEach((n) => {
                n.y = ySnap.get(n.id)!;
                n.vy = 0;
                if (pin && n.id === pinnedNodeId) {
                    n.x = pin.x;
                    n.vx = 0;
                }
            });
        }
        compactTierWithGapCenters(rowNodes, centerX);
        if (pin && pinnedNodeId) {
            const p = rowNodes.find((n) => n.id === pinnedNodeId)!;
            p.x = pin.x;
            p.y = pin.y;
        }
    });
}

function rectEdgesFromCenter(n: SimNode): { l: number; t: number; r: number; b: number } {
    const x = n.x ?? 0;
    const y = n.y ?? 0;
    const hw = n.width / 2;
    const hh = n.height / 2;
    return { l: x - hw, t: y - hh, r: x + hw, b: y + hh };
}

function resolveTierHorizontalAABBCollisions(
    tierNodes: SimNode[],
    gap: number,
    pinnedId?: string | null,
): void {
    for (let iter = 0; iter < 48; iter++) {
        let moved = false;
        for (let i = 0; i < tierNodes.length; i++) {
            for (let j = i + 1; j < tierNodes.length; j++) {
                const a = tierNodes[i]!;
                const b = tierNodes[j]!;
                const A = rectEdgesFromCenter(a);
                const B = rectEdgesFromCenter(b);
                const overlapX = Math.min(A.r, B.r) - Math.max(A.l, B.l);
                const overlapY = Math.min(A.b, B.b) - Math.max(A.t, B.t);
                if (overlapX <= 0 || overlapY <= 0) continue;
                const g = gap + pairGapExtra(a, b);
                const total = overlapX + g;
                moved = true;
                if (pinnedId === a.id) b.x = (b.x ?? 0) + (a.x! < b.x! ? total : -total);
                else if (pinnedId === b.id) a.x = (a.x ?? 0) + (a.x! < b.x! ? -total : total);
                else {
                    const half = total / 2;
                    if (a.x! < b.x!) {
                        a.x = a.x! - half;
                        b.x = b.x! + half;
                    } else {
                        a.x = a.x! + half;
                        b.x = b.x! - half;
                    }
                }
            }
        }
        if (!moved) break;
    }
}

function resolveCrossTierOverlap(
    byTier: Map<number, SimNode[]>,
    maxTier: number,
    gap: number,
    pinnedId?: string | null,
): void {
    for (let iter = 0; iter < 20; iter++) {
        let moved = false;
        for (let t = 0; t < maxTier; t++) {
            const upper = byTier.get(t) ?? [];
            const lower = byTier.get(t + 1) ?? [];
            for (const a of upper) {
                for (const b of lower) {
                    const A = rectEdgesFromCenter(a);
                    const B = rectEdgesFromCenter(b);
                    const overlapX = Math.min(A.r, B.r) - Math.max(A.l, B.l);
                    const overlapY = Math.min(A.b, B.b) - Math.max(A.t, B.t);
                    if (overlapX <= 0 || overlapY <= 0) continue;
                    const g = gap + pairGapExtra(a, b);
                    const total = overlapY + g;
                    moved = true;
                    if (pinnedId === a.id) b.y = (b.y ?? 0) + total;
                    else if (pinnedId === b.id) a.y = (a.y ?? 0) - total;
                    else {
                        a.y = (a.y ?? 0) - total / 2;
                        b.y = (b.y ?? 0) + total / 2;
                    }
                }
            }
        }
        if (!moved) break;
    }
}

export function createForceSimulation(
    nodes: C4Node[],
    edges: GraphEdge[],
    width: number,
    height: number,
    selectedNodeId?: string | null,
): { simulation: Simulation<SimNode, GraphLink>; simNodes: SimNode[] } {
    const cx = width / 2;
    const maxTier = nodes.length ? Math.max(...nodes.map((n) => tierFromLabels(n.labels))) : 0;
    const selected =
        selectedNodeId && nodes.some((n) => n.id === selectedNodeId)
            ? nodes.find((n) => n.id === selectedNodeId)!
            : null;
    const centralTier = selected ? tierFromLabels(selected.labels) : null;
    const padY = 8;
    const INTER_TIER_GAP = GRID_CELL;
    const spread = Math.min(width * 0.84, 560);
    const simNodes: SimNode[] = nodes.map((node, i) => {
        const { width: nodeW, height: nodeH } = nodeSizeFromProperties(node);
        return {
            id: node.id,
            node,
            width: nodeW,
            height: nodeH,
            x: cx + spread * Math.cos((i / Math.max(nodes.length, 1)) * Math.PI * 2) * 0.8,
            y: 0,
            fy: 0,
        };
    });
    const byTier = new Map<number, SimNode[]>();
    for (const n of simNodes) {
        const tier = tierFromLabels(n.node.labels);
        const arr = byTier.get(tier);
        if (arr) arr.push(n);
        else byTier.set(tier, [n]);
    }
    const tierTops: number[] = [];
    const tierHeights: number[] = [];
    let yCursor = 40;
    for (let t = 0; t <= maxTier; t++) {
        tierTops[t] = yCursor;
        const tierNodes = byTier.get(t) ?? [];
        const contentH = computeTierContentHeight(tierNodes);
        const band = contentH + padY * 2;
        tierHeights[t] = band;
        yCursor += band + INTER_TIER_GAP;
    }
    for (const [tier, tierNodes] of byTier) {
        const baseY = (tierTops[tier] ?? 40) + padY;
        placeTierWithoutOverlap(tierNodes, cx, baseY);
        relaxTierWithForce(tierNodes, cx, baseY);
    }
    if (centralTier !== null && selectedNodeId) {
        const sel = simNodes.find((s) => s.id === selectedNodeId);
        if (sel && tierFromLabels(sel.node.labels) === centralTier) {
            const tier = centralTier;
            const bottomPrev =
                tier === 0 ? 8 : tierTops[tier - 1]! + tierHeights[tier - 1]! + INTER_TIER_GAP;
            const baseY = (tierTops[tier] ?? 40) + padY;
            const inTier = simNodes.filter((s) => tierFromLabels(s.node.labels) === centralTier);
            const others = inTier.filter((s) => s.id !== selectedNodeId);
            if (others.length > 0) {
                const minOthersTop = Math.min(...others.map((n) => (n.y ?? 0) - n.height / 2));
                const maxCenterY = minOthersTop - sel.height / 2 - GRID_CELL;
                const curY = sel.y ?? baseY + sel.height / 2;
                sel.y = Math.max(bottomPrev + sel.height / 2, Math.min(curY, maxCenterY));
            } else {
                sel.y = Math.max(bottomPrev + sel.height / 2, baseY + sel.height / 2);
            }
            sel.fy = sel.y;
            if (others.length > 0) {
                const mx = others.reduce((sum, n) => sum + (n.x ?? cx), 0) / others.length;
                sel.x = mx;
                sel.fx = mx;
            } else {
                sel.x = cx;
                sel.fx = cx;
            }
        }
    }
    for (const [tier, tierNodes] of byTier) {
        const baseY = (tierTops[tier] ?? 40) + padY;
        relaxTierHorizontalPreserveY(
            tierNodes,
            cx,
            baseY,
            centralTier !== null && tier === centralTier ? selectedNodeId : undefined,
        );
    }
    const gapResolve = GRID_CELL;
    for (let pass = 0; pass < 4; pass++) {
        for (const [tier, tierNodes] of byTier) {
            resolveTierHorizontalAABBCollisions(
                tierNodes,
                gapResolve,
                centralTier !== null && tier === centralTier ? selectedNodeId : undefined,
            );
        }
        resolveCrossTierOverlap(byTier, maxTier, gapResolve, selectedNodeId ?? undefined);
    }
    for (const n of simNodes) {
        n.x = (n.x ?? 0) - n.width / 2;
        n.y = (n.y ?? 0) - n.height / 2;
        if (n.fx != null) n.fx -= n.width / 2;
        if (n.fy != null) n.fy -= n.height / 2;
    }
    const simulation = forceSimulation<SimNode>(simNodes).alpha(0).alphaMin(0.001).stop();
    return { simulation, simNodes };
}

export { NODE_H, NODE_W };
