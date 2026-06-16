import { SortingVariants } from 'pages/profile/NotificationsPage/const';

export interface ISortingButton {
    sortingVariant: SortingVariants;
    setSortingVariant: (variant: SortingVariants) => void;
}
