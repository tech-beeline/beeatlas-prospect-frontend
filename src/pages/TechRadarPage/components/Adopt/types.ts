import { IData, TRing } from 'pages/TechRadarPage/types';

export interface IAdopt {
    data: IData[];
    hintText: string;
    isActive: boolean;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
