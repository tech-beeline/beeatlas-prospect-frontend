import { IStepsScenarion } from 'api/bi/types';

export interface IBIScenario {
    biSteps: IStepsScenarion;
    last: boolean;
    bpmn?: boolean;
}

export type StepType = 'UserTask' | 'ServiceTask';
