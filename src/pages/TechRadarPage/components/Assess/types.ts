import { IData, TRing } from 'pages/TechRadarPage/types';

export interface IAssess {
    data: IData[];
    hintText: string;

    setHintText: (value: string) => void;
    handleRing: (ring: TRing) => void;
    setShowInMenu: (bool: boolean) => void;
}
