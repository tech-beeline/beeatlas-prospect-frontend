import React, { useState } from 'react';
import { Button, Chip, DatePickerRange, Pagination } from '@beeline/design-system-react';
import { NotificationCard, NotificationCardSkeleton } from 'features/notifications';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetNotificationsQuery } from 'api/queries/notifications';

import { CHIPS, FilterVariants } from './const';
import * as S from './units';

const NOTIFICATIONS_PER_PAGE = 20;

export const NotificationsPage = () => {
    const [date, setDate] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);

    const { data, isLoading } = useGetNotificationsQuery();

    const isEmpty = data && data.length === 0;
    const areFiltersEmpty = date.length === 0;

    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <S.Title>Уведомления</S.Title>
                </S.Header>
                <S.FiltersContainer>
                    <DatePickerRange
                        placeholder="Дата"
                        value={date}
                        onChange={(dates) => setDate(dates as string[])}
                    />
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
                    <Button disabled variant="plain" size="small">
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
                            {data.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                />
                            ))}
                        </S.CardsContainer>
                        <S.PaginationContainer>
                            <Pagination
                                count={Math.ceil(data.length / NOTIFICATIONS_PER_PAGE)}
                                page={page}
                                onChange={setPage}
                            />
                        </S.PaginationContainer>
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
