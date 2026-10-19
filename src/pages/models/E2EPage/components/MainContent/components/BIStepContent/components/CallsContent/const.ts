import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallStatus } from '../CallsWorkspace/types';

export const UNKNOWN_OPERATION_STATUS: ICallStatus = {
    iconName: Icons.WarningCircled,
    color: 'danger',
};

export const SUCCESS_OPERATION_STATUS: ICallStatus = { iconName: Icons.Check, color: 'success' };
