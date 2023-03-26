import { IData, TRing } from 'pages/TechRadarPage/types';

export interface IHold {
    data: IData[];
    hintText: string;
    isActive: boolean;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
