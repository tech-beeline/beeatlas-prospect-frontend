import { Dispatch, SetStateAction } from 'react';

export interface ISideBlock {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

    children?: React.ReactNode;
    toggleId?: string;
}
