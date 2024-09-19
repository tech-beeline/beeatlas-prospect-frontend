import React, { FC } from 'react';
import { Avatar, Skeleton } from '@beeline/design-system-react';
import dayjs from 'dayjs';

import { Link } from 'components/other';

import { useUpdateNotificationsMutation } from 'api/queries/notifications';

import {
    notificationChangeTypeToNameMap,
    notificationEntityTypeToColorMap,
    notificationEntityTypeToIconMap,
    notificationEntityTypeToNameMap,
    notificationEntityTypeToTitleMap,
} from './const';
import { INotificationCard } from './types';
import * as S from './units';

export const NotificationCard: FC<INotificationCard> = ({ notification }) => {
    const { mutateAsync: updateNotifications } = useUpdateNotificationsMutation();

    const handleCardClick = () => {
        if (!notification.webNotify) {
            updateNotifications([notification.id]);
        }
    };

    return (
        <S.NotificationCard unread={!notification.webNotify} onClick={handleCardClick}>
            <S.CardContainer>
                <S.AvatarContainer>
                    {!notification.webNotify && <S.Indicator />}
                    <Avatar
                        iconName={notificationEntityTypeToIconMap[notification.entityType]}
                        color={notificationEntityTypeToColorMap[notification.entityType]}
                    />
                </S.AvatarContainer>

                <div>
                    <S.Overline>{dayjs(notification.changeDate).format('DD.MM.YYYY')}</S.Overline>
                    <S.Body2>{notificationEntityTypeToTitleMap[notification.entityType]}</S.Body2>
                    <S.Body3>
                        {notificationEntityTypeToNameMap[notification.entityType]}{' '}
                        <S.Name>{notification.entityName}</S.Name>{' '}
                        {notificationChangeTypeToNameMap[notification.changeType]}
                    </S.Body3>
                    <S.LinkContainer>
                        <Link title="Перейти" url={notification.entityLink} />
                    </S.LinkContainer>
                </div>
            </S.CardContainer>
        </S.NotificationCard>
    );
};

export const NotificationCardSkeleton = () => (
    <S.NotificationCard>
        <S.CardContainer>
            <S.AvatarContainer>
                <Skeleton height={40} width={40} radius={12} />
            </S.AvatarContainer>

            <S.SkeletonContainer>
                <Skeleton width={60} height={14} radius={12} />
                <Skeleton height={14} radius={12} />
                <Skeleton height={14} radius={12} />
            </S.SkeletonContainer>
        </S.CardContainer>
    </S.NotificationCard>
);
