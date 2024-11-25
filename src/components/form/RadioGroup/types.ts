interface IOption {
    label: string;
    id: number;
}

export interface IRadioGroup {
    name: string;
    options: IOption[];
    disabled?: boolean;
}
