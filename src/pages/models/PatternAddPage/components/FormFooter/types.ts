export interface IFormFooter {
    submitButtonText: string;
    submitButtonDisabled?: boolean;
    cancelButtonDisabled?: boolean;
    showCancelButton?: boolean;

    onCancelButtonClick?: () => void;
}
