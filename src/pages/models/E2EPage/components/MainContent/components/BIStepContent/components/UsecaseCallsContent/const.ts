import { ProjectUsecaseOperationStatus } from 'api/usecase/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallStatus } from '../CallsWorkspace/types';

export const usecaseCallStatusMap: Record<ProjectUsecaseOperationStatus, ICallStatus> = {
    [ProjectUsecaseOperationStatus.CONFIRMED]: { iconName: Icons.Check, color: 'green' },
    [ProjectUsecaseOperationStatus.REVIEW]: { iconName: Icons.Check, color: 'orange' },
    [ProjectUsecaseOperationStatus.PLANNED]: { iconName: Icons.Clock, color: 'grey' },
    [ProjectUsecaseOperationStatus.NOT_MAPPED]: { iconName: Icons.WarningCircled, color: 'red' },
};
