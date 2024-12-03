import { ITech } from 'api/technologies/types';

export interface IMenuElement {
    title: string;
    analyticsName: string;
    isOpen: boolean;
    data: ITech[];
    activeRing?: string | null;
    hintText: string;
    hidden: boolean;
    selectedTech: ITech | null;

    setOpen: (bool: boolean) => void;
    setHintText: (value: string) => void;
    setHoverInMenu: (bool: boolean) => void;
}
