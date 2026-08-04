import { ReactNode } from 'react';

export interface IDialog {
    opened: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onDecline?: () => void;
    children?: ReactNode;

    title?: string | ReactNode;
    showFooter?: boolean;
    showDeclineButton?: boolean;
    declineText?: string;
    confirmText?: string;
    isPending?: boolean;
    large?: boolean;
}
