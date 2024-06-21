import React, { FC } from 'react';
import { Avatar, Button, Checkbox, Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

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
    selectedSubscriptions,
    selectedSubscriptionsIds,
    setSelectedSubscriptions,
    subscription,
    openModal,
    setSelectedSingleSubscription,
}) => {
    const handleCheckboxClick = () => {
        if (selectedSubscriptionsIds.includes(subscription.id)) {
            setSelectedSubscriptions(
                selectedSubscriptions.filter(
                    (selectedSubscription) => selectedSubscription.id !== subscription.id,
                ),
            );
        } else {
            setSelectedSubscriptions([...selectedSubscriptions, subscription]);
        }
    };

    const handleUnsubscribeClick = () => {
        setSelectedSingleSubscription(subscription);
        openModal();
    };

    const isSelected = selectedSubscriptionsIds.includes(subscription.id);

    return (
        <S.SubscriptionCard isSelected={isSelected}>
            <S.ContentContainer>
                <Checkbox checked={isSelected} onChange={handleCheckboxClick} />
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
            </S.ContentContainer>
            <Button
                startIcon={<Icon iconName={Icons.NotificationOff} />}
                onClick={handleUnsubscribeClick}
            >
                Отписаться
            </Button>
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
