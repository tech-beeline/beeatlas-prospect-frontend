import React, { FC } from 'react';
import { Avatar, Skeleton } from '@beeline/design-system-react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { NotificationChangeType } from 'api/notifications/types';
import { useUpdateNotificationsMutation } from 'api/queries/notifications';

import { notificationEntityTypeToColorMap, notificationEntityTypeToIconMap } from './const';
import { INotificationCard } from './types';
import * as S from './units';

export const NotificationCard: FC<INotificationCard> = ({ notification, entityAlias }) => {
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

                <S.TextContainer>
                    <S.LineBreak>
                        <Text variant="body2">
                            {notification.changeDescription
                                .replace('<name>', notification.entityName)
                                .replace('<type>', entityAlias)}
                        </Text>
                    </S.LineBreak>
                    <Text inactive variant="body3">
                        {dayjs(notification.changeDate).format('DD.MM.YYYY')}
                    </Text>
                    {notification.changeType !== NotificationChangeType.DELETE &&
                        notification.linkTemplate && (
                            <S.LinkContainer>
                                <Link
                                    title="Перейти"
                                    url={notification.linkTemplate
                                        .replace('<id>', String(notification.entityId))
                                        .replace(
                                            '<childrenId>',
                                            String(notification.childrenEntityId ?? ''),
                                        )}
                                />
                            </S.LinkContainer>
                        )}
                </S.TextContainer>
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
