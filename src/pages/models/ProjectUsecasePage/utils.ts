import { E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';

export const getE2EStepUrl = (biStepCode: string) =>
    `${R.MODELS_PATH}${R.E2E_PATH}?${new URLSearchParams({
        id: biStepCode,
        type: E2ETreeItemType.BI_STEP,
    }).toString()}`;
