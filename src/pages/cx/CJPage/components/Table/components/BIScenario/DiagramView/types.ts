import { IRelations } from 'api/bi/types';

export interface IDiagramView {
    relation: IRelations;
    onClose?: () => void;
}
