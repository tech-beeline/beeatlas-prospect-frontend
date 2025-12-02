import { SearchVariants } from '../../const';
import { IImpactBreadcrumb } from '../../types';

export interface ISearchResults {
    search: string;
    searchVariant: SearchVariants;
    setBreadcrumbs: (breadcrumbs: IImpactBreadcrumb[]) => void;
}
