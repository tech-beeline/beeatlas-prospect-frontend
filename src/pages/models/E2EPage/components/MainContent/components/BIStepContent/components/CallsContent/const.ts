import { EntityRelationType } from 'api/staging-sequence/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallStatus } from '../CallsWorkspace/types';

export const e2eCallStatusMap: Record<EntityRelationType, ICallStatus> = {
    [EntityRelationType.OPERATION]: { iconName: Icons.Check, color: 'green' },
    [EntityRelationType.DISCOVERED_OPERATION]: { iconName: Icons.Check, color: 'orange' },
};

export const UNKNOWN_OPERATION_STATUS: ICallStatus = {
    iconName: Icons.WarningCircled,
    color: 'red',
};
