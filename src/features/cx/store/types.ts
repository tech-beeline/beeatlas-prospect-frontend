import { SideSheetVariants } from 'pages/cx/CJPage/const';

export interface ISideSheetState {
    openSideSheet: SideSheetVariants | null;
    payload: number | null;

    toggleSideSheet: (variant: SideSheetVariants, payload?: number | null) => void;
    closeSideSheet: () => void;
}
