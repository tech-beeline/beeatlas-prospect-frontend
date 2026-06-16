import { ColorTypes } from 'components/ui';

import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

export const notificationEntityTypeToIconMap: Record<SubscriptionEntityVariants, Icons> = {
    [SubscriptionEntityVariants.TECH_CAPABILITY]: Icons.Capability,
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: Icons.Capability,
    [SubscriptionEntityVariants.TECH]: Icons.Radar,
    [SubscriptionEntityVariants.ARCH_INTERFACE]: Icons.AppleImac,
    [SubscriptionEntityVariants.PATTERN]: Icons.Archive,
};

export const notificationEntityTypeToColorMap: Record<SubscriptionEntityVariants, ColorTypes> = {
    [SubscriptionEntityVariants.TECH_CAPABILITY]: 'blue',
    [SubscriptionEntityVariants.BUSINESS_CAPABILITY]: 'orange',
    [SubscriptionEntityVariants.TECH]: 'teal',
    [SubscriptionEntityVariants.ARCH_INTERFACE]: 'blue',
    [SubscriptionEntityVariants.PATTERN]: 'green',
};
