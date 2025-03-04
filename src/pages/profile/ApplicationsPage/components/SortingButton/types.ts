import { SortingVariant } from '../../const';

export interface ISortingButton {
    sortingVariant: SortingVariant;
    setSortingVariant: (setSortingVariant: SortingVariant) => void;
}
