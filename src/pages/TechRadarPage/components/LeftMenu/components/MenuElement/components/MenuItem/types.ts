import { ITech } from 'api/technologies/types';

export interface IMenuItem {
    item: ITech;
    hintText: string;
    onMouseLeave: () => void;
    onMouseEnter: (label: string) => void;
}
