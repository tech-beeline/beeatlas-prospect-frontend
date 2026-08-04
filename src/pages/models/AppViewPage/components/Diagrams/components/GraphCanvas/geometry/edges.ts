import type {
    EdgeGeometryResult,
    EdgeLabelGeom,
    EdgeRouteMode,
    GraphEdge,
    LayoutBox,
    Point,
} from '../types';
import { LayoutNode } from '../types';
import { graphEdgeLabel, isStructuralEdgeRelationship } from '../utils/common';
import { labelPointAlongPolyline, routeEdgeWithAStar } from '../utils/gridRouter';

export function labelBiasEnd(
    focusId: string | null | undefined,
    sourceId: string,
    targetId: string,
): 'source' | 'target' | null {
    if (!focusId) return null;
    if (focusId === sourceId && targetId !== sourceId) return 'target';
    if (focusId === targetId && sourceId !== targetId) return 'source';
    return null;
}

export function edgeStartsHorizontal(src: LayoutNode, tgt: LayoutNode): boolean {
    return src.node.labels.length === 1 || tgt.node.labels.length === 1;
}

export function rectBoundaryPointToward(from: LayoutNode, toX: number, toY: number): Point {
    const cx = from.x + from.width / 2;
    const cy = from.y + from.height / 2;
    const dx = toX - cx;
    const dy = toY - cy;
    const hw = from.width / 2;
    const hh = from.height / 2;
    if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) return { x: cx, y: cy };
    const sx = Math.abs(dx) / Math.max(hw, 1e-6);
    const sy = Math.abs(dy) / Math.max(hh, 1e-6);
    const k = 1 / Math.max(sx, sy, 1e-6);
    return { x: cx + dx * k, y: cy + dy * k };
}

export function computeSingleEdgeGeometry(args: {
    edge: GraphEdge;
    src: LayoutNode;
    tgt: LayoutNode;
    layoutBoxes: LayoutBox[];
    focusId: string | null | undefined;
    mode: EdgeRouteMode;
}): { points: Point[]; dotted: boolean; labelCandidate: EdgeLabelGeom | null } {
    const { edge, src, tgt, layoutBoxes, focusId, mode } = args;

    const points =
        mode === 'straight'
            ? [
                  rectBoundaryPointToward(src, tgt.x + tgt.width / 2, tgt.y + tgt.height / 2),
                  rectBoundaryPointToward(tgt, src.x + src.width / 2, src.y + src.height / 2),
              ]
            : routeEdgeWithAStar(
                  {
                      id: src.node.id,
                      x: src.x,
                      y: src.y,
                      width: src.width,
                      height: src.height,
                  },
                  {
                      id: tgt.node.id,
                      x: tgt.x,
                      y: tgt.y,
                      width: tgt.width,
                      height: tgt.height,
                  },
                  layoutBoxes,
                  edgeStartsHorizontal(src, tgt),
              );

    const dotted = isStructuralEdgeRelationship(edge.type);

    const labelText = graphEdgeLabel(edge);
    const labelCandidate = labelText
        ? (() => {
              const bias = labelBiasEnd(focusId, edge.source, edge.target);
              const anchor = labelPointAlongPolyline(points, bias);
              return { text: labelText, x: anchor.x, y: anchor.y, align: anchor.align };
          })()
        : null;

    return { points, dotted, labelCandidate };
}

export function buildEdgeGeometry(
    layout: LayoutNode[],
    edges: GraphEdge[],
    focusId: string | null | undefined,
): EdgeGeometryResult {
    const nodeMap = new Map(layout.map((ln) => [ln.node.id, ln]));
    const layoutBoxes: LayoutBox[] = layout.map((ln) => ({
        id: ln.node.id,
        x: ln.x,
        y: ln.y,
        width: ln.width,
        height: ln.height,
    }));
    const edgePolylines: Point[][] = [];
    const edgeDotted: boolean[] = [];
    const labelCandidates: EdgeLabelGeom[] = [];
    const seen = new Set<string>();

    edges.forEach((edge) => {
        const labelText = graphEdgeLabel(edge);
        const pair =
            edge.source < edge.target
                ? `${edge.source}|${edge.target}`
                : `${edge.target}|${edge.source}`;
        const dedupeKey = `${pair}|${labelText}`;
        if (seen.has(dedupeKey)) return;
        seen.add(dedupeKey);

        const src = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!src || !tgt) return;

        const srcBox: LayoutBox = {
            id: src.node.id,
            x: src.x,
            y: src.y,
            width: src.width,
            height: src.height,
        };
        const tgtBox: LayoutBox = {
            id: tgt.node.id,
            x: tgt.x,
            y: tgt.y,
            width: tgt.width,
            height: tgt.height,
        };

        const horizontalFirst = edgeStartsHorizontal(src, tgt);
        const points = routeEdgeWithAStar(srcBox, tgtBox, layoutBoxes, horizontalFirst);
        edgePolylines.push(points);
        edgeDotted.push(isStructuralEdgeRelationship(edge.type));

        if (labelText) {
            const bias = labelBiasEnd(focusId, edge.source, edge.target);
            const anchor = labelPointAlongPolyline(points, bias);
            labelCandidates.push({
                text: labelText,
                x: anchor.x,
                y: anchor.y,
                align: anchor.align,
            });
        }
    });

    return { edgePolylines, edgeDotted, labelCandidates };
}
export function buildEdgeGeometryStraight(
    layout: LayoutNode[],
    edges: GraphEdge[],
    focusId: string | null | undefined,
): EdgeGeometryResult {
    const nodeMap = new Map(layout.map((ln) => [ln.node.id, ln]));
    const edgePolylines: Point[][] = [];
    const edgeDotted: boolean[] = [];
    const labelCandidates: EdgeLabelGeom[] = [];

    edges.forEach((edge) => {
        const src = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!src || !tgt) return;
        const srcC = { x: src.x + src.width / 2, y: src.y + src.height / 2 };
        const tgtC = { x: tgt.x + tgt.width / 2, y: tgt.y + tgt.height / 2 };
        const p1 = rectBoundaryPointToward(src, tgtC.x, tgtC.y);
        const p2 = rectBoundaryPointToward(tgt, srcC.x, srcC.y);
        const points = [p1, p2];
        edgePolylines.push(points);
        edgeDotted.push(isStructuralEdgeRelationship(edge.type));

        const labelText = graphEdgeLabel(edge);
        if (labelText) {
            const bias = labelBiasEnd(focusId, edge.source, edge.target);
            const anchor = labelPointAlongPolyline(points, bias);
            labelCandidates.push({
                text: labelText,
                x: anchor.x,
                y: anchor.y,
                align: anchor.align,
            });
        }
    });

    return { edgePolylines, edgeDotted, labelCandidates };
}
