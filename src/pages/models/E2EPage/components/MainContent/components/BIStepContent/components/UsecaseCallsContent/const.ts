import { ProjectUsecaseOperationStatus } from 'api/usecase/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ICallStatus } from '../CallsWorkspace/types';

export const usecaseCallStatusMap: Record<ProjectUsecaseOperationStatus, ICallStatus> = {
    [ProjectUsecaseOperationStatus.CONFIRMED]: { iconName: Icons.Check, color: 'success' },
    [ProjectUsecaseOperationStatus.REVIEW]: { iconName: Icons.Check, color: 'warning' },
    [ProjectUsecaseOperationStatus.PLANNED]: { iconName: Icons.Clock, color: 'neutral' },
    [ProjectUsecaseOperationStatus.NOT_MAPPED]: { iconName: Icons.WarningCircled, color: 'danger' },
};
