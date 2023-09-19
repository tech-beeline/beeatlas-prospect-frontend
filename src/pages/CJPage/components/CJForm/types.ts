import { FormValues } from './form';

export interface IStepForm {
    isOpen: boolean;
    values: FormValues;
    onClose: () => void;
    updateCJ: (values: FormValues) => void;
}
