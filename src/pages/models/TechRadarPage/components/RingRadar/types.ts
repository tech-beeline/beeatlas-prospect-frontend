import { ITech } from 'api/technologies/types';
import { TRing } from 'pages/models/TechRadarPage/types';

export interface IRingRadar {
    data: ITech[];
    isActive: boolean;
    isElementSelected: boolean;
    search: string;
    filterValue: string | null;
    color: string;
    ring: TRing;
    hoveredTechId: number | null;
    criticalValue: boolean;

    setHoveredTechId: (id: number | null) => void;
    handleRing: (ring: TRing) => void;
}
