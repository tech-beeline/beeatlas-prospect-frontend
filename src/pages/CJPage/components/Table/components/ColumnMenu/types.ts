export interface IColumnMenu {
    tableDataLength: number;
    rowIndex: number;
    addNewColumn: (index: number) => void;
    removeColumn: (index: number) => void;
    changePositionOfColumn: (index: number, isRight?: boolean) => void;
    setRenameIndex: (index: number) => void;
    setOpenSideBlockName: (flag: boolean) => void;
    openBiForm: () => void;
}
