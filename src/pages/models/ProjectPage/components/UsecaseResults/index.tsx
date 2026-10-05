import React, { FC, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getProjectUsecaseLatestDate } from 'features/projects';

import { Text } from 'components/core';
import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import {
    Button,
    Search,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import * as R from 'router/const';
import { formatDateToUTC } from 'utils/formatters';

import { IUsecaseResults } from './types';
import * as S from './units';

export const UsecaseResults: FC<IUsecaseResults> = ({ usecases }) => {
    const [search, setSearch] = useState('');
    const filteredUsecases = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase('ru');

        if (!normalizedSearch) return usecases;

        return usecases.filter(
            (usecase) =>
                usecase.name.toLocaleLowerCase('ru').includes(normalizedSearch) ||
                usecase.code.toLocaleLowerCase('ru').includes(normalizedSearch),
        );
    }, [search, usecases]);

    const resetFilters = () => {
        setSearch('');
    };

    const hasFilters = !!search;

    return (
        <S.Container>
            <S.Filters>
                <S.FilterControl>
                    <Search
                        fullWidth
                        placeholder="Поиск по названию или коду сценария"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onClear={() => setSearch('')}
                    />
                </S.FilterControl>
                <Button disabled={!hasFilters} variant="plain" onClick={resetFilters}>
                    Сбросить
                </Button>
            </S.Filters>

            {filteredUsecases.length === 0 ? (
                <S.EmptyState>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="Use Case не найдены"
                        text="Измените параметры поиска или сбросьте фильтры"
                    />
                </S.EmptyState>
            ) : (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Сценарий</TableHeaderData>
                            <TableHeaderData>Дата изменения</TableHeaderData>
                            <TableHeaderData>История</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsecases.map((usecase) => (
                            <TableRow dense key={usecase.id}>
                                <TableData>
                                    <div>
                                        <Link
                                            outer={false}
                                            title={usecase.name}
                                            url={`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${usecase.id}`}
                                        />
                                        <Text inactive variant="body3">
                                            {usecase.code}
                                        </Text>
                                    </div>
                                </TableData>
                                <TableData>
                                    {dayjs(formatDateToUTC(getProjectUsecaseLatestDate(usecase)))
                                        .local()
                                        .format('DD.MM.YYYY, HH:mm')}
                                </TableData>
                                <TableData>
                                    <Link
                                        outer={false}
                                        title="Посмотреть"
                                        url={`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}${R.HISTORY_PATH}?id=${usecase.id}`}
                                    />
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </S.TableStyled>
            )}
        </S.Container>
    );
};
