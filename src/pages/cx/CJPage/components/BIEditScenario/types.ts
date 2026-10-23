import { IRelations } from 'api/bi/types';

export interface ManualCallEditor {
    mode: 'initial' | 'add' | 'edit';
    relationId?: number;
}

export interface IBIEditScenario extends ManualCallEditor {
    isOpen: boolean;
    onClose: () => void;
    stepId: number;
    relationsData: IRelations[];
}
