import { polylineD } from './svgHelpers';
import { RenderEdgesSvgArgs } from './types';

export const renderEdgesSvg = (args: RenderEdgesSvgArgs) => {
    const { parts, edgePolylines, edgeDotted, panX, panY, palette: pal } = args;

    for (let i = 0; i < edgePolylines.length; i++) {
        const pl = edgePolylines[i]!;
        if (pl.length < 2) continue;
        const dotted = edgeDotted?.[i] ?? false;
        const dash = dotted ? ' stroke-dasharray="2 6"' : '';
        const d = polylineD(pl, panX, panY);
        parts.push(
            `<path d="${d}" fill="none" stroke="${pal.edgeHalo}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"${dash}/>`,
        );
        parts.push(
            `<path d="${d}" fill="none" stroke="${pal.edgeStroke}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"${dash}/>`,
        );
        const a = pl[pl.length - 2]!;
        const b = pl[pl.length - 1]!;
        const ang = Math.atan2(b.y - a.y, b.x - a.x);
        const bx = b.x + panX;
        const by = b.y + panY;
        const s = 8;
        const p1x = bx - s * Math.cos(ang - 0.4);
        const p1y = by - s * Math.sin(ang - 0.4);
        const p2x = bx - s * Math.cos(ang + 0.4);
        const p2y = by - s * Math.sin(ang + 0.4);
        parts.push(
            `<polygon points="${bx},${by} ${p1x},${p1y} ${p2x},${p2y}" fill="${pal.edgeStroke}"/>`,
        );
    }
};
