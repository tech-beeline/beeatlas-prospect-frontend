import { FormValues } from './form';

export interface IBIForm {
    onClose: () => void;
    onSave: (values: FormValues) => void;
    defaultValues?: FormValues;
    showButtons?: boolean;
    fullscreen?: boolean;
}

export interface BIFormRef {
    onSubmit: () => void;
}
