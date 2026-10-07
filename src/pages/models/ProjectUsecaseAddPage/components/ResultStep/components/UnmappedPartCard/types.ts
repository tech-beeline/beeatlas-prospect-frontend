import { IFullProductData } from 'api/product/types';
import { IProjectUsecasePipelineOperation } from 'api/staging-service/types';

import { CallDecisionType, IResolutionDraft } from '../../../../types';

export interface IUnmappedPartCard {
    operation: IProjectUsecasePipelineOperation;
    products: IFullProductData[];
    productsLoading: boolean;
    draft: IResolutionDraft;
    isEditing: boolean;
    disabled: boolean;
    onEdit: () => void;
    onTypeChange: (type: CallDecisionType) => void;
    onDraftChange: (patch: Partial<IResolutionDraft>) => void;
}
