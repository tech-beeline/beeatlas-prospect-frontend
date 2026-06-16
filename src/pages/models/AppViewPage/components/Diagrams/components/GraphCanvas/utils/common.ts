import { EXPORT_PAD } from '../const';
import { buildEdgeGeometry } from '../geometry/edges';
import type { EdgeLabelGeom } from '../types';
import { GraphEdge, LayoutNode } from '../types';

import { computeDiagramBounds } from './diagramBounds';
import { Point } from './gridRouter';
import { resolveEdgeLabelOverlaps } from './paint';

export function computePanToCenterFocus(
    canvas: HTMLCanvasElement,
    layout: LayoutNode[],
    focusId: string | null,
    zoom: number,
): { x: number; y: number } | null {
    if (!focusId) return null;
    const ln = layout.find((l) => l.node.id === focusId);
    if (!ln) return null;
    const rect = canvas.getBoundingClientRect();
    const cx = ln.x + ln.width / 2;
    const cy = ln.y + ln.height / 2;
    return {
        x: rect.width / 2 - cx * zoom,
        y: rect.height / 2 - cy * zoom,
    };
}

export function computeFullExportData(
    layout: LayoutNode[],
    edges: GraphEdge[],
    focusId: string | null | undefined,
): {
    bounds: { width: number; height: number; offsetX: number; offsetY: number };
    edgePolylines: Point[][];
    edgeDotted: boolean[];
    placedLabels: EdgeLabelGeom[];
} | null {
    if (layout.length === 0) return null;
    const { edgePolylines, edgeDotted, labelCandidates } = buildEdgeGeometry(
        layout,
        edges,
        focusId,
    );
    const tmp = document.createElement('canvas');
    const ctx = tmp.getContext('2d');
    if (!ctx) return null;
    const placedLabels = resolveEdgeLabelOverlaps(ctx, labelCandidates);
    const labelHints = placedLabels.map((g) => ({ x: g.x, y: g.y, text: g.text }));
    const bounds = computeDiagramBounds(
        layout.map((ln) => ({ x: ln.x, y: ln.y, width: ln.width, height: ln.height })),
        edgePolylines,
        labelHints,
        EXPORT_PAD,
    );
    return { bounds, edgePolylines, edgeDotted, placedLabels };
}

export function isStructuralEdgeRelationship(type: string): boolean {
    const t = type.trim().toLowerCase();
    return t === 'child' || t === 'deploy';
}

export function graphEdgeLabel(edge: GraphEdge): string {
    const t = edge.type.trim();
    if (t.toLowerCase() === 'child') return '';
    if (t.toLowerCase() === 'relationship' && edge.technology?.trim()) {
        return edge.technology.trim();
    }
    return edge.type;
}

export function clusterMemberOffsetKey(clusterId: string, memberId: string): string {
    return `${clusterId}::${memberId}`;
}
