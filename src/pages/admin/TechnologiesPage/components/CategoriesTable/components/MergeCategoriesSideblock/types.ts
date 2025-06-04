import { ICategory } from 'api/technologies/types';

export interface IMergeCategoriesSideblock {
    isOpen: boolean;
    onClose: () => void;
    selectedCategories: ICategory[];
    setSelectedCategories: (categories: ICategory[]) => void;
}
