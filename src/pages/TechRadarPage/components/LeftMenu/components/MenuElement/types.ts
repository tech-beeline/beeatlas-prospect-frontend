import { ITech } from 'api/tech-radar/types';

export interface IMenuElement {
    title: string;
    analyticsName: string;
    isOpen: boolean;
    data: ITech[];
    activeRing?: string | null;
    hintText: string;
    hidden: boolean;

    setOpen: (bool: boolean) => void;
    setHintText: (value: string) => void;
    setHoverInMenu: (bool: boolean) => void;
}
