import { C4_COLORS } from '../../../../types';
import { getMainLabel } from '../labels';

import { escapeXml } from './svgHelpers';
import { RenderClustersSvgArgs } from './types';

export const renderClustersSvg = (args: RenderClustersSvgArgs) => {
    const { parts, layout, clusters, selectedId, panX, panY, palette: pal } = args;
    if (!clusters) return;

    for (const ln of layout) {
        const cm = clusters[ln.node.id];
        if (!cm) continue;

        const mainLabel = getMainLabel(ln.node.labels);
        const color = C4_COLORS[mainLabel] || '#777';
        const x = ln.x + panX;
        const y = ln.y + panY;
        const isSel = selectedId === ln.node.id;

        if (isSel) {
            parts.push(
                `<rect x="${x - 3}" y="${y - 3}" width="${ln.width + 6}" height="${
                    ln.height + 6
                }" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"/>`,
            );
        }

        const strokeW = isSel ? 2 : 1.5;
        const strokeC = isSel ? color : pal.clusterOuterBorder;
        parts.push(
            `<rect x="${x}" y="${y}" width="${ln.width}" height="${ln.height}" fill="${pal.cardFill}" stroke="${strokeC}" stroke-width="${strokeW}" stroke-dasharray="8 6"/>`,
        );

        const edgePipe = cm.edgeLabel && cm.edgeLabel !== '(no-label)' ? ` | ${cm.edgeLabel}` : '';
        parts.push(
            `<text x="${x + 10}" y="${
                y + 15
            }" font-family="JetBrains Mono, monospace" font-size="10" font-weight="bold" fill="${color}">[GROUP ${escapeXml(
                cm.memberType.toUpperCase(),
            )}]</text>`,
        );
        parts.push(
            `<text x="${x + 10}" y="${
                y + 28
            }" font-family="JetBrains Mono, monospace" font-size="10" fill="${
                pal.clusterTitleMuted
            }">${cm.members.length} nodes${escapeXml(edgePipe)}</text>`,
        );
    }
};
