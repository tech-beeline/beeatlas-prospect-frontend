import React, { FC } from 'react';
import { Avatar, Checkbox, Skeleton } from '@beeline/design-system-react';

import { Link } from 'components/other';

import { SubscriptionType } from 'api/subscriptions/types';

import {
    subscriptionTypeToColorMap,
    subscriptionTypeToIconMap,
    subscriptionTypeToTitleMap,
} from './const';
import { ISubscriptionCard } from './types';
import * as S from './units';

export const SubscriptionCard: FC<ISubscriptionCard> = ({
    selectedSubscriptionsIds,
    subscription,
    onCheckboxClick,
}) => {
    return (
        <S.SubscriptionCard>
            <Checkbox
                checked={selectedSubscriptionsIds.includes(subscription.id)}
                onChange={() => onCheckboxClick(subscription)}
            />
            <Avatar
                iconName={
                    subscription.type === SubscriptionType.CJ
                        ? undefined
                        : subscriptionTypeToIconMap[subscription.type]
                }
                letter={subscription.type === SubscriptionType.CJ ? 'CJ' : undefined}
                color={subscriptionTypeToColorMap[subscription.type]}
            />
            <div>
                {subscription.type !== SubscriptionType.CJ && (
                    <S.Body3>{subscriptionTypeToTitleMap[subscription.type]}</S.Body3>
                )}
                <div>
                    <Link title={subscription.title} url="cj" />
                </div>
            </div>
        </S.SubscriptionCard>
    );
};

export const SubscriptionCardSkeleton = () => (
    <S.SubscriptionCard>
        <Checkbox disabled />
        <S.AvatarSkeleton height={40} radius={12} />
        <Skeleton height={40} radius={12} />
    </S.SubscriptionCard>
);
