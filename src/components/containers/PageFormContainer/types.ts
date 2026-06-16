export interface IPageFormContainer {
    title?: string;
    children: React.ReactNode;
    footer?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonClick?: () => void;
    cancelButtonClick?: () => void;
    disableConfirmButton?: boolean;
}
