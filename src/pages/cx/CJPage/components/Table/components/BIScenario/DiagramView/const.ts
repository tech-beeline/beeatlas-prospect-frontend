export enum DisplayOptions {
    DIAGRAM = 'DIAGRAM',
    TEXT = 'TEXT',
}
export const getTcKey = (tcCode: string) => {
    return tcCode.includes('.') ? tcCode.split('.').pop()! : tcCode;
};

export const downloadDiagramFile = (filename: string, content: string, type: 'svg' | 'puml') => {
    const mime = type === 'svg' ? 'image/svg+xml;charset=utf-8,' : 'text/plain;charset=utf-8,';

    const element = document.createElement('a');

    element.setAttribute('href', `data:${mime}` + encodeURIComponent(content));

    element.setAttribute(
        'download',
        filename.endsWith(`.${type}`) ? filename : `${filename}.${type}`,
    );

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export const isEmptySvg = (svg?: string) => {
    if (!svg) return true;

    const normalized = svg.replace(/\s/g, '');

    if (normalized.includes('width="1"height="1"')) {
        return true;
    }

    const hasGraphics = /<(path|rect|circle|line|polyline|polygon|text)/i.test(svg);

    return !hasGraphics;
};
