import { ISearchDeployment } from 'api/graph/types';
import { IInfraData } from 'api/product/types';
import { IImpactBreadcrumb } from 'pages/models/ImpactPage/types';

export interface IServerSearchResults {
    servers: { graph: ISearchDeployment[]; cmdb: IInfraData[] };
    search: string;
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
    visitedPages: string[];
}
