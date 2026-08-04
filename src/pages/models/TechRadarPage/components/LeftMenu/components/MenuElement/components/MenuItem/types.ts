import { ITech } from 'api/technologies/types';

export interface IMenuItem {
    item: ITech;
    // hintText: string;
    selectedTech: ITech | null;
    hoveredTechId: number | null;
    onClick: () => void;

    setHoveredTechId: (id: number | null) => void;
    // onMouseLeave: () => void;
    // onMouseEnter: (label: string) => void;
}
