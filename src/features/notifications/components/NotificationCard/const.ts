import { ColorTypes } from '@beeline/design-system-react/types/types/status';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { SubscriptionEntityVariants } from 'api/subscriptions/types';

export const notificationEntityTypeToIconMap: Record<SubscriptionEntityVariants, Icons> = {
    [SubscriptionEntityVariants.TECH_CAPABILITY]: Icons.Capability,
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: Icons.Capability,
    [SubscriptionEntityVariants.TECH]: Icons.Radar,
    [SubscriptionEntityVariants.ARCH_INTERFACE]: Icons.AppleImac,
};

export const notificationEntityTypeToColorMap: Record<SubscriptionEntityVariants, ColorTypes> = {
    [SubscriptionEntityVariants.TECH_CAPABILITY]: 'blue',
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: 'orange',
    [SubscriptionEntityVariants.TECH]: 'teal',
    [SubscriptionEntityVariants.ARCH_INTERFACE]: 'blue',
};
