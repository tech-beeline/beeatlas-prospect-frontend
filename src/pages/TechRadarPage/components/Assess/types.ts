import { IData, TRing } from 'pages/TechRadarPage/types';

export interface IAssess {
    data: IData[];
    hintText: string;
    isActive: boolean;
    isElementSelected: boolean;
    search: string;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
