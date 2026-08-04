import type { AllStatuses } from 'components/ui';

import { FileStatus } from 'api/file-import/types';

export const fileStatusToLabelTypeMap: Record<FileStatus, AllStatuses> = {
    [FileStatus.PROCESS]: 'warning',
    [FileStatus.SUCCESS]: 'success',
    [FileStatus.ERROR]: 'error',
    [FileStatus.WARNING]: 'warning',
    [FileStatus.VALIDATE_ERROR]: 'error',
};

export const fileStatusToLabelTitleMap: Record<FileStatus, string> = {
    [FileStatus.PROCESS]: 'Загрузка',
    [FileStatus.SUCCESS]: 'Успешно',
    [FileStatus.ERROR]: 'Ошибка',
    [FileStatus.WARNING]: 'Проблемный',
    [FileStatus.VALIDATE_ERROR]: 'Ошибка валидации',
};
