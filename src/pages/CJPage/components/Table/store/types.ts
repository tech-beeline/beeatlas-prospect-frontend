export interface IHiddenRowsStore {
    hiddenRows: string[];
    showHiddenRows: boolean;

    setHiddenRows: (rowIds: string[]) => void;
    setShowHiddenRows: (flag: boolean) => void;
}
