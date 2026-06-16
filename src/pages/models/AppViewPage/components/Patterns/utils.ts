import { IProductPattern } from 'api/product/types';

import { PatternType, PatternTypeValue } from './const';

export function filterProductPatterns(
    patterns: IProductPattern[],
    searchQuery: string,
    patternType: PatternTypeValue | null,
): IProductPattern[] {
    const q = searchQuery.trim().toLowerCase();

    return patterns.filter((p) => {
        if (patternType && patternType !== PatternType.ALL) {
            if (patternType === PatternType.PATTERN && p.isAntiPattern) {
                return false;
            }
            if (patternType === PatternType.ANTIPATTERN && !p.isAntiPattern) {
                return false;
            }
        }

        if (!q) {
            return true;
        }

        return (
            p.name.toLowerCase().includes(q) ||
            p.technologies.some((t) => t.label.toLowerCase().includes(q))
        );
    });
}
