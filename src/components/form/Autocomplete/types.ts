import { ReactNode } from 'react';

interface Option {
    id: number | string;
    value: string;
}

export interface IAutocomplete {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    fullWidth?: boolean;
    defaultValue?: number;
    loading?: boolean;
    loadingText?: string | ReactNode;
    noOptionsText?: string;
    onInputChange: (v: string) => void;
    helperText?: string;
}
