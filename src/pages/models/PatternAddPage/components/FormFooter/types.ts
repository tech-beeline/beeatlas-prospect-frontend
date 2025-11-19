export interface IFormFooter {
    submitButtonText: string;
    submitButtonDisabled?: boolean;
    cancelButtonDisabled?: boolean;

    onCancelButtonClick?: () => void;
}
