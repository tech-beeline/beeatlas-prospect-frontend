import { IStepsScenarion } from 'api/bi/types';

export interface IBIScenario {
    biSteps: IStepsScenarion;
    bpmn?: boolean;
}

export type StepType = 'UserTask' | 'ServiceTask';
