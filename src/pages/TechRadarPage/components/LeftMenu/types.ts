import { ITech } from 'api/tech-radar/types';
import { TRing } from 'pages/TechRadarPage/types';

export interface ILeftMenu {
    data: ITech[];
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
    tooltipId: string;
    isInfo?: boolean;

    children?: React.ReactElement;
}

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
