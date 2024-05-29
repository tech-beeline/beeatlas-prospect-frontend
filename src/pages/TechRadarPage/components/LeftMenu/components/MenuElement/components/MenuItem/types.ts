import { ITech } from 'api/technologies/types';

export interface IMenuItem {
    item: ITech;
    hintText: string;
    selectedTech: ITech | null;
    onClick: () => void;
    onMouseLeave: () => void;
    onMouseEnter: (label: string) => void;
}
