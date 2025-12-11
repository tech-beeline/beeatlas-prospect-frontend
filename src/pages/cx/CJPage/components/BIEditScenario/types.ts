import { IRelations } from 'api/bi/types';

export interface IBIEditScenario {
    isOpen: boolean;
    onClose: () => void;
    stepId: number;
    relationsData: IRelations[];
}
