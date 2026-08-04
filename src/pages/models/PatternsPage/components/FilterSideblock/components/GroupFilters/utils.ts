import { IPattern, IPatternGroupTree } from 'api/patterns/types';

export const hasPatternsRecursive = (
    group: IPatternGroupTree,
    patterns: IPattern[] | undefined,
): boolean => {
    if (!patterns) return false;

    const hasHere = patterns.some((pattern) => pattern.groups?.some((g) => g.id === group.id));

    if (hasHere) return true;

    if (group.children?.length) {
        return group.children.some((child) => hasPatternsRecursive(child, patterns));
    }

    return false;
};

export const filterGroupData = (
    tree: IPatternGroupTree[],
    searchString: string,
): IPatternGroupTree[] => {
    return tree.reduce((acc: IPatternGroupTree[], node) => {
        const filteredChildren = filterGroupData(node.children, searchString);
        const matchesName = node.name.toLowerCase().includes(searchString.toLowerCase());

        if (matchesName || filteredChildren.length > 0) {
            acc.push({ ...node, children: filteredChildren });
        }

        return acc;
    }, []);
};
