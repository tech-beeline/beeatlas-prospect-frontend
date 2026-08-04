import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    BusinessNotificationCard,
    NotificationCard,
    NotificationCardSkeleton,
    NotificationGroups,
} from 'features/notifications';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { DatePickerRange } from 'components/ui';
import { Select } from 'components/ui';
import { Pagination } from 'components/ui';
import { Button, ButtonGroup, Chip, Skeleton } from 'components/ui';

import {
    useGetNotificationsQuery,
    useUpdateBusinessNotificationsMutation,
    useUpdateNotificationsMutation,
} from 'api/queries/notifications';
import { useGetSubscriptionEntityTypesQuery } from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';

import {
    BUSINESS_CHIPS,
    BusinessFilterVariants,
    FilterVariants,
    filterVariantToBusinessNotificationEntityMap,
    NotificationVariants,
} from './const';
import * as S from './units';

export const NotificationsPage = () => {
    const [date, setDate] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [notificationGroup, setNotificationGroup] = useState(
        NotificationGroups.LANDSCAPE_CHANGES,
    );
    const [notificationVariant, setNotificationVariant] = useState(NotificationVariants.ALL);
    const [filterVariant, setFilterVariant] = useState<
        FilterVariants.ALL | SubscriptionEntityVariants
    >(FilterVariants.ALL);
    const [businessFilterVariant, setBusinessFilterVariant] = useState(BusinessFilterVariants.ALL);

    const notificationVariantOptions = [
        { id: NotificationVariants.ALL, value: 'Все' },
        { id: NotificationVariants.UNREAD, value: 'Непрочитанные' },
        {
            id: NotificationVariants.READ,
            value: 'Прочитанные',
        },
    ];

    const [params, setParams] = useSearchParams();
    const groupParam = params.get('group');

    useEffect(() => {
        if (
            groupParam &&
            [NotificationGroups.LANDSCAPE_CHANGES, NotificationGroups.BUSINESS_EVENTS].includes(
                groupParam as NotificationGroups,
            )
        ) {
            setNotificationGroup(groupParam as NotificationGroups);
            setDate([]);
            setNotificationVariant(NotificationVariants.ALL);
        }
    }, [groupParam]);

    useEffect(() => {
        setPage(1);
    }, [date, notificationGroup, notificationVariant, filterVariant, businessFilterVariant]);

    const { data, isLoading } = useGetNotificationsQuery({
        page: page - 1,
        afterDate: date[0] ? dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss') : undefined,
        beforeDate: date[1] ? dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss') : undefined,
        type: filterVariant !== FilterVariants.ALL ? filterVariant : undefined,
        businessType:
            businessFilterVariant !== BusinessFilterVariants.ALL
                ? filterVariantToBusinessNotificationEntityMap[businessFilterVariant]
                : undefined,
        wasNotify:
            notificationVariant === NotificationVariants.UNREAD
                ? false
                : notificationVariant === NotificationVariants.READ
                ? true
                : undefined,
    });
    const { data: entitiesData, isLoading: isLoadingEntities } =
        useGetSubscriptionEntityTypesQuery();

    const { mutateAsync: updateNotifications } = useUpdateNotificationsMutation();
    const { mutateAsync: updateBusinessNotifications } = useUpdateBusinessNotificationsMutation();

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

    const hasUnreadNotifications = data
        ? (notificationGroup === NotificationGroups.LANDSCAPE_CHANGES
              ? data.notifications.content
              : data.businessNotifications.content
          ).some((notification) => !notification.webNotify)
        : false;

    const isEmpty =
        data &&
        ((notificationGroup === NotificationGroups.LANDSCAPE_CHANGES &&
            data.notifications.content.length === 0) ||
            (notificationGroup === NotificationGroups.BUSINESS_EVENTS &&
                data.businessNotifications.content.length === 0));

    const areFiltersEmpty = date.length === 0;

    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <S.Title>Уведомления</S.Title>
                </S.Header>
                <S.FiltersContainer>
                    <Select
                        label="Список уведомлений"
                        options={notificationVariantOptions}
                        onChange={(values) => {
                            setNotificationVariant(values[0]?.id ?? NotificationVariants.ALL);
                        }}
                        values={[
                            notificationVariantOptions.find(
                                (variant) => variant.id === notificationVariant,
                            ),
                        ]}
                    />
                    <DatePickerRange
                        placeholder="Дата"
                        value={date}
                        onChange={(dates) => {
                            setDate(dates as string[]);
                        }}
                    />
                    <Button
                        disabled={
                            date.length === 0 && notificationVariant === NotificationVariants.ALL
                        }
                        onClick={() => {
                            setDate([]);
                            setNotificationVariant(NotificationVariants.ALL);
                        }}
                        variant="plain"
                    >
                        Сбросить
                    </Button>
                </S.FiltersContainer>
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
                    onChange={(option) => {
                        option.id && setParams(new URLSearchParams({ group: option.id }));
                    }}
                />
                <S.ControlsContainer>
                    {notificationGroup === NotificationGroups.LANDSCAPE_CHANGES && (
                        <S.ChipsContainer>
                            <Chip
                                label="Все"
                                active={filterVariant === FilterVariants.ALL}
                                onClick={() => {
                                    setFilterVariant(FilterVariants.ALL);
                                    setPage(1);
                                }}
                            />
                            {isLoadingEntities &&
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} height={32} width={100} radius={16} />
                                ))}
                            {entitiesData &&
                                entitiesData.map((entity) => (
                                    <Chip
                                        key={entity.id}
                                        label={entity.alias}
                                        active={filterVariant === entity.type}
                                        onClick={() => {
                                            setFilterVariant(entity.type);
                                            setPage(1);
                                        }}
                                    />
                                ))}
                        </S.ChipsContainer>
                    )}
                    {notificationGroup === NotificationGroups.BUSINESS_EVENTS && (
                        <S.ChipsContainer>
                            {BUSINESS_CHIPS.map((chip) => (
                                <Chip
                                    key={chip.value}
                                    label={chip.label}
                                    active={businessFilterVariant === chip.value}
                                    onClick={() => setBusinessFilterVariant(chip.value)}
                                />
                            ))}
                        </S.ChipsContainer>
                    )}

                    <Button
                        disabled={!hasUnreadNotifications}
                        variant="plain"
                        size="small"
                        onClick={handleReadAllClick}
                    >
                        Прочитать все
                    </Button>
                </S.ControlsContainer>

                {isLoading && (
                    <S.CardsContainer>
                        <NotificationCardSkeleton />
                        <NotificationCardSkeleton />
                        <NotificationCardSkeleton />
                    </S.CardsContainer>
                )}

                {!isLoading && !isEmpty && data && (
                    <>
                        {notificationGroup === NotificationGroups.LANDSCAPE_CHANGES && (
                            <S.CardsContainer>
                                {data.notifications.content.map((notification) => (
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
                            </S.CardsContainer>
                        )}
                        {notificationGroup === NotificationGroups.BUSINESS_EVENTS && (
                            <S.CardsContainer>
                                {data.businessNotifications.content.map((notification) => (
                                    <BusinessNotificationCard
                                        key={notification.id}
                                        businessNotification={notification}
                                    />
                                ))}
                            </S.CardsContainer>
                        )}
                        {((notificationGroup === NotificationGroups.LANDSCAPE_CHANGES &&
                            data.notifications.totalPages > 1) ||
                            (notificationGroup === NotificationGroups.BUSINESS_EVENTS &&
                                data.businessNotifications.totalPages > 1)) && (
                            <S.PaginationContainer>
                                <Pagination
                                    count={
                                        notificationGroup === NotificationGroups.LANDSCAPE_CHANGES
                                            ? data.notifications.totalPages
                                            : data.businessNotifications.totalPages
                                    }
                                    page={page}
                                    onChange={setPage}
                                />
                            </S.PaginationContainer>
                        )}
                    </>
                )}

                {isEmpty && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title={
                                areFiltersEmpty
                                    ? 'Уведомлений нет'
                                    : 'Нет результатов, подходящих под параметры поиска'
                            }
                            text={areFiltersEmpty ? ' ' : 'Попробуйте изменить запрос'}
                        />
                    </S.NotFoundContainer>
                )}
            </S.Container>
        </S.PageWrapper>
    );
};
