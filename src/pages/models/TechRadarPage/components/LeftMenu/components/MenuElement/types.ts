import { ITech } from 'api/technologies/types';

export interface IMenuElement {
    title: string;
    analyticsName: string;
    isOpen: boolean;
    data: ITech[];
    activeRing?: string | null;

    hidden: boolean;
    selectedTech: ITech | null;
    hoveredTechId: number | null;

    setHoveredTechId: (id: number | null) => void;

    setOpen: (bool: boolean) => void;
}
