import { FileUploadPath } from 'api/file-import/types';

import { FileTypes } from '../../const';

export const fileTypeToPathMap: Record<FileTypes, FileUploadPath> = {
    [FileTypes.BC]: FileUploadPath.BC,
    [FileTypes.TC]: FileUploadPath.TC,
};
