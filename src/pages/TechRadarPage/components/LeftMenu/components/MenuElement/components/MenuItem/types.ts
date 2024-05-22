import { ITech } from 'api/tech-radar/types';

export interface IMenuItem {
    item: ITech;
    hintText: string;
    onMouseLeave: () => void;
    onMouseEnter: (label: string) => void;
}
