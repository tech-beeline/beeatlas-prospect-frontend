import { IRelations } from 'api/bi/types';

export interface IManualCalls {
    relations: IRelations[];
    onOpenDiagram: (relation: IRelations) => void;
}
