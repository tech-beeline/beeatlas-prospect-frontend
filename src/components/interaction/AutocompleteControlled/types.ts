export interface IAutocompleteControlled<T> {
    searchText: string;
    setSearchText: (s: string) => void;
    onClear: () => void;
    placeholder: string;

    options: T[];
    onChange: (option: T) => void;
}
