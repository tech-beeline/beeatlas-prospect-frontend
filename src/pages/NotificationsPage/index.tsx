import React, { useState } from 'react';
import { Button, Chip, DatePickerRange } from '@beeline/design-system-react';
import { NotificationCard } from 'features/notifications';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { CHIPS, FilterVariants } from './const';
import * as S from './units';

const isLoading = false;
const isEmpty = false;

export const NotificationsPage = () => {
    const [search, setSearch] = useState('');
    const [date, setDate] = useState<string[]>([]);
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);

    const areFiltersEmpty = search === '' && date.length === 0;

    return (
        <S.PageWrapper>
            <S.Container>
                <S.Header>
                    <S.Title>Уведомления</S.Title>
                    <Button variant="plain">Прочитать все</Button>
                </S.Header>
                <S.FiltersContainer>
                    <S.SearchStyled
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                    />
                    <DatePickerRange
                        placeholder="Дата"
                        value={date}
                        onChange={(dates) => setDate(dates as string[])}
                    />
                </S.FiltersContainer>
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

                {!isLoading && !isEmpty && (
                    <S.CardsContainer>
                        <NotificationCard type="capability" unread />
                        <NotificationCard type="tech" unread />
                        <NotificationCard type="capability" />
                        <NotificationCard type="tech" />
                        <NotificationCard type="tech" />
                        <NotificationCard type="tech" />
                        <NotificationCard type="tech" />
                    </S.CardsContainer>
                )}

                {isLoading && (
                    <S.CardsContainer>
                        <NotificationCard type="capability" loading />
                        <NotificationCard type="capability" loading />
                        <NotificationCard type="capability" loading />
                    </S.CardsContainer>
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
