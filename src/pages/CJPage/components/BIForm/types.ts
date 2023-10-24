import { FormValues } from './form';

export interface IBIForm {
    onClose: () => void;
    onSave: (values: FormValues) => void;
    defaultValues?: FormValues;
    showButtons?: boolean;
}
