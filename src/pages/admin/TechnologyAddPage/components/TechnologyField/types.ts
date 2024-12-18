import { ICategory } from 'api/technologies/types';

import { TechnologyValues } from '../../form';

export interface ITechnologyField {
    index: number;
    fieldsCount: number;
    isLoading: boolean;
    categoriesData: ICategory[];
    showAddButton: boolean;

    remove: (index: number) => void;
    append: (tech: TechnologyValues) => void;
}
