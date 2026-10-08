import { USER_TASK_STEP_TYPE } from './const';

export const isUserTaskStep = (type: string | null | undefined): boolean =>
    type?.toLowerCase() === USER_TASK_STEP_TYPE.toLowerCase();
