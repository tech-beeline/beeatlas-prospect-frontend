import type { ReactNode } from 'react';

export interface DialogProps {
    open?: boolean;
    children?: ReactNode;
    onClose?: (event?: Event | React.MouseEvent | React.KeyboardEvent) => void;
    className?: string;
    applicationRootElement?: string;
}

export interface ModalProps {
    open?: boolean;
    className?: string;
    applicationRootElement?: string;
    children?: ReactNode;
}
