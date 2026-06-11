import type { TypographyVariant } from 'components/ui/Typography/types';

export interface ISelectOption {
    id: number | string;
    value: string;
    descr?: string;
}

export interface IAutocompleteArray {
    title?: string;
    name: string;
    label: string;
    options: ISelectOption[];
    disabled?: boolean;
    isLoading?: boolean;
    makeOption?: (option: ISelectOption, inputValue: string) => JSX.Element | null;
    useExternalAddButton?: boolean;
    smallButton?: boolean;
    titleVariant?: TypographyVariant;
}
