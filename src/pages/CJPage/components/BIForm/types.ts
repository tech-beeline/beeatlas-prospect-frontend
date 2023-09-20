import { FormValues } from './form';

export interface IBIForm {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: FormValues) => void;
    defaultValues?: FormValues;
}
