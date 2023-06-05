import { Dispatch, SetStateAction } from 'react';

export interface ISnackbar {
    isOpen: boolean;
    message: string;
    messageButton?: string;
    textButton?: string;

    setOpen: Dispatch<SetStateAction<boolean>>;
    onClickButton?: () => void;
}
