import { ITech } from 'api/technologies/types';
import { TRing } from 'pages/models/TechRadarPage/types';

export interface IRingRadar {
    data: ITech[];
    hintText: string;
    isActive: boolean;
    isElementSelected: boolean;
    search: string;
    filterValue: string | null;
    color: string;
    ring: TRing;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
