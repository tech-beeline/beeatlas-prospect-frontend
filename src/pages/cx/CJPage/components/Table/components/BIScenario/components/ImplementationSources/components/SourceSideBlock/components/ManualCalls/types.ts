import { IRelations } from 'api/bi/types';

export interface IManualCalls {
    relations: IRelations[];
    biStepId: number;
    onEdit: (relationId: number) => void;
    onOpenDiagram: (relation: IRelations) => void;
}
