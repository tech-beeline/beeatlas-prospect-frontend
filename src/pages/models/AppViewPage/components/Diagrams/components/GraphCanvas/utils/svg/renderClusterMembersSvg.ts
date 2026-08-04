import { C4_COLORS } from '../../../../types';
import {
    CLUSTER_BOX_PADDING,
    CLUSTER_HEADER_H,
    CLUSTER_MEMBER_GAP,
    CLUSTER_MEMBER_H,
    CLUSTER_MEMBER_W,
} from '../../const';
import { clusterMemberOffsetKey, getMainLabel } from '..';

import { escapeXml } from './svgHelpers';
import { RenderClusterMembersSvgArgs } from './types';

export const renderClusterMembersSvg = (args: RenderClusterMembersSvgArgs) => {
    const { parts, layout, clusters, clusterMemberOffsets, panX, panY, palette: pal } = args;
    if (!clusters || Object.keys(clusters).length === 0) return;

    for (const ln of layout) {
        const cm = clusters[ln.node.id];
        if (!cm) continue;

        const mainLabel = getMainLabel(ln.node.labels);
        const color = C4_COLORS[mainLabel] || '#777';
        const x = ln.x + panX;
        const y = ln.y + panY;
        const cols = Math.ceil(Math.sqrt(cm.members.length));
        const innerStartX = x + CLUSTER_BOX_PADDING;
        const innerStartY = y + CLUSTER_BOX_PADDING + CLUSTER_HEADER_H;

        cm.members.forEach((member, idx) => {
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const mx0 = innerStartX + col * (CLUSTER_MEMBER_W + CLUSTER_MEMBER_GAP);
            const my0 = innerStartY + row * (CLUSTER_MEMBER_H + CLUSTER_MEMBER_GAP);
            const off = clusterMemberOffsets?.[clusterMemberOffsetKey(ln.node.id, member.id)] ?? {
                dx: 0,
                dy: 0,
            };
            const mx = mx0 + off.dx;
            const my = my0 + off.dy;
            const shortName =
                member.name.length > 14 ? `${member.name.slice(0, 12)}...` : member.name;

            parts.push(
                `<rect x="${mx}" y="${my}" width="${CLUSTER_MEMBER_W}" height="${CLUSTER_MEMBER_H}" fill="${pal.clusterInnerFill}" stroke="${pal.clusterInnerBorder}" stroke-width="1"/>`,
            );
            parts.push(
                `<text x="${mx + 8}" y="${
                    my + 22
                }" font-family="JetBrains Mono, monospace" font-size="10" fill="${color}">${escapeXml(
                    shortName,
                )}</text>`,
            );
        });
    }
};
