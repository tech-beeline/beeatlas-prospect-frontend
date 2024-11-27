import { IPersonalMapElement, IPersonalMapGroup } from 'pages/models/MapAddPage/types';

export interface IGroupCard {
    group: IPersonalMapGroup;
    mapData: IPersonalMapGroup[];
    setMapData: (mapData: IPersonalMapGroup[]) => void;
    selectedElementId: string | null;
    setSelectedElementId: (id: string | null) => void;
    draggedElement: IPersonalMapElement | null;
}

export interface IGroupCardOverlay {
    element: IPersonalMapGroup;
}
