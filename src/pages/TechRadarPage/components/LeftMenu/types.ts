import { ITech } from 'api/tech-radar/types';
import { TRing } from 'pages/TechRadarPage/types';

export interface ILeftMenu {
    data: ITech[];
    hintText: string;
    activeRing?: TRing | null;
    activeMenuItem: number;
    isZoomed: boolean;
    showInMenu: boolean;

    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
