import { IData, TRing } from 'pages/TechRadarPage/types';

export interface ILeftMenu {
    data: IData[];
    hintText: string;
    activeRing?: TRing | null;
    activeMenuItem: number;
    isZoomed: boolean;
    showInMenu: boolean;

    setHintText: (value: string) => void;
    setShowInMenu: (bool: boolean) => void;
}

export interface IHint {
    text: string;
}

export interface IMenuElement {
    title: string;
    isOpen: boolean;
    data: IData[];
    activeRing?: string | null;
    hintText: string;

    setOpen: (bool: boolean) => void;
    setHintText: (value: string) => void;
    setHoverInMenu: (bool: boolean) => void;
}
