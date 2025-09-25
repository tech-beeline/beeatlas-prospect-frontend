import { IStructurizrContainerInterfaceData } from 'api/product/types';

export interface IServiceTableRow {
    structurizrInterface: IStructurizrContainerInterfaceData;
    originalStructurizrInterface: IStructurizrContainerInterfaceData | undefined;
}
