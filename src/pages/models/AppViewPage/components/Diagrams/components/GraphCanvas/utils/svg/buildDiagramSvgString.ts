import { getDiagramPalette } from '../../../../utils/theme';

import { renderClusterMembersSvg } from './renderClusterMembersSvg';
import { renderClustersSvg } from './renderClustersSvg';
import { renderEdgeLabelsSvg } from './renderEdgeLabelsSvg';
import { renderEdgesSvg } from './renderEdgesSvg';
import { renderNodesSvg } from './renderNodesSvg';
import { BuildDiagramSvgStringArgs } from './types';

export const buildDiagramSvgString = (options: BuildDiagramSvgStringArgs): string => {
    const {
        width,
        height,
        panX,
        panY,
        layout,
        edgePolylines,
        edgeDotted,
        edgeLabels,
        selectedId,
        tagCounts,
        palette: paletteOpt,
        clusters,
        clusterMemberOffsets,
    } = options;

    const pal = paletteOpt ?? getDiagramPalette(false);
    const parts: string[] = [];

    parts.push(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    );
    parts.push(`<rect width="100%" height="100%" fill="${pal.canvasBg}"/>`);

    renderEdgesSvg({ parts, edgePolylines, edgeDotted, panX, panY, palette: pal });
    renderEdgeLabelsSvg({ parts, edgeLabels, panX, panY, palette: pal });

    renderClustersSvg({ parts, layout, clusters, selectedId, panX, panY, palette: pal });
    renderNodesSvg({ parts, layout, clusters, selectedId, tagCounts, panX, panY, palette: pal });
    renderClusterMembersSvg({
        parts,
        layout,
        clusters,
        clusterMemberOffsets,
        panX,
        panY,
        palette: pal,
    });

    parts.push(`</svg>`);
    return parts.join('\n');
};
