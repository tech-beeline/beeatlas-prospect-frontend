export interface IStepFields {
    index: number;
    isLast: boolean;
    totalFields: number;
    handleAddClick: () => void;
    handleRemoveClick: (index: number) => void;
}
