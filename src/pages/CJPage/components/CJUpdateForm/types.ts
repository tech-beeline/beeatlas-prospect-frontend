import { FormValues } from './form';

export interface ICJUpdateForm {
    isOpen: boolean;
    cjId: number;
    values: FormValues;
    onClose: () => void;
}
