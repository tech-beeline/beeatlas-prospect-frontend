import { ITech } from 'api/tech-radar/types';

export interface IRadar {
    data: ITech[];
    viewBox: TViewBox;
    isZoomed: boolean;
    topTitlesPosition: TTopTitlesPosition;
    leftTitlesPosition: number;
    hintText: string;
    isActive: boolean;
    isElementSelected: boolean;
    search: string;
    filterValue: string | null;

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
