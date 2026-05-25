interface Option {
    id: number | string;
    value: string;
    description?: string;
    ringId?: number;
}

export interface IMultiSelect {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    fullWidth?: boolean;
    defaultValue?: number[];
    filter?: boolean;
    makeOption?: (option: Option, selected?: boolean) => JSX.Element;
    autoFocus?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
