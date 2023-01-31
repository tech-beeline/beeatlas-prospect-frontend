import { IData, TRing } from 'pages/TechRadarPage/types';

export interface ITrial {
    data: IData[];
    hintText: string;

    setHintText: (value: string) => void;
    handleRing: (ring: TRing) => void;
}
