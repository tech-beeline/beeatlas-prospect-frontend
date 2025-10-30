import { InterfaceOptions } from '../../const';

export interface IMapicTable {
    interfaceOption: InterfaceOptions;

    cmdb: string;
}

export interface ISelectedMapicOperation {
    id: number | string;
    value: string;
    interfaceId: number;
}
