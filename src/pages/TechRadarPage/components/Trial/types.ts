import { IData, TRing } from 'pages/TechRadarPage/types';

export interface ITrial {
    data: IData[];
    hintText: string;
    isActive: boolean;
    isElementSelected: boolean;
    search: string;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
