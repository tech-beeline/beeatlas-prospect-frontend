export interface IStepFields {
    index: number;
    isLast: boolean;
    handleAddClick: () => void;
    handleRemoveClick: (index: number) => void;
}
