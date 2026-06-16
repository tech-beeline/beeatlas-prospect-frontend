import { ReactNode } from 'react';

export interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}
