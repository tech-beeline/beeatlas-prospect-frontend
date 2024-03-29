import { ITech } from 'api/tech-radar/types';
import { TRing } from 'pages/TechRadarPage/types';

export interface IAssess {
    data: ITech[];
    hintText: string;
    isActive: boolean;
    isElementSelected: boolean;
    search: string;
    filterValue: string | null;

    handleRing: (ring: TRing) => void;
    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}
