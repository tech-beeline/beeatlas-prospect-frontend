export interface ISideBlock {
    isOpen: boolean;
    onClose: () => void;

    children?: React.ReactNode;
    toggleId?: string;
    hasBackdrop?: boolean;
    closeOnOutsideClick?: boolean;
    outsideClickExceptionIds?: string[];
    aboveContent?: boolean;
    large?: boolean;
}
