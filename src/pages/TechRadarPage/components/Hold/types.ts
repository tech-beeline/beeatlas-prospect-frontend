import { IData, TRing } from 'pages/TechRadarPage/types';

export interface IHold {
    data: IData[];
    hintText: string;
    isActive: boolean;
    isElementSelected: boolean;
    search: string;
    filterValue: string | null;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
