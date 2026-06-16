import { MapFormValues } from './form';

export interface ICreateMapSideblock {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: MapFormValues) => void;
    values?: MapFormValues;
    typeDisabled?: boolean;
}
