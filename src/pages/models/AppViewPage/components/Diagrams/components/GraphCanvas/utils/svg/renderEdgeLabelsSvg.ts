import { escapeXml, textAnchorForAlign } from './svgHelpers';
import { RenderEdgeLabelsSvgArgs } from './types';

export const renderEdgeLabelsSvg = (args: RenderEdgeLabelsSvgArgs) => {
    const { parts, edgeLabels, panX, panY, palette: pal } = args;

    for (const g of edgeLabels) {
        const tx = g.x + panX;
        const ty = g.y + panY;
        const anchor = textAnchorForAlign(g.align);
        parts.push(
            `<text x="${tx}" y="${ty}" text-anchor="${anchor}" dominant-baseline="alphabetic" font-family="JetBrains Mono, monospace" font-size="11" fill="${
                pal.edgeLabelText
            }" stroke="${
                pal.edgeLabelTextHalo
            }" stroke-width="2" paint-order="stroke fill">${escapeXml(g.text)}</text>`,
        );
    }
};
