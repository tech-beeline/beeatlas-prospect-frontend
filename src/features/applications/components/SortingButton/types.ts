import { SortingVariant } from 'features/applications';

export interface ISortingButton {
    sortingVariant: SortingVariant;
    setSortingVariant: (setSortingVariant: SortingVariant) => void;
}
