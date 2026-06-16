interface Option {
    id: number;
    value: string;
}

export interface ISelect {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    fullWidth?: boolean;
    defaultValue?: number | null;
    autoFocus?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    helperText?: string;
}
