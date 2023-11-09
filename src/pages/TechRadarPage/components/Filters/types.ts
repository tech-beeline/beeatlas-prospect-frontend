import { IData } from 'pages/TechRadarPage/types';

export interface IFilters {
    search: string;
    activeMenuItem: number;
    filteredItems: IData[];
    setSearch: (search: string) => void;
    setHintText: (search: string) => void;
    setActiveMenuItem: (item: number) => void;
    setShowInMenu: (flag: boolean) => void;
    setActiveRing: (ring: null) => void;
}
