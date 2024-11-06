import { IPersonalMapElement, IPersonalMapGroup } from '../../types';

export interface ICapabilitiesGroupEdit {
    mapData: IPersonalMapGroup[];
    setMapData: (mapData: IPersonalMapGroup[]) => void;
    selectedElementId: string | null;
    setSelectedElementId: (id: string | null) => void;
    draggedElement: IPersonalMapElement | null;
}
