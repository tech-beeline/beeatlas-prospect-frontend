import { ITech } from 'api/technologies/types';

export interface IFilters {
    search: string;
    filterValue: string | null;
    activeMenuItem: number;
    filteredItems: ITech[];
    setHoveredTechId: (id: number | null) => void;
    setSearch: (search: string) => void;
    setFilterValue: (value: string | null) => void;
    setActiveMenuItem: (item: number) => void;
    setActiveRing: (ring: null) => void;
}
