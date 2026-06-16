export interface IFileItem {
    file: File;
    index: number;
    onRemove: (i: number) => void;
}
