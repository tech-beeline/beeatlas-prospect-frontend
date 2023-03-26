import { IData } from 'pages/TechRadarPage/types';

export interface IRadar {
    data: IData[];
    viewBox: TViewBox;
    isZoomed: boolean;
    topTitlesPosition: TTopTitlesPosition;
    leftTitlesPosition: number;
    hintText: string;
    isActive: boolean;

    setHintText: (value: string) => void;
    handleRing: (ring: 'hold' | 'assess' | 'trial' | 'adopt') => void;
    setShowInMenu: (bool: boolean) => void;
}

type TViewBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type TTopTitlesPosition = {
    hold: number;
    assess: number;
    trial: number;
    adopt: number;
};
