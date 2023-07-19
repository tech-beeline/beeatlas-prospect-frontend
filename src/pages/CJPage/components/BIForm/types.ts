import { Dispatch, SetStateAction } from 'react';

export interface IBIForm {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
