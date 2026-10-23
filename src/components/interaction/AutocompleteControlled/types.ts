import { ReactNode } from 'react';

export interface IAutocompleteControlled<T> {
    searchText: string;
    setSearchText: (s: string) => void;
    onClear: () => void;
    placeholder: string;

    emptyText?: string;
    renderOption?: (option: T) => ReactNode;
    options: T[];
    onChange: (option: T) => void;
}
