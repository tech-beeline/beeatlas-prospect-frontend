import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SubscriptionType } from 'api/subscriptions/types';
import * as R from 'router/const';

export const subscriptionTypeToIconMap = {
    [SubscriptionType.BUSINESS_CAPABILITY]: Icons.Capability,
    [SubscriptionType.TECH_CAPABILITY]: Icons.Capability,
    [SubscriptionType.GROUP]: Icons.Folder,
    [SubscriptionType.DOMAIN]: Icons.PagesMultipleEmpty,
    [SubscriptionType.CJ]: Icons.Capability,
    [SubscriptionType.TECHNOLOGY]: Icons.Radar,
};

export const subscriptionTypeToTitleMap = {
    [SubscriptionType.BUSINESS_CAPABILITY]: 'Бизнес возможность',
    [SubscriptionType.TECH_CAPABILITY]: 'Техническая возможность',
    [SubscriptionType.GROUP]: 'Группировка',
    [SubscriptionType.DOMAIN]: 'Домен',
    [SubscriptionType.CJ]: 'CJ',
    [SubscriptionType.TECHNOLOGY]: 'Технология',
};

export const subscriptionTypeToColorMap: Record<
    SubscriptionType,
    'grey' | 'orange' | 'blue' | 'purple' | 'teal'
> = {
    [SubscriptionType.BUSINESS_CAPABILITY]: 'orange',
    [SubscriptionType.TECH_CAPABILITY]: 'blue',
    [SubscriptionType.GROUP]: 'grey',
    [SubscriptionType.DOMAIN]: 'grey',
    [SubscriptionType.CJ]: 'purple',
    [SubscriptionType.TECHNOLOGY]: 'teal',
};

export const subscriptionTypeToLinkFormatterMap = {
    [SubscriptionType.BUSINESS_CAPABILITY]: (id: number) =>
        `${R.MODELS_PATH}${R.FDM_PATH}?id=${id}&type=BUSINESS`,
    [SubscriptionType.GROUP]: (id: number) =>
        `${R.MODELS_PATH}${R.FDM_PATH}?id=${id}&type=BUSINESS`,
    [SubscriptionType.DOMAIN]: (id: number) =>
        `${R.MODELS_PATH}${R.FDM_PATH}?id=${id}&type=BUSINESS`,
    [SubscriptionType.TECH_CAPABILITY]: (id: number) =>
        `${R.MODELS_PATH}${R.FDM_PATH}?id=${id}&type=TECH`,
    [SubscriptionType.CJ]: () => `${R.CX_PATH}${R.CJ_PATH}`,
    [SubscriptionType.TECHNOLOGY]: () => `${R.MODELS_PATH}${R.TECH_RADAR_PATH}`,
};
