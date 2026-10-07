import { Icons } from 'styles/design-tokens/js/iconfont';

import { StepType } from './types';

export const stepTypeAvatarMap = {
    UserTask: { iconName: Icons.User, color: 'orange' },
    ServiceTask: { iconName: Icons.Settings, color: 'blue' },
} as const;

export const USER_TASK_STEP_TYPE: StepType = 'UserTask';
