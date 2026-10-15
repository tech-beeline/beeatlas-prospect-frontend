import { IProductE2eOperation, IProductE2eStep } from 'api/product/types';
import { E2EContentOptions, E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';

import { IParticipationRow } from '../../types';

const getE2EStepUrl = (biStepCode: string) =>
    `${R.MODELS_PATH}${R.E2E_PATH}?${new URLSearchParams({
        tab: E2EContentOptions.CJ,
        id: biStepCode,
        type: E2ETreeItemType.BI_STEP,
    }).toString()}`;

export const formatE2EMethod = (operation: IProductE2eOperation) =>
    [operation.type, operation.name].filter(Boolean).join(' ');

export const buildE2ERows = (steps: IProductE2eStep[]): IParticipationRow<IProductE2eOperation>[] =>
    steps.map(({ e2e, operations }) => ({
        key: String(e2e.id),
        title: e2e.name || e2e.code,
        code: e2e.biStepCode ?? e2e.code,
        url: e2e.biStepCode ? getE2EStepUrl(e2e.biStepCode) : null,
        methods: operations,
    }));

export const getE2EMethodSearchValues = (operation: IProductE2eOperation) => [
    formatE2EMethod(operation),
    operation.techCapability?.name,
    operation.techCapability?.code,
];
