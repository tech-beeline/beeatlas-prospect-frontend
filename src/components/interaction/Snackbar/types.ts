import { Dispatch, SetStateAction } from 'react';

export interface ISnackbar {
    isOpen: boolean;
    message: string;
    messageButton?: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onClick?: () => void;
}
