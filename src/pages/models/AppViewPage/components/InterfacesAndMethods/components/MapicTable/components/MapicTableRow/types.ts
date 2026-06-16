import { IMapicInterfaceData, IStructurizrInterfaceData } from 'api/product/types';

import { ISelectedMapicOperation } from '../../types';

export interface IMapicTableRow {
    mapicInterface: IMapicInterfaceData;
    sctructurizrInterfaces: IStructurizrInterfaceData[];
    selectedMapicOperation: ISelectedMapicOperation | null;
}
