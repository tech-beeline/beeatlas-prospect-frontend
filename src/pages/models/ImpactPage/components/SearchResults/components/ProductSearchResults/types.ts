import { ISearchSystem } from 'api/graph/types';
import { IImpactBreadcrumb } from 'pages/models/ImpactPage/types';

export interface IProductSearchResults {
    products: ISearchSystem[];
    search: string;
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
    visitedPages: string[];
}
