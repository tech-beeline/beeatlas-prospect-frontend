import { DiagramPalette } from '../../../../types';
import { EDGE_DOT_DASH, EDGE_HALO_WIDTH, EDGE_STROKE_WIDTH } from '../../const';
import type { Point } from '../gridRouter';
import { arrowAngleFromPolyline } from '../gridRouter';

function tracePolylinePath(ctx: CanvasRenderingContext2D, points: Point[]): void {
    if (points.length === 0) return;
    ctx.moveTo(points[0]!.x, points[0]!.y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i]!.x, points[i]!.y);
    }
}

function simplifyPolylinePoints(points: Point[], stride: number): Point[] {
    if (stride <= 1 || points.length <= 3) return points;
    const out: Point[] = [points[0]!];
    for (let i = 1; i < points.length - 1; i++) {
        if (i % stride === 0) out.push(points[i]!);
    }
    out.push(points[points.length - 1]!);
    return out;
}

function traceSplinePath(
    ctx: CanvasRenderingContext2D,
    points: Point[],
    options?: { lowQuality?: boolean },
): void {
    if (points.length === 0) return;
    if (points.length < 3) {
        tracePolylinePath(ctx, points);
        return;
    }
    const work = options?.lowQuality ? simplifyPolylinePoints(points, 2) : points;
    ctx.moveTo(work[0]!.x, work[0]!.y);
    for (let i = 1; i < work.length - 1; i++) {
        const p = work[i]!;
        const n = work[i + 1]!;
        const mx = (p.x + n.x) / 2;
        const my = (p.y + n.y) / 2;
        ctx.quadraticCurveTo(p.x, p.y, mx, my);
    }
    const penultimate = work[work.length - 2]!;
    const last = work[work.length - 1]!;
    ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
}

function strokeSplineOverNodes(
    ctx: CanvasRenderingContext2D,
    points: Point[],
    options?: { lowQuality?: boolean; dotted?: boolean; palette: DiagramPalette },
): void {
    if (points.length < 2) return;
    const pal = options?.palette;
    if (!pal) return;
    const dash = options?.dotted ? EDGE_DOT_DASH : [];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash(dash);
    ctx.beginPath();
    traceSplinePath(ctx, points, options);
    ctx.strokeStyle = pal.edgeHalo;
    ctx.lineWidth = EDGE_HALO_WIDTH;
    ctx.stroke();
    ctx.beginPath();
    traceSplinePath(ctx, points, options);
    ctx.strokeStyle = pal.edgeStroke;
    ctx.lineWidth = EDGE_STROKE_WIDTH;
    ctx.stroke();
    ctx.setLineDash([]);
}

export function paintDiagramEdges(
    ctx: CanvasRenderingContext2D,
    edgePolylines: Point[][],
    options?: {
        hideHalo?: boolean;
        lowQuality?: boolean;
        edgeDotted?: boolean[];
        palette: DiagramPalette;
    },
): void {
    const palette = options?.palette;
    if (!palette) return;
    const dottedFlags = options?.edgeDotted;
    edgePolylines.forEach((points, i) => {
        const dotted = dottedFlags?.[i] ?? false;
        if (options?.hideHalo) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.setLineDash(dotted ? EDGE_DOT_DASH : []);
            ctx.beginPath();
            traceSplinePath(ctx, points, { lowQuality: options?.lowQuality });
            ctx.strokeStyle = palette.edgeStroke;
            ctx.lineWidth = EDGE_STROKE_WIDTH;
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            strokeSplineOverNodes(ctx, points, {
                lowQuality: options?.lowQuality,
                dotted,
                palette,
            });
        }
        if (points.length < 2) return;
        const angle = arrowAngleFromPolyline(points);
        const tx = points[points.length - 1]!.x;
        const ty = points[points.length - 1]!.y;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx - 8 * Math.cos(angle - 0.4), ty - 8 * Math.sin(angle - 0.4));
        ctx.lineTo(tx - 8 * Math.cos(angle + 0.4), ty - 8 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = palette.edgeStroke;
        ctx.fill();
    });
}
