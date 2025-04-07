import { ICategory } from 'api/technologies/types';

export interface ICategoryRow {
    category: ICategory;
    selectedCategories: ICategory[];
    setSelectedCategories: (categories: ICategory[]) => void;
    onCheckboxClick: (category: ICategory) => void;
}
