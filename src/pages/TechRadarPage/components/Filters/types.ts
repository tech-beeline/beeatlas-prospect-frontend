import { IData } from 'pages/TechRadarPage/types';

export interface IFilters {
    search: string;
    filterValue: string | null;
    activeMenuItem: number;
    filteredItems: IData[];
    setSearch: (search: string) => void;
    setFilterValue: (value: string | null) => void;
    setHintText: (search: string) => void;
    setActiveMenuItem: (item: number) => void;
    setShowInMenu: (flag: boolean) => void;
    setActiveRing: (ring: null) => void;
}
