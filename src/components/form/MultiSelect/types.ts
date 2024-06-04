interface Option {
    id: number;
    value: string;
}

export interface IMultiSelect {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    fullWidth?: boolean;
    defaultValue?: number[];
}
