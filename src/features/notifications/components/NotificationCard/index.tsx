import React, { FC } from 'react';
import { Avatar, Skeleton } from '@beeline/design-system-react';

import { Link } from 'components/other';

import { NotificationType } from 'api/notifications/types';

import {
    notificationTypeToColorMap,
    notificationTypeToIconMap,
    notificationTypeToNameMap,
} from './const';
import { INotificationCard } from './types';
import * as S from './units';

export const NotificationCard: FC<INotificationCard> = ({ notification }) => {
    return (
        <S.NotificationCard unread={notification.webNotify}>
            <S.CardContainer>
                <S.AvatarContainer>
                    {notification.webNotify && <S.Indicator />}
                    <Avatar
                        iconName={notificationTypeToIconMap[notification.entityType]}
                        color={notificationTypeToColorMap[notification.entityType]}
                    />
                </S.AvatarContainer>

                <div>
                    <S.Overline>18.03.2024</S.Overline>
                    <S.Body2>{notificationTypeToNameMap[notification.entityType]}</S.Body2>
                    <S.Body3>
                        {notification.entityType === NotificationType.CAPABILITY ? (
                            <>
                                Бизнес возможность{' '}
                                <S.Name>Управление исходящими коммуникациями</S.Name> обновлена
                            </>
                        ) : (
                            <>
                                Технология <S.Name>Figma</S.Name> обновлена
                            </>
                        )}
                    </S.Body3>
                    <S.LinkContainer>
                        <Link outer={false} title="Перейти" url="/techradar" />
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
