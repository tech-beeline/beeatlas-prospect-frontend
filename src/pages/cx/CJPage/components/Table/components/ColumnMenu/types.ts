export interface IColumnMenu {
    cjId: number;
    stepId: number;
    stepName: string;
    stepDescription: string;
    tableDataLength: number;
    stepIndex: number;
    collapsedStepIds: number[];
    setCollapsedStepIds: (ids: number[]) => void;
    setRenameIndex: (index: number) => void;
    setOpenSideBlockName: (flag: boolean) => void;
}
