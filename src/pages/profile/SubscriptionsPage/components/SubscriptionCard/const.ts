import { ColorTypes } from '@beeline/design-system-react/types/types/status';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import * as R from 'router/const';

export const subscriptionTypeToIconMap = {
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: Icons.Capability,
    [SubscriptionEntityVariants.TECH_CAPABILITY]: Icons.Capability,
    [SubscriptionEntityVariants.TECH]: Icons.Radar,
    [SubscriptionEntityVariants.ARCH_INTERFACE]: Icons.AppleImac,
};

export const subscriptionTypeToColorMap: Record<SubscriptionEntityVariants, ColorTypes> = {
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: 'orange',
    [SubscriptionEntityVariants.TECH_CAPABILITY]: 'blue',
    [SubscriptionEntityVariants.TECH]: 'teal',
    [SubscriptionEntityVariants.ARCH_INTERFACE]: 'blue',
};

export const subscriptionTypeToLinkFormatterMap = {
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: (id: number) =>
        `${R.MODELS_PATH}${R.FDM_PATH}?id=${id}&type=BUSINESS`,
    [SubscriptionEntityVariants.TECH_CAPABILITY]: (id: number) =>
        `${R.MODELS_PATH}${R.FDM_PATH}?id=${id}&type=TECH`,
    [SubscriptionEntityVariants.TECH]: (id: number) =>
        `${R.MODELS_PATH}${R.TECH_RADAR_PATH}?id=${id}`,
    [SubscriptionEntityVariants.ARCH_INTERFACE]: (id: number) =>
        `${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?id=${id}&type=arch_interface`,
};
