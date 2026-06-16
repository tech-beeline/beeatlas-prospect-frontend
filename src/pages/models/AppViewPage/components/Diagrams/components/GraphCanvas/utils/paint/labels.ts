import type { EdgeLabelGeom } from '../../types';

const EDGE_LABEL_FONT = '11px "JetBrains Mono", monospace';
const EDGE_LABEL_LINE = 12;
const EDGE_LABEL_PAD = 4;

function roundRectPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
}

function labelBoundingBox(
    ctx: CanvasRenderingContext2D,
    g: EdgeLabelGeom,
): { left: number; top: number; right: number; bottom: number } {
    ctx.font = EDGE_LABEL_FONT;
    const w = ctx.measureText(g.text).width;
    const pad = EDGE_LABEL_PAD;
    let left: number;
    if (g.align === 'center') left = g.x - w / 2 - pad;
    else if (g.align === 'right') left = g.x - w - pad;
    else left = g.x - pad;
    const top = g.y - EDGE_LABEL_LINE - pad;
    return {
        left,
        top,
        right: left + w + pad * 2,
        bottom: top + EDGE_LABEL_LINE + pad * 2,
    };
}

function boxesOverlap(
    a: { left: number; top: number; right: number; bottom: number },
    b: { left: number; top: number; right: number; bottom: number },
): boolean {
    return !(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top);
}

/** Push labels apart vertically (greedy) so bounding boxes do not overlap. */
export function resolveEdgeLabelOverlaps(
    ctx: CanvasRenderingContext2D,
    labels: EdgeLabelGeom[],
): EdgeLabelGeom[] {
    if (labels.length === 0) return [];
    const sorted = [...labels].sort((a, b) => a.y - b.y || a.x - b.x);
    const placed: EdgeLabelGeom[] = [];
    const step = 15;
    const maxShift = 120;

    for (const g of sorted) {
        let cur: EdgeLabelGeom = { ...g };
        let box = labelBoundingBox(ctx, cur);
        let n = 0;
        while (n * step < maxShift) {
            let hit = false;
            for (const p of placed) {
                if (boxesOverlap(box, labelBoundingBox(ctx, p))) {
                    hit = true;
                    break;
                }
            }
            if (!hit) break;
            cur = { ...cur, y: cur.y + step };
            box = labelBoundingBox(ctx, cur);
            n += 1;
        }
        placed.push(cur);
    }
    return placed;
}

export function drawEdgeLabelPill(
    ctx: CanvasRenderingContext2D,
    g: EdgeLabelGeom,
    palette: {
        edgeLabelBg: string;
        edgeLabelBorder: string;
        edgeLabelText: string;
    },
) {
    ctx.font = EDGE_LABEL_FONT;
    const m = ctx.measureText(g.text);
    const w = m.width;
    const pad = EDGE_LABEL_PAD;
    let rx: number;
    if (g.align === 'center') rx = g.x - w / 2 - pad;
    else if (g.align === 'right') rx = g.x - w - pad;
    else rx = g.x - pad;
    const ry = g.y - EDGE_LABEL_LINE - pad;
    const rw = w + pad * 2;
    const rh = EDGE_LABEL_LINE + pad * 2;

    ctx.fillStyle = palette.edgeLabelBg;
    roundRectPath(ctx, rx, ry, rw, rh, 4);
    ctx.fill();
    ctx.strokeStyle = palette.edgeLabelBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = palette.edgeLabelText;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = g.align;
    ctx.fillText(g.text, g.x, g.y);
}
