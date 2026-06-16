import { IStructurizrContainerInterfaceData } from 'api/product/types';

import { ISelectedEntity } from '../../../../types';

export interface IServiceTableRow {
    structurizrInterface: IStructurizrContainerInterfaceData;
    selectedEntity: ISelectedEntity | null;
}
