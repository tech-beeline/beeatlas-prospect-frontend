import { ColorTypes } from '@beeline/design-system-react/types/types/status';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { NotificationType } from 'api/notifications/types';

export const notificationTypeToIconMap: Record<NotificationType, Icons> = {
    [NotificationType.CAPABILITY]: Icons.Capability,
    [NotificationType.TECHNOLOGY]: Icons.Radar,
};

export const notificationTypeToColorMap: Record<NotificationType, ColorTypes> = {
    [NotificationType.CAPABILITY]: 'orange',
    [NotificationType.TECHNOLOGY]: 'blue',
};

export const notificationTypeToNameMap: Record<NotificationType, string> = {
    [NotificationType.CAPABILITY]: 'ФДМ',
    [NotificationType.TECHNOLOGY]: 'Технорадар',
};
