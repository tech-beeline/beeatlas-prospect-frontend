import { AllStatuses } from '@beeline/design-system-react/types/types/status';

import { FileStatus } from 'api/file-import/types';

export const fileStatusToLabelTypeMap: Record<FileStatus, AllStatuses> = {
    [FileStatus.IN_QUEUE]: 'warning',
    [FileStatus.PACKAGE_PARSING]: 'warning',
    [FileStatus.PACKAGE_PARTS_PROCESSING]: 'warning',
    [FileStatus.DONE]: 'success',
    [FileStatus.VALIDATE_ERROR]: 'error',
    [FileStatus.ERROR]: 'error',
};

export const fileStatusToLabelTitleMap: Record<FileStatus, string> = {
    [FileStatus.IN_QUEUE]: 'Загрузка',
    [FileStatus.PACKAGE_PARSING]: 'Загрузка',
    [FileStatus.PACKAGE_PARTS_PROCESSING]: 'Загрузка',
    [FileStatus.DONE]: 'Успешно',
    [FileStatus.VALIDATE_ERROR]: 'Ошибка',
    [FileStatus.ERROR]: 'Ошибка',
};
