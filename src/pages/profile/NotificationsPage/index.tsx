import React, { useState } from 'react';
import { Button, Chip, DatePickerRange, Pagination, Select } from '@beeline/design-system-react';
import dayjs from 'dayjs';
import { NotificationCard, NotificationCardSkeleton } from 'features/notifications';

import { ImageVariants, NotFoundBlock } from 'components/other';

import {
    useGetNotificationsQuery,
    useUpdateNotificationsMutation,
} from 'api/queries/notifications';

import {
    CHIPS,
    FilterVariants,
    filterVariantToNotificationEntityMap,
    NotificationVariants,
} from './const';
import * as S from './units';

export const NotificationsPage = () => {
    const [date, setDate] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [notificationVariant, setNotificationVariant] = useState(NotificationVariants.ALL);
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);

    const notificationVariantOptions = [
        { id: NotificationVariants.ALL, value: 'Все' },
        { id: NotificationVariants.UNREAD, value: 'Непрочитанные' },
        {
            id: NotificationVariants.READ,
            value: 'Прочитанные',
        },
    ];

    const { data, isLoading } = useGetNotificationsQuery({
        page: page - 1,
        afterDate: date[0] ? dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss') : undefined,
        beforeDate: date[1] ? dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss') : undefined,
        type:
            filterVariant !== FilterVariants.ALL
                ? filterVariantToNotificationEntityMap[filterVariant]
                : undefined,
        wasNotify:
            notificationVariant === NotificationVariants.UNREAD
                ? false
                : notificationVariant === NotificationVariants.READ
                ? true
                : undefined,
    });

    const { mutateAsync: updateNotifications } = useUpdateNotificationsMutation();

    const handleReadAllClick = () => {
        if (data) {
            updateNotifications(
                data.content
                    .filter((notification) => notification.webNotify === false)
                    .map((notification) => notification.id),
            );
        }
    };

    const hasUnreadNotifications = (data?.content ?? []).some(
        (notification) => notification.webNotify === false,
    );
    const isEmpty = data && data.content.length === 0;
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
                            setPage(1);
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
                <S.ControlsContainer>
                    <S.ChipsContainer>
                        {CHIPS.map((chip) => (
                            <Chip
                                key={chip.value}
                                label={chip.label}
                                active={filterVariant === chip.value}
                                onClick={() => setFilterVariant(chip.value)}
                            />
                        ))}
                    </S.ChipsContainer>
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
                        <S.CardsContainer>
                            {data.content.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                />
                            ))}
                        </S.CardsContainer>
                        {data.totalPages > 1 && (
                            <S.PaginationContainer>
                                <Pagination
                                    count={data.totalPages}
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
