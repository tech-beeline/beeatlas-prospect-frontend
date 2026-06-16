import { DiagramPalette } from '../../../types';
import { PIN_TOGGLE_H, PIN_TOGGLE_PAD_BOTTOM, PIN_TOGGLE_PAD_X, PIN_TOGGLE_W } from '../const';
import type { LayoutNode } from '../types';

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

function pinToggleRect(ln: LayoutNode): { x: number; y: number; w: number; h: number } {
    return {
        x: ln.x + ln.width - PIN_TOGGLE_W - PIN_TOGGLE_PAD_X,
        y: ln.y + ln.height - PIN_TOGGLE_PAD_BOTTOM - PIN_TOGGLE_H,
        w: PIN_TOGGLE_W,
        h: PIN_TOGGLE_H,
    };
}

export function hitTestPinToggle(ln: LayoutNode, x: number, y: number): boolean {
    const r = pinToggleRect(ln);
    return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

export function drawPinToggle(
    ctx: CanvasRenderingContext2D,
    ln: LayoutNode,
    isPinned: boolean,
    palette: DiagramPalette,
): void {
    const r = pinToggleRect(ln);
    const rr = PIN_TOGGLE_H / 2;
    ctx.save();
    roundRectPath(ctx, r.x, r.y, r.w, r.h, rr);
    ctx.fillStyle = isPinned ? 'rgba(245, 158, 11, 0.35)' : palette.cardBorder;
    ctx.fill();
    ctx.strokeStyle = palette.clusterOuterBorder;
    ctx.lineWidth = 1;
    ctx.stroke();
    const pad = 2;
    const thumbR = (PIN_TOGGLE_H - pad * 2) / 2;
    const cx = isPinned ? r.x + r.w - pad - thumbR : r.x + pad + thumbR;
    const cy = r.y + PIN_TOGGLE_H / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, thumbR, 0, Math.PI * 2);
    ctx.fillStyle = isPinned ? '#d97706' : palette.clusterInnerFill;
    ctx.fill();
    ctx.strokeStyle = palette.clusterInnerBorder;
    ctx.stroke();
    ctx.restore();
}
