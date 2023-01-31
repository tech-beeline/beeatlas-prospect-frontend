import { IData, TRing } from 'pages/TechRadarPage/types';

export interface IHold {
    data: IData[];

    handleRing: (ring: TRing) => void;
}
