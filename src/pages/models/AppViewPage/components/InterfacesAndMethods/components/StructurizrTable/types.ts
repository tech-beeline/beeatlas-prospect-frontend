import { InterfaceOptions } from '../../const';

export interface IStructurizrTable {
    interfaceOption: InterfaceOptions;
    setInterfaceOption: (interfaceOption: InterfaceOptions) => void;

    cmdb: string;
}

export enum EntityTypes {
    INTERFACE = 'INTERFACE',
    OPERATION = 'OPERATION',
}

export interface ISelectedEntity {
    id: string | number;
    value: string;
    type: EntityTypes;
    interfaceId: number | null;
    containerId: number;
}
