import React, { FC, useState } from 'react';
import {
    fitnessFunctionStatusToNameMap,
    fitnessFunctionTypeToNameMap,
} from 'features/fitness-functions';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { Select } from 'components/ui';
import { Button, Search, Switch } from 'components/ui';

import { IFitnessFunctionData } from 'api/fitness-functions/types';

import { fitnessFunctionStatusOptions, fitnessFunctionTypeOptions } from './const';
import { IFitnessFunctionFilters } from './types';
import * as S from './units';

export const FitnessFunctionFilters: FC<IFitnessFunctionFilters> = ({
    fitnessFunctions,
    filterValues,
    setFilterValues,
}) => {
    const [search, setSearch] = useState('');
    const [menuOpened, setMenuOpened] = useState(false);

    const searchResultsFiltered = fitnessFunctions.filter(
        (ff) =>
            ff.description.toLowerCase().includes(search.toLowerCase()) ||
            ff.code.toLowerCase().includes(search.toLowerCase()),
    );

    const isResetButtonActive =
        filterValues.type !== null ||
        filterValues.status !== null ||
        filterValues.isTrigger ||
        filterValues.selectedFitnessFunctionId !== null;

    const handleResetButtonClick = () => {
        setSearch('');
        setFilterValues({
            type: null,
            status: null,
            isTrigger: false,
            selectedFitnessFunctionId: null,
        });
    };

    const handleSearchResultClick = (item: IFitnessFunctionData) => {
        setSearch(item.code);
        setFilterValues({ ...filterValues, selectedFitnessFunctionId: item.id });
        setMenuOpened(false);
    };

    return (
        <>
            <S.SearchContainer>
                <S.SearchBarContainer>
                    <Search
                        fullWidth
                        placeholder="Название или код фитнес-функции"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => {
                            setSearch('');
                            setFilterValues({ ...filterValues, selectedFitnessFunctionId: null });
                        }}
                        onFocus={() => setMenuOpened(true)}
                        onBlur={() => setMenuOpened(false)}
                    />
                    {menuOpened && search.trim().length >= 1 && (
                        <S.MenuBlock>
                            {searchResultsFiltered.map((item) => (
                                <S.MenuItem
                                    key={`${item.id}`}
                                    onMouseDown={() => handleSearchResultClick(item)}
                                >
                                    <Text variant="body2">{item.code}</Text>
                                    <Text inactive variant="body3">
                                        {item.description}
                                    </Text>
                                </S.MenuItem>
                            ))}
                            {searchResultsFiltered.length === 0 && (
                                <S.MenuItem>
                                    <Text inactive variant="subtitle3">
                                        Нет совпадений
                                    </Text>
                                </S.MenuItem>
                            )}
                        </S.MenuBlock>
                    )}
                </S.SearchBarContainer>
                <Text variant="subtitle3">
                    <Link
                        showOuterIcon
                        showIconPermanently
                        iconLeft
                        title="Правила создания фитнес-функции"
                        url={`${window.FEATURE_FLAGS.FLAG_DOC_SERVICE_URL}/beeatlas-docs/instruction/FF/custom_fitness_function/`}
                    />
                </Text>
            </S.SearchContainer>

            <S.FiltersContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        placeholder="Тип"
                        options={fitnessFunctionTypeOptions}
                        values={
                            filterValues.type
                                ? [
                                      {
                                          id: filterValues.type,
                                          value: fitnessFunctionTypeToNameMap[filterValues.type],
                                      },
                                  ]
                                : []
                        }
                        onChange={(values) =>
                            setFilterValues({ ...filterValues, type: values[0].id })
                        }
                    />
                </S.SelectContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        placeholder="Статус"
                        options={fitnessFunctionStatusOptions}
                        values={
                            filterValues.status
                                ? [
                                      {
                                          id: filterValues.status,
                                          value: fitnessFunctionStatusToNameMap[
                                              filterValues.status
                                          ],
                                      },
                                  ]
                                : []
                        }
                        onChange={(values) =>
                            setFilterValues({ ...filterValues, status: values[0].id })
                        }
                    />
                </S.SelectContainer>
                <Switch
                    label="Триггеры"
                    checked={filterValues.isTrigger}
                    onChange={(e) =>
                        setFilterValues({ ...filterValues, isTrigger: e.target.checked })
                    }
                />
                <Button
                    disabled={!isResetButtonActive}
                    variant="plain"
                    size="medium"
                    onClick={handleResetButtonClick}
                >
                    Сбросить
                </Button>
            </S.FiltersContainer>
        </>
    );
};
