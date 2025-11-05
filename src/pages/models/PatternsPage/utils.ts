import { IPattern } from 'api/patterns/types';

import { FilterVariants } from './const';

export const filterPatterns = (
    patterns: IPattern[],
    search: string,
    filterVariant: FilterVariants,
    selectedTechnologies: string[],
    selectedGroups: number[],
): IPattern[] => {
    return patterns.filter((pattern) => {
        if (search) {
            const lowerSearch = search.toLowerCase();
            const matchesSearch =
                pattern.name.toLowerCase().includes(lowerSearch) ||
                (pattern.description?.toLowerCase().includes(lowerSearch) ?? false);
            if (!matchesSearch) return false;
        }

        switch (filterVariant) {
            case FilterVariants.PATTERNS:
                if (pattern.isAntiPattern) return false;
                break;
            case FilterVariants.ANTIPATTERNS:
                if (!pattern.isAntiPattern) return false;
                break;
            case FilterVariants.ALL:
                break;
            default:
                break;
        }

        if (selectedTechnologies.length > 0) {
            if (!pattern.technologies || pattern.technologies.length === 0) return false;

            const hasAllTechs = selectedTechnologies.every((techId) =>
                pattern.technologies?.some((pTech) => String(pTech.id) === techId),
            );

            if (!hasAllTechs) return false;
        }

        if (selectedGroups.length > 0) {
            if (!pattern.groups || pattern.groups.length === 0) return false;

            const hasGroupMatch = selectedGroups.some((groupId) =>
                pattern.groups?.some((g) => g.id === groupId),
            );
            if (!hasGroupMatch) return false;
        }

        return true;
    });
};
