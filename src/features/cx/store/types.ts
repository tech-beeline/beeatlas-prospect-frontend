import { SideSheetVariants } from 'pages/cx/CJPage/const';

export interface ISideSheetState {
    openSideSheet: SideSheetVariants | null;
    toggleSideSheet: (variant: SideSheetVariants) => void;
    closeSideSheet: () => void;
}
