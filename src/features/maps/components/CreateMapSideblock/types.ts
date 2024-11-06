import { FormValues } from './form';

export interface ICreateMapSideblock {
    isOpen: boolean;
    onClose: () => void;
    values?: FormValues;
    typeDisabled?: boolean;
}
