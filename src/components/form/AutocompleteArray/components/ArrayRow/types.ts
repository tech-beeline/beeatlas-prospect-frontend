import { ISelectOption } from '../../types';

export interface IArrayRow {
    index: number;
    onAddClick?: () => void;
    onDeleteClick: (index: number) => void;
    name: string;
    options: ISelectOption[];
    isLoading: boolean;
    label: string;
    disabled: boolean;
    makeOption?: (option: ISelectOption, inputValue: string) => JSX.Element | null;
    selectedValueIds: (string | number)[];
    showAddButton?: boolean;
    canDelete?: boolean;
    customActions?: boolean;
}
