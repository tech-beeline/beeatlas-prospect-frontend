import { TabVariant } from '../../const';
import { IImpactBreadcrumb } from '../../types';

export interface IDeploymentAppTable {
    id: string;
    tabVariant: TabVariant;
    breadcrumbs: IImpactBreadcrumb[];
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
}
