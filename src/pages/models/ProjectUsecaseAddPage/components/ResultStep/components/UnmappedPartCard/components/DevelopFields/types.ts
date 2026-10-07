import { IFullProductData } from 'api/product/types';

import { IResolutionDraft } from '../../../../../../types';

export interface IDevelopFields {
    products: IFullProductData[];
    productsLoading: boolean;
    draft: IResolutionDraft;
    disabled: boolean;
    onDraftChange: (patch: Partial<IResolutionDraft>) => void;
}
