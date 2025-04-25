import { ITech } from 'api/technologies/types';
import { TRing } from 'pages/models/TechRadarPage/types';

export interface ILeftMenu {
    data: ITech[];
    activeRing?: TRing | null;
    activeMenuItem: number;
    isZoomed: boolean;
    selectedTech: ITech | null;
    hoveredTechId: number | null;

    setHoveredTechId: (id: number | null) => void;
}
