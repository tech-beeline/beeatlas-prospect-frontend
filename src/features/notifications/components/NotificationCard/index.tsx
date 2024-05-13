import React, { FC } from 'react';
import { Avatar, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Link } from 'components/other';

import { INotificationCard } from './types';
import * as S from './units';

export const NotificationCard: FC<INotificationCard> = ({
    type,
    loading = false,
    unread = false,
}) => {
    return (
        <S.NotificationCard unread={unread}>
            <S.CardContainer>
                <S.AvatarContainer>
                    {unread && <S.Indicator />}
                    {loading ? (
                        <Skeleton height={40} width={40} radius={12} />
                    ) : (
                        <Avatar
                            iconName={type === 'capability' ? Icons.Capability : Icons.Radar}
                            color={type === 'capability' ? 'orange' : 'blue'}
                        />
                    )}
                </S.AvatarContainer>
                {loading ? (
                    <S.SkeletonContainer>
                        <Skeleton width={60} height={14} radius={12} />
                        <Skeleton height={14} radius={12} />
                        <Skeleton height={14} radius={12} />
                    </S.SkeletonContainer>
                ) : type === 'capability' ? (
                    <div>
                        <S.Overline>18.03.2024</S.Overline>
                        <S.Body2>Изменения возможности</S.Body2>
                        <S.Body3>
                            Бизнес возможность{' '}
                            <Link
                                title="Управление исходящими коммуникациями"
                                url={'/models/fdm'}
                            />{' '}
                            перенесена в домен{' '}
                            <Link
                                title="Омниканальное управление взаимодействие"
                                url={'/models/fdm'}
                            />
                        </S.Body3>
                    </div>
                ) : (
                    <div>
                        <S.Overline>18.03.2024</S.Overline>
                        <S.Body2>Изменение статуса технологии</S.Body2>
                        <S.Body3>
                            Инструмент <Link title="«Figma»" url="/models/tech-radar" /> переведен в
                            статус «Hold»
                        </S.Body3>
                    </div>
                )}
            </S.CardContainer>
        </S.NotificationCard>
    );
};
