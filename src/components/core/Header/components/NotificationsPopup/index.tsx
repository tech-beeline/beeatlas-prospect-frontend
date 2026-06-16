import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BusinessNotificationCard,
    NotificationCard,
    NotificationCardSkeleton,
    NotificationGroups,
} from 'features/notifications';

import { Button, ButtonGroup, Counter, Divider, Icon } from 'components/ui';

import {
    useGetNotificationsQuery,
    useUpdateBusinessNotificationsMutation,
    useUpdateNotificationsMutation,
} from 'api/queries/notifications';
import { useGetSubscriptionEntityTypesQuery } from 'api/queries/subscriptions';
import { useOutsideClick } from 'hooks/useOutsideClick';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import * as S from './units';

export const NotificationsPopup: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notificationGroup, setNotificationGroup] = useState(
        NotificationGroups.LANDSCAPE_CHANGES,
    );

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const iconRef = useRef<HTMLButtonElement>(null);

    const {
        data,
        isError,
        isLoading: isLoadingNotifications,
        refetch,
    } = useGetNotificationsQuery({ wasNotify: false });
    const { data: entitiesData, isLoading: isLoadingEntities } =
        useGetSubscriptionEntityTypesQuery();

    const isLoading = isLoadingNotifications || isLoadingEntities;

    const { mutateAsync: updateNotifications } = useUpdateNotificationsMutation();
    const { mutateAsync: updateBusinessNotifications } = useUpdateBusinessNotificationsMutation();

    const isEmpty =
        data &&
        ((notificationGroup === NotificationGroups.LANDSCAPE_CHANGES &&
            data.notifications.content.length === 0) ||
            (notificationGroup === NotificationGroups.BUSINESS_EVENTS &&
                data.businessNotifications.content.length === 0));

    const handleReadAllClick = () => {
        if (data) {
            if (notificationGroup === NotificationGroups.LANDSCAPE_CHANGES) {
                updateNotifications(
                    data.notifications.content
                        .filter((notification) => !notification.webNotify)
                        .map((notification) => notification.id),
                );
            } else {
                updateBusinessNotifications(
                    data.businessNotifications.content
                        .filter((notification) => !notification.webNotify)
                        .map((notification) => notification.id),
                );
            }
        }
    };

    useOutsideClick(dropdownRef, isOpen, setIsOpen, iconRef);

    const handleNavigateButtonClick = () => {
        navigate(`${R.NOTIFICATIONS_PATH}?group=${notificationGroup}`);
        setIsOpen(false);
    };

    return (
        <S.Container>
            <Counter
                size="small"
                count={
                    data &&
                    data.notifications.totalElements + data.businessNotifications.totalElements > 0
                        ? data.notifications.totalElements +
                          data.businessNotifications.totalElements
                        : null
                }
            >
                <S.IconStyled
                    size="large"
                    ref={iconRef}
                    iconName={Icons.Notification}
                    onClick={() => setIsOpen(!isOpen)}
                    data-tooltip-id="notificationsIcon"
                />
            </Counter>

            <S.TooltipStyled id="notificationsIcon" place="bottom" noArrow>
                Уведомления
            </S.TooltipStyled>

            {isOpen && (
                <S.Dropdown ref={dropdownRef}>
                    <S.Header>
                        <ButtonGroup
                            size="small"
                            selectedOption={{
                                id: notificationGroup,
                            }}
                            options={[
                                {
                                    id: NotificationGroups.LANDSCAPE_CHANGES,
                                    value: NotificationGroups.LANDSCAPE_CHANGES,
                                    label: 'Изменения ландшафта',
                                },
                                {
                                    id: NotificationGroups.BUSINESS_EVENTS,
                                    value: NotificationGroups.BUSINESS_EVENTS,
                                    label: 'События',
                                },
                            ]}
                            onChange={(option) =>
                                option.id && setNotificationGroup(option.id as NotificationGroups)
                            }
                        />
                    </S.Header>
                    <S.Content>
                        {!isLoading && !isEmpty && !isError && data && (
                            <>
                                {notificationGroup === NotificationGroups.LANDSCAPE_CHANGES &&
                                    data.notifications.content.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                            entityAlias={
                                                entitiesData?.find(
                                                    (e) => e.type === notification.entityType,
                                                )?.alias ?? ''
                                            }
                                        />
                                    ))}
                                {notificationGroup === NotificationGroups.BUSINESS_EVENTS &&
                                    data.businessNotifications.content.map((notification) => (
                                        <BusinessNotificationCard
                                            key={notification.id}
                                            businessNotification={notification}
                                        />
                                    ))}
                            </>
                        )}
                        {isLoading && (
                            <>
                                <NotificationCardSkeleton />
                                <NotificationCardSkeleton />
                                <NotificationCardSkeleton />
                            </>
                        )}
                        {isEmpty && (
                            <S.EmptyContainer>
                                <Icon contained iconName={Icons.PageEmpty} />
                                <S.Subtitle3>Новых уведомлений нет</S.Subtitle3>
                            </S.EmptyContainer>
                        )}
                        {isError && (
                            <S.EmptyContainer>
                                <Icon contained iconName={Icons.InfoCircled} color="red" />
                                <S.Subtitle3>Не удалось загрузить список уведомлений</S.Subtitle3>
                                <S.ButtonContainer>
                                    <Button
                                        variant="plain"
                                        startIcon={<Icon iconName={Icons.RefreshDouble} />}
                                        onClick={() => refetch()}
                                    >
                                        Обновить
                                    </Button>
                                </S.ButtonContainer>
                            </S.EmptyContainer>
                        )}
                    </S.Content>

                    {!isLoading && !isError && (
                        <>
                            <Divider />
                            <S.Footer>
                                <S.ButtonsContainer>
                                    <Button
                                        variant="plain"
                                        disabled={
                                            !data ||
                                            (notificationGroup ===
                                                NotificationGroups.LANDSCAPE_CHANGES &&
                                                data.notifications.content.length === 0) ||
                                            (notificationGroup ===
                                                NotificationGroups.BUSINESS_EVENTS &&
                                                data.businessNotifications.content.length === 0)
                                        }
                                        onClick={handleReadAllClick}
                                    >
                                        Прочитать все
                                    </Button>
                                    <Button variant="plain" onClick={handleNavigateButtonClick}>
                                        Все уведомления
                                    </Button>
                                </S.ButtonsContainer>
                            </S.Footer>
                        </>
                    )}
                </S.Dropdown>
            )}
        </S.Container>
    );
};
