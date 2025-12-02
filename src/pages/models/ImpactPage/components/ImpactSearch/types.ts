import { IImpactBreadcrumb } from '../../types';

export interface IImpactSearch {
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
}
