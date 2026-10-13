import { EntityRelationType } from 'api/staging-sequence/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallStatus } from '../CallsWorkspace/types';

export const e2eCallStatusMap: Record<EntityRelationType, ICallStatus> = {
    [EntityRelationType.OPERATION]: { iconName: Icons.Check, color: 'success' },
    [EntityRelationType.DISCOVERED_OPERATION]: { iconName: Icons.Check, color: 'success' },
};

export const UNKNOWN_OPERATION_STATUS: ICallStatus = {
    iconName: Icons.WarningCircled,
    color: 'danger',
};
