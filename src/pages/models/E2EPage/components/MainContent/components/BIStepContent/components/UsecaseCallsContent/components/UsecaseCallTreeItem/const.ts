import { ColorTypes } from 'components/ui/types';

import { ProjectUsecaseOperationStatus } from 'api/usecase/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

export const callStatusIconMap: Record<
    ProjectUsecaseOperationStatus,
    { iconName: Icons; color: ColorTypes }
> = {
    [ProjectUsecaseOperationStatus.CONFIRMED]: { iconName: Icons.Check, color: 'green' },
    [ProjectUsecaseOperationStatus.REVIEW]: { iconName: Icons.Check, color: 'orange' },
    [ProjectUsecaseOperationStatus.PLANNED]: { iconName: Icons.Clock, color: 'grey' },
    [ProjectUsecaseOperationStatus.NOT_MAPPED]: { iconName: Icons.WarningCircled, color: 'red' },
};
