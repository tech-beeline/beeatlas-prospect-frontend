export const getFileName = (key?: string): string => {
    if (!key) return 'diagram.bpmn';

    const filePart = key.split('/').pop() || '';
    const withoutExt = filePart.replace('.bpmn', '');
    const base = withoutExt.split('_')[0];

    const cleanedBase = base.replace(/%(?![0-9a-fA-F]{2})/g, '');

    try {
        return `${decodeURI(cleanedBase)}.bpmn`;
    } catch (error) {
        return `${cleanedBase}.bpmn`;
    }
};
