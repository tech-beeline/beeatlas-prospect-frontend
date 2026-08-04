import { IStructurizrContainerData } from 'api/product/types';

import { ISelectedEntity } from '../../types';

export interface IStructurizrTableRow {
    container: IStructurizrContainerData;
    selectedEntity: ISelectedEntity | null;
}
