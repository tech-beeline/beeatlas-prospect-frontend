import { IMapicInterfaceData, IStructurizrInterfaceData } from 'api/product/types';

export interface IMapicTableRow {
    mapicInterface: IMapicInterfaceData;
    originalMapicInterface: IMapicInterfaceData | undefined;
    sctructurizrInterfaces: IStructurizrInterfaceData[];
}
