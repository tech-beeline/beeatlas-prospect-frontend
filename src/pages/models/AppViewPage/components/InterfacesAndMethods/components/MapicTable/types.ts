import { IMapicInterfaceData, IStructurizrInterfaceData } from 'api/product/types';

import { InterfaceOptions } from '../../const';

export interface IMapicTable {
    interfaceOption: InterfaceOptions;
    setInterfaceOption: (interfaceOption: InterfaceOptions) => void;

    hideEmptyInterfaces: boolean;
    setHideEmptyInterfaces: (hideEmptyInterfaces: boolean) => void;

    switchDisabled: boolean;

    mapicData: IMapicInterfaceData[];
    structurizrData: IStructurizrInterfaceData[];

    isLoadingMapicData: boolean;
    isLoadingStructurizrData: boolean;

    lastMapicUpdateDate: string | null | undefined;
}

export interface ISelectedMapicOperation {
    id: number | string;
    value: string;
    interfaceId: number;
}
