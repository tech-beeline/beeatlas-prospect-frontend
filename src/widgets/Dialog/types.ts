import { ReactNode } from 'react';

export interface IDialog {
    opened: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
    onDecline?: () => void;
    children?: ReactNode;

    declineText?: string;
    confirmText?: string;
}
