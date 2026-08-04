import { TabVariant } from '../../const';
import { IImpactBreadcrumb } from '../../types';

export interface IAppTable {
    cmdb: string;
    tabVariant: TabVariant;
    breadcrumbs: IImpactBreadcrumb[];
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
}
