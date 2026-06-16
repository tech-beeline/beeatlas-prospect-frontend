export interface IFilterOptions {
    search: string;
    sector: number | null;
    ring: number | null;
    groups: number[];
}

export interface IImpactBreadcrumb {
    link: string;
    name: string;
}
