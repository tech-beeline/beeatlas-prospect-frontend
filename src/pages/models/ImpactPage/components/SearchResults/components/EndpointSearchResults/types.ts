import { ISearchEndpoint } from 'api/graph/types';
import { IImpactBreadcrumb } from 'pages/models/ImpactPage/types';

export interface IEndpointSearchResults {
    endpoints: { archOperations: ISearchEndpoint[]; discoveredOperations: ISearchEndpoint[] };
    search: string;
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
    visitedPages: string[];
}
