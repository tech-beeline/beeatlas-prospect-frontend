import { C4_COLORS } from '../../../../types';
import { DiagramPalette } from '../../../../types';
import { nodeDisplayName } from '../../../../utils';
import {
    CLUSTER_BOX_PADDING,
    CLUSTER_HEADER_H,
    CLUSTER_MEMBER_GAP,
    CLUSTER_MEMBER_H,
    CLUSTER_MEMBER_NAME_MAX_CHARS,
    CLUSTER_MEMBER_W,
    NODE_NAME_MAX_CHARS,
} from '../../const';
import type { ClusterMeta, LayoutNode } from '../../types';
import { isClusterNode } from '../cluster';
import { clusterMemberOffsetKey } from '../common';
import { getLabelDisplay, getMainLabel, isNameTruncated } from '../labels';
import { drawPinToggle } from '../pinToggle';

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

function drawTagBadge(
    ctx: CanvasRenderingContext2D,
    ln: LayoutNode,
    count: number,
    palette: DiagramPalette,
): void {
    if (count <= 0) return;
    const pad = 4;
    const badgeH = 18;
    const padX = 7;
    const countStr = String(count);
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    const tw = ctx.measureText(countStr).width;
    const badgeW = Math.min(Math.max(badgeH, Math.ceil(tw + padX * 2)), ln.width - pad * 2);
    const rx = ln.x + ln.width - badgeW - pad;
    const ry = ln.y + pad;

    ctx.fillStyle = palette.badgeStroke;
    ctx.strokeStyle = palette.badgeStroke;
    ctx.lineWidth = 1;
    roundRectPath(ctx, rx, ry, badgeW, badgeH, badgeH / 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = palette.canvasBg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(countStr, rx + badgeW / 2, ry + badgeH / 2 + 0.5);
}

function clusterMemberSlotRect(
    ln: LayoutNode,
    memberIdx: number,
    memberCount: number,
): { mx: number; my: number } {
    const cols = Math.ceil(Math.sqrt(memberCount));
    const col = memberIdx % cols;
    const row = Math.floor(memberIdx / cols);
    const innerStartX = ln.x + CLUSTER_BOX_PADDING;
    const innerStartY = ln.y + CLUSTER_BOX_PADDING + CLUSTER_HEADER_H;
    return {
        mx: innerStartX + col * (CLUSTER_MEMBER_W + CLUSTER_MEMBER_GAP),
        my: innerStartY + row * (CLUSTER_MEMBER_H + CLUSTER_MEMBER_GAP),
    };
}

/** Внутренние мини-карточки группы — отдельным проходом поверх рёбер, иначе линии перекрывают ячейки. */
export function paintClusterInnerMiniCards(
    ctx: CanvasRenderingContext2D,
    layout: LayoutNode[],
    clusterMetaById: ReadonlyMap<string, ClusterMeta>,
    palette: DiagramPalette,
    memberOffsetsRecord?: Record<string, { dx: number; dy: number }> | null,
): void {
    layout.forEach((ln) => {
        const clusterMeta = clusterMetaById.get(ln.node.id);
        if (!clusterMeta || !isClusterNode(ln.node)) return;
        const mainLabel = getMainLabel(ln.node.labels);
        const color = C4_COLORS[mainLabel] || '#777';
        const clusterId = ln.node.id;
        ctx.save();
        clusterMeta.members.forEach((member, idx) => {
            const slot = clusterMemberSlotRect(ln, idx, clusterMeta.members.length);
            const key = clusterMemberOffsetKey(clusterId, member.id);
            const off = memberOffsetsRecord?.[key] ?? { dx: 0, dy: 0 };
            const mx = slot.mx + off.dx;
            const my = slot.my + off.dy;
            ctx.fillStyle = palette.clusterInnerFill;
            ctx.strokeStyle = palette.clusterInnerBorder;
            ctx.lineWidth = 1;
            ctx.fillRect(mx, my, CLUSTER_MEMBER_W, CLUSTER_MEMBER_H);
            ctx.strokeRect(mx, my, CLUSTER_MEMBER_W, CLUSTER_MEMBER_H);
            ctx.fillStyle = color;
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';
            const dn = nodeDisplayName(member);
            const shortName = isNameTruncated(dn, CLUSTER_MEMBER_NAME_MAX_CHARS)
                ? `${dn.slice(0, CLUSTER_MEMBER_NAME_MAX_CHARS - 2)}...`
                : dn;
            ctx.fillText(shortName, mx + 8, my + 22);
        });
        ctx.restore();
    });
}

export function paintDiagramNodes(
    ctx: CanvasRenderingContext2D,
    layout: LayoutNode[],
    sel: string | null,
    tagCountByNodeId: ReadonlyMap<string, number>,
    clusterMetaById: ReadonlyMap<string, ClusterMeta>,
    palette: DiagramPalette,
    pinnedNodeIds?: ReadonlySet<string>,
): void {
    layout.forEach((ln) => {
        const mainLabel = getMainLabel(ln.node.labels);
        const color = C4_COLORS[mainLabel] || '#777';
        const isSelected = ln.node.id === sel;
        const tagCount = tagCountByNodeId.get(ln.node.id) ?? 0;
        const clusterMeta = clusterMetaById.get(ln.node.id);

        if (clusterMeta && isClusterNode(ln.node)) {
            ctx.save();
            ctx.fillStyle = palette.cardFill;
            ctx.fillRect(ln.x, ln.y, ln.width, ln.height);
            ctx.strokeStyle = isSelected ? color : palette.clusterOuterBorder;
            ctx.lineWidth = isSelected ? 2 : 1.5;
            ctx.setLineDash([8, 6]);
            ctx.strokeRect(ln.x, ln.y, ln.width, ln.height);
            ctx.setLineDash([]);

            const p = ln.node.properties as Record<string, unknown>;
            const edgeLabel = typeof p.__clusterEdgeLabel === 'string' ? p.__clusterEdgeLabel : '';
            ctx.fillStyle = color;
            ctx.font = 'bold 10px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`[GROUP ${clusterMeta.memberType.toUpperCase()}]`, ln.x + 10, ln.y + 15);
            ctx.fillStyle = palette.clusterTitleMuted;
            ctx.font = '10px "JetBrains Mono", monospace';
            const title = `${clusterMeta.members.length} nodes${
                edgeLabel ? ` | ${edgeLabel}` : ''
            }`;
            ctx.fillText(title, ln.x + 10, ln.y + 28);
            ctx.restore();
            return;
        }

        ctx.fillStyle = palette.cardFill;
        ctx.fillRect(ln.x, ln.y, ln.width, ln.height);

        if (tagCount > 0) {
            ctx.fillStyle = palette.tagStrip;
            ctx.fillRect(ln.x, ln.y, ln.width, 3);
        }

        if (isSelected) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.strokeRect(ln.x - 3, ln.y - 3, ln.width + 6, ln.height + 6);
            ctx.restore();
        }

        ctx.strokeStyle = isSelected ? color : palette.cardBorder;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.strokeRect(ln.x, ln.y, ln.width, ln.height);

        ctx.fillStyle = color;
        ctx.fillRect(ln.x, ln.y, 4, ln.height);

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.fillText(`[${getLabelDisplay(mainLabel)}]`, ln.x + 12, ln.y + 18);

        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = palette.textPrimary;
        const display = nodeDisplayName(ln.node);
        const name = isNameTruncated(display, NODE_NAME_MAX_CHARS)
            ? `${display.slice(0, NODE_NAME_MAX_CHARS - 2)}...`
            : display;
        ctx.fillText(name, ln.x + 12, ln.y + 38);

        if (ln.node.technology) {
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = palette.textSecondary;
            const tech =
                ln.node.technology.length > 26
                    ? ln.node.technology.slice(0, 24) + '...'
                    : ln.node.technology;
            ctx.fillText(tech, ln.x + 12, ln.y + 56);
        }

        drawTagBadge(ctx, ln, tagCount, palette);

        if (pinnedNodeIds !== undefined) {
            const pinned = pinnedNodeIds.has(ln.node.id);
            drawPinToggle(ctx, ln, pinned, palette);
        }
    });
}
