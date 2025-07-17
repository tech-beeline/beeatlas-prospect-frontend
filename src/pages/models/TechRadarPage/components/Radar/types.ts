import { ITech } from 'api/technologies/types';

export interface IRadar {
    data: ITech[];
    viewBox: TViewBox;
    isZoomed: boolean;
    topTitlesPosition: TTopTitlesPosition;
    leftTitlesPosition: number;

    isActive: boolean;
    search: string;
    filterValue: string | null;
    criticalValue: boolean;

    hoveredTechId: number | null;
    setHoveredTechId: (id: number | null) => void;
    handleRing: (ring: 'hold' | 'assess' | 'trial' | 'adopt') => void;
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
