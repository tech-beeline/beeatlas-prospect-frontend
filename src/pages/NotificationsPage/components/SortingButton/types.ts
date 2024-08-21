import { SortingVariants } from 'pages/NotificationsPage/const';

export interface ISortingButton {
    sortingVariant: SortingVariants;
    setSortingVariant: (variant: SortingVariants) => void;
}
