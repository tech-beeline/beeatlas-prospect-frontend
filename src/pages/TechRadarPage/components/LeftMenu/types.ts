import { ITech } from 'api/technologies/types';
import { TRing } from 'pages/TechRadarPage/types';

export interface ILeftMenu {
    data: ITech[];
    hintText: string;
    activeRing?: TRing | null;
    activeMenuItem: number;
    isZoomed: boolean;
    showInMenu: boolean;
    selectedTech: ITech | null;

    setSelectedTech: (tech: ITech | null) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
