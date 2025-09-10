interface Option {
    id: number | null;
    value: string;
}

export interface ISelect {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
    fullWidth?: boolean;
    defaultValue?: number;
}
