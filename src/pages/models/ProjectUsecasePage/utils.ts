import { BI_STEP_TAB_ID_PARAM, BI_STEP_TAB_PARAM, BiStepTab } from 'features/e2e';

import {
    IProjectUsecaseOperationApplication,
    IProjectUsecaseOperationTableItem,
    ProjectUsecaseOperationStatus,
} from 'api/usecase/types';
import { E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

export const getE2EStepUrl = (biStepCode: string, usecaseId: string | null) =>
    `${R.MODELS_PATH}${R.E2E_PATH}?${new URLSearchParams({
        id: biStepCode,
        type: E2ETreeItemType.BI_STEP,
        [BI_STEP_TAB_PARAM]: BiStepTab.USE_CASE,
        ...(usecaseId ? { [BI_STEP_TAB_ID_PARAM]: usecaseId } : {}),
    }).toString()}`;

export const filterOperations = (
    operations: IProjectUsecaseOperationTableItem[],
    statuses: ProjectUsecaseOperationStatus[],
    search: string,
) => {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru');

    return operations.filter(
        ({ status, call }) =>
            (statuses.length === 0 || statuses.includes(status)) &&
            (!normalizedSearch || (call ?? '').toLocaleLowerCase('ru').includes(normalizedSearch)),
    );
};

export const renderApplication = (application: IProjectUsecaseOperationApplication | null) => {
    if (!application) return formatNullableString(null);

    const mnemonic = formatNullableString(application.mnemonic);

    return application.isPlanned ? `${mnemonic} (Планируется)` : mnemonic;
};
