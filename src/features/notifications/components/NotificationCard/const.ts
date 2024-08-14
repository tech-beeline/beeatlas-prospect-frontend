import { ColorTypes } from '@beeline/design-system-react/types/types/status';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { NotificationChangeType, NotificationEntityType } from 'api/notifications/types';

export const notificationEntityTypeToIconMap: Record<NotificationEntityType, Icons> = {
    [NotificationEntityType.TECH_CAPABILITY]: Icons.Capability,
    [NotificationEntityType.BUSINESS_CAPABILITY]: Icons.Capability,
    [NotificationEntityType.TECHNOLOGY]: Icons.Radar,
};

export const notificationEntityTypeToColorMap: Record<NotificationEntityType, ColorTypes> = {
    [NotificationEntityType.TECH_CAPABILITY]: 'blue',
    [NotificationEntityType.BUSINESS_CAPABILITY]: 'orange',
    [NotificationEntityType.TECHNOLOGY]: 'teal',
};

export const notificationEntityTypeToTitleMap: Record<NotificationEntityType, string> = {
    [NotificationEntityType.TECH_CAPABILITY]: 'ФДМ',
    [NotificationEntityType.BUSINESS_CAPABILITY]: 'ФДМ',
    [NotificationEntityType.TECHNOLOGY]: 'Технорадар',
};

export const notificationEntityTypeToNameMap: Record<NotificationEntityType, string> = {
    [NotificationEntityType.TECH_CAPABILITY]: 'Техническая возможность',
    [NotificationEntityType.BUSINESS_CAPABILITY]: 'Бизнес-возможность',
    [NotificationEntityType.TECHNOLOGY]: 'Технология',
};

export const notificationChangeTypeToNameMap: Record<NotificationChangeType, string> = {
    [NotificationChangeType.CREATE]: 'создана',
    [NotificationChangeType.UPDATE]: 'обновлена',
};
