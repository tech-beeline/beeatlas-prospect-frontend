export interface ISideBlock {
    isOpen: boolean;
    onClose: () => void;

    children?: React.ReactNode;
    toggleId?: string;
    hasBackdrop?: boolean;
    closeOnOutsideClick?: boolean;
}
