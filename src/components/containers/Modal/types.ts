export interface IModalProps extends IModalOverlayProps {
    children?: any;
    isHTML?: boolean;
    setVisible: (bool: boolean) => void;
}

export interface IModalOverlayProps {
    isVisible?: boolean;
}
