import { BI_STEP_TAB_ID_PARAM, BI_STEP_TAB_PARAM, BiStepTab } from 'features/e2e';

import { E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';

export const getE2EPageUrl = (biStepCode: string, e2eCode: string): string =>
    `${R.MODELS_PATH}${R.E2E_PATH}?${new URLSearchParams({
        id: biStepCode,
        type: E2ETreeItemType.BI_STEP,
        [BI_STEP_TAB_PARAM]: BiStepTab.E2E,
        [BI_STEP_TAB_ID_PARAM]: e2eCode,
    }).toString()}`;
