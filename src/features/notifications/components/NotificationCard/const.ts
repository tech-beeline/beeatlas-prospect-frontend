import { ColorTypes } from '@beeline/design-system-react/types/types/status';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { NotificationChangeType, NotificationEntityType } from 'api/notifications/types';

export const notificationEntityTypeToIconMap: Record<NotificationEntityType, Icons> = {
    [NotificationEntityType.TECH_CAPABILITY]: Icons.Capability,
    [NotificationEntityType.BUSINESS_CAPABILITY]: Icons.Capability,
    [NotificationEntityType.TECH]: Icons.Radar,
    [NotificationEntityType.APPLICATION]: Icons.PagesMultiple,
    [NotificationEntityType.EXPORT]: Icons.PagesMultiple,
};

export const notificationEntityTypeToColorMap: Record<NotificationEntityType, ColorTypes> = {
    [NotificationEntityType.TECH_CAPABILITY]: 'blue',
    [NotificationEntityType.BUSINESS_CAPABILITY]: 'orange',
    [NotificationEntityType.TECH]: 'teal',
    [NotificationEntityType.APPLICATION]: 'purple',
    [NotificationEntityType.EXPORT]: 'green',
};

export const notificationEntityTypeToTitleMap: Record<NotificationEntityType, string> = {
    [NotificationEntityType.TECH_CAPABILITY]: 'ФДМ',
    [NotificationEntityType.BUSINESS_CAPABILITY]: 'ФДМ',
    [NotificationEntityType.TECH]: 'Технорадар',
    [NotificationEntityType.APPLICATION]: 'Мои заявки',
    [NotificationEntityType.EXPORT]: 'Экспорт файлов',
};

export const notificationEntityTypeToNameMap: Record<NotificationEntityType, string> = {
    [NotificationEntityType.TECH_CAPABILITY]: 'Техническая возможность',
    [NotificationEntityType.BUSINESS_CAPABILITY]: 'Бизнес-возможность',
    [NotificationEntityType.TECH]: 'Технология',
    [NotificationEntityType.APPLICATION]: 'Заявка',
    [NotificationEntityType.EXPORT]: 'Файл готов',
};

export const notificationChangeTypeToNameMap: Record<NotificationChangeType, string> = {
    [NotificationChangeType.CREATE]: 'создана',
    [NotificationChangeType.UPDATE]: 'обновлена',
    [NotificationChangeType.DELETE]: 'удалена',
};
