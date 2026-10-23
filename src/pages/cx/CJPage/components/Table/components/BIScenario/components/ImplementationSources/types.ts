import { IRelations, IStepE2E, IStepsScenarion, IStepUseCase } from 'api/bi/types';
import { ManualCallEditor } from 'pages/cx/CJPage/components/BIEditScenario/types';

export enum ImplementationSourceType {
    MANUAL = 'MANUAL',
    USE_CASE = 'USE_CASE',
    E2E = 'E2E',
}

interface IManualSource {
    type: ImplementationSourceType.MANUAL;
    key: string;
    name: string;
    relations: IRelations[];
}

interface IUseCaseSource {
    type: ImplementationSourceType.USE_CASE;
    key: string;
    name: string;
    useCase: IStepUseCase;
}

interface IE2ESource {
    type: ImplementationSourceType.E2E;
    key: string;
    name: string;
    e2e: IStepE2E;
}

export type ImplementationSource = IManualSource | IUseCaseSource | IE2ESource;

export interface IImplementationSources {
    biStep: IStepsScenarion;
    onOpenDiagram: (relation: IRelations) => void;
    onEditManual: (editor: ManualCallEditor) => void;
}
