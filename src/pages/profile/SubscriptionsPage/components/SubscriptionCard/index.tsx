import React, { FC } from 'react';

import { Link } from 'components/other';
import { Avatar, Button, Icon, Skeleton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import {
    subscriptionTypeToColorMap,
    subscriptionTypeToIconMap,
    subscriptionTypeToLinkFormatterMap,
} from './const';
import { ISubscriptionCard } from './types';
import * as S from './units';

export const SubscriptionCard: FC<ISubscriptionCard> = ({
    // selectedSubscriptions,
    // selectedSubscriptionsIds,
    // setSelectedSubscriptions,
    entitiesData,
    subscription,
    openModal,
    setSelectedSingleSubscription,
}) => {
    // const handleCheckboxClick = () => {
    //     if (selectedSubscriptionsIds.includes(subscription.id)) {
    //         setSelectedSubscriptions(
    //             selectedSubscriptions.filter(
    //                 (selectedSubscription) => selectedSubscription.id !== subscription.id,
    //             ),
    //         );
    //     } else {
    //         setSelectedSubscriptions([...selectedSubscriptions, subscription]);
    //     }
    // };

    const handleUnsubscribeClick = () => {
        setSelectedSingleSubscription(subscription);
        openModal();
    };

    // const isSelected = selectedSubscriptionsIds.includes(subscription.id);

    return (
        <S.SubscriptionCard isSelected={false}>
            <S.ContentContainer>
                {/* <Checkbox checked={isSelected} onChange={handleCheckboxClick} /> */}
                <Avatar
                    icon={<Icon iconName={subscriptionTypeToIconMap[subscription.entityType]} />}
                    color={subscriptionTypeToColorMap[subscription.entityType]}
                />
                <div>
                    <S.Body3>
                        {entitiesData.find((e) => e.type === subscription.entityType)?.alias ??
                            'Сущность'}
                    </S.Body3>
                    <div>
                        <Link
                            title={subscription.name}
                            url={subscriptionTypeToLinkFormatterMap[subscription.entityType](
                                subscription.id,
                            )}
                        />
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
        {/* <Checkbox disabled /> */}
        <S.AvatarSkeleton height={40} radius={12} />
        <Skeleton height={40} radius={12} />
    </S.SubscriptionCard>
);
