import { IStepsScenarion } from 'api/bi/types';

export interface IBIScenario {
    biSteps: IStepsScenarion;
    last: boolean;
}

export type StepType = 'UserTask' | 'ServiceTask';
