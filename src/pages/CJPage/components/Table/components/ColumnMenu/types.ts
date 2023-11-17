export interface IColumnMenu {
    cjId: number;
    stepId: number;
    stepName: string;
    tableDataLength: number;
    stepIndex: number;
    // addStep: (index: number) => void;
    // deleteStep: (index: number) => void;
    // changePositionOfStep: (index: number, isRight?: boolean) => void;
    setRenameIndex: (index: number) => void;
    setOpenSideBlockName: (flag: boolean) => void;
}
