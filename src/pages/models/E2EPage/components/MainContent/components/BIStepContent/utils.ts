import { TabVariants } from './const';

const withCount = (label: string, count: number) => (count > 1 ? `${label} (${count})` : label);

export const getTabLabel = (
    tab: TabVariants,
    label: string,
    e2eCount: number,
    usecaseCount: number,
) => {
    if (tab === TabVariants.CALLS) return withCount(label, e2eCount);
    if (tab === TabVariants.USECASE_CALLS) return withCount(label, usecaseCount);
    return label;
};
