export interface IPageFormContainer {
    title?: string;
    children: React.ReactNode;
    footer?: boolean;
    confirmButtonText?: string;
    canselButtonText?: string;
    confirmButtonClick?: () => void;
    canselButtonClick?: () => void;
    disableConfirmButton?: boolean;
}
