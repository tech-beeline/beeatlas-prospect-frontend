import { IStructurizrContainerData } from 'api/product/types';

import { InterfaceOptions } from '../../const';

export interface IStructurizrTable {
    interfaceOption: InterfaceOptions;
    setInterfaceOption: (interfaceOption: InterfaceOptions) => void;

    hideEmptyInterfaces: boolean;
    setHideEmptyInterfaces: (hideEmptyInterfaces: boolean) => void;

    switchDisabled: boolean;

    containerData: IStructurizrContainerData[];
    isLoadingContainerData: boolean;
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
