import { C4_COLORS } from '../../../../types';
import { getLabelDisplay, getMainLabel } from '../labels';

import { escapeXml } from './svgHelpers';
import { RenderNodesSvgArgs } from './types';

export function renderNodesSvg(args: RenderNodesSvgArgs): void {
    const { parts, layout, clusters, selectedId, tagCounts, panX, panY, palette: pal } = args;

    for (const ln of layout) {
        if (clusters?.[ln.node.id]) continue;

        const mainLabel = getMainLabel(ln.node.labels);
        const color = C4_COLORS[mainLabel] || '#777';
        const x = ln.x + panX;
        const y = ln.y + panY;
        const isSel = selectedId === ln.node.id;
        const tc = tagCounts?.[ln.node.id] ?? 0;

        if (isSel) {
            parts.push(
                `<rect x="${x - 3}" y="${y - 3}" width="${ln.width + 6}" height="${
                    ln.height + 6
                }" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"/>`,
            );
        }

        parts.push(
            `<rect x="${x}" y="${y}" width="${ln.width}" height="${ln.height}" fill="${
                pal.cardFill
            }" stroke="${isSel ? color : pal.cardBorder}" stroke-width="${isSel ? 2 : 1}"/>`,
        );

        if (tc > 0) {
            parts.push(
                `<rect x="${x}" y="${y}" width="${ln.width}" height="3" fill="${pal.tagStrip}"/>`,
            );
        }

        parts.push(`<rect x="${x}" y="${y}" width="4" height="${ln.height}" fill="${color}"/>`);

        const tag = getLabelDisplay(mainLabel);
        const name = ln.node.name.length > 22 ? ln.node.name.slice(0, 20) + '...' : ln.node.name;

        parts.push(
            `<text x="${x + 12}" y="${
                y + 18
            }" font-family="JetBrains Mono, monospace" font-size="10" fill="${color}">[${escapeXml(
                tag,
            )}]</text>`,
        );
        parts.push(
            `<text x="${x + 12}" y="${
                y + 38
            }" font-family="JetBrains Mono, monospace" font-size="12" fill="${
                pal.textPrimary
            }">${escapeXml(name)}</text>`,
        );

        if (ln.node.technology) {
            const tech =
                ln.node.technology.length > 26
                    ? ln.node.technology.slice(0, 24) + '...'
                    : ln.node.technology;
            parts.push(
                `<text x="${x + 12}" y="${
                    y + 56
                }" font-family="JetBrains Mono, monospace" font-size="10" fill="${
                    pal.textSecondary
                }">${escapeXml(tech)}</text>`,
            );
        }

        if (tc > 0) {
            const pad = 4;
            const badgeH = 18;
            const countStr = String(tc);
            const approxCharW = 6.6;
            const padX = 7;
            const tw = countStr.length * approxCharW;
            const badgeW = Math.min(Math.max(badgeH, Math.ceil(tw + padX * 2)), ln.width - pad * 2);
            const bx = x + ln.width - badgeW - pad;
            const by = y + pad;
            parts.push(
                `<rect x="${bx}" y="${by}" width="${badgeW}" height="${badgeH}" rx="${
                    badgeH / 2
                }" fill="${pal.badgeStroke}" stroke="${pal.badgeStroke}" stroke-width="1"/>`,
            );
            parts.push(
                `<text x="${bx + badgeW / 2}" y="${
                    by + badgeH / 2 + 4
                }" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="bold" fill="${
                    pal.canvasBg
                }">${escapeXml(countStr)}</text>`,
            );
        }
    }
}
