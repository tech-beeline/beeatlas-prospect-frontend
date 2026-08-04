import type { Point } from '../gridRouter';

export function escapeXml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function polylineD(points: Point[], panX: number, panY: number): string {
    if (points.length === 0) return '';
    const p0 = points[0]!;
    let d = `M ${p0.x + panX} ${p0.y + panY}`;
    for (let i = 1; i < points.length; i++) {
        const p = points[i]!;
        d += ` L ${p.x + panX} ${p.y + panY}`;
    }
    return d;
}

export function textAnchorForAlign(align: CanvasTextAlign): 'start' | 'middle' | 'end' {
    return align === 'center' ? 'middle' : align === 'right' ? 'end' : 'start';
}
