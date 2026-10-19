export interface IStepFields {
    index: number;
    singleCall?: boolean;
    hideTitle?: boolean;
    isLast: boolean;
    handleAddClick: () => void;
    handleRemoveClick: (index: number) => void;
}
