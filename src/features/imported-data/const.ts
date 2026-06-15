import type { AllStatuses } from 'components/ui';

import { PackageOperation, PackageStatus } from 'api/imported-packages/types';

export const packageOperationToOperationNameMap: Record<PackageOperation, string> = {
    [PackageOperation.UPDATE_BUSINESS_CAPABILITIES]: 'Обновление бизнес-возможностей',
    [PackageOperation.UPDATE_TECH_CAPABILITIES]: 'Обновление технических возможностей',
    [PackageOperation.UPDATE_PRODUCT]: 'Обновление приложений',
};

export const packageStatusToStatusNameMap: Record<PackageStatus, string> = {
    [PackageStatus.SUCCESS]: 'Успешно',
    [PackageStatus.PROCESS]: 'В обработке',
    [PackageStatus.ERROR]: 'С ошибкой',
    [PackageStatus.WARNING]: 'Проблемный',
};

export const packageStatusToLabelTypeMap: Record<PackageStatus, AllStatuses> = {
    [PackageStatus.SUCCESS]: 'success',
    [PackageStatus.PROCESS]: 'default',
    [PackageStatus.ERROR]: 'error',
    [PackageStatus.WARNING]: 'warning',
};
