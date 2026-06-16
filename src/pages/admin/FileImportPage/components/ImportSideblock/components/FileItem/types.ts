import { FileTypes } from '../../const';

export interface IFileItem {
    file: File;
    fileType: FileTypes;
    index: number;
    onRemove: (i: number) => void;
}
