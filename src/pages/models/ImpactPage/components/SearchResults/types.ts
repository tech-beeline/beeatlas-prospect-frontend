import { IImpactBreadcrumb } from '../../types';

export interface ISearchResults {
    search: string;
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
    visitedPages: string[];
}
