import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Select } from 'components/ui';

import { useGetTechnologyCategoriesQuery } from 'api/queries/technologies';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ALL_VARIANT_ID, ringOptions, sectorOptions } from './const';
import { ITechnologyFilters } from './types';
import * as S from './units';

export const TechnologyFilters: FC<ITechnologyFilters> = ({
    filterOptions,
    setFilterOptions,
    setCountPage,
    isLoading,
}) => {
    const navigate = useNavigate();

    const { data: categoriesData, isLoading: isLoadingCategories } =
        useGetTechnologyCategoriesQuery();

    const areButtonsDisabled = isLoading || isLoadingCategories;

    const categoriesOptions = (categoriesData ?? []).map((category) => ({
        id: category.id,
        value: category.name,
    }));

    return (
        <>
            <S.FlexContainer>
                <S.SearchStyled
                    fullWidth
                    placeholder="Поиск"
                    disabled={areButtonsDisabled}
                    value={filterOptions.search}
                    onChange={(e) => {
                        setFilterOptions({ ...filterOptions, search: e.target.value });
                        setCountPage(1);
                    }}
                    onClear={() => {
                        setFilterOptions({ ...filterOptions, search: '' });
                        setCountPage(1);
                    }}
                />
                <Button
                    onClick={() => navigate(`${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.ADD_PATH}`)}
                    startIcon={<Icon iconName={Icons.Add} />}
                    size="medium"
                    variant="contained"
                >
                    Добавить технологию
                </Button>
            </S.FlexContainer>

            <S.FlexContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        disabled={areButtonsDisabled}
                        label="Секторы"
                        options={sectorOptions}
                        values={[
                            filterOptions.sector === null
                                ? sectorOptions[0]
                                : sectorOptions.find(
                                      (option) => option.id === filterOptions.sector,
                                  ),
                        ]}
                        onChange={(values) =>
                            setFilterOptions({
                                ...filterOptions,
                                sector:
                                    (values[0]?.id === ALL_VARIANT_ID
                                        ? null
                                        : Number(values[0]?.id)) ?? null,
                            })
                        }
                    />
                </S.SelectContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        disabled={areButtonsDisabled}
                        label="Статусы"
                        options={ringOptions}
                        values={[
                            filterOptions.ring === null
                                ? ringOptions[0]
                                : ringOptions.find((option) => option.id === filterOptions.ring),
                        ]}
                        onChange={(values) =>
                            setFilterOptions({
                                ...filterOptions,
                                ring:
                                    (values[0]?.id === ALL_VARIANT_ID
                                        ? null
                                        : Number(values[0]?.id)) ?? null,
                            })
                        }
                    />
                </S.SelectContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        multiple
                        disabled={areButtonsDisabled}
                        label="Группы"
                        options={categoriesOptions}
                        values={categoriesOptions.filter(
                            (category) =>
                                filterOptions.groups && filterOptions.groups.includes(category.id),
                        )}
                        onChange={(values) =>
                            setFilterOptions({
                                ...filterOptions,
                                groups: values.map((v) => Number(v.id)),
                            })
                        }
                    />
                </S.SelectContainer>
                <Button
                    disabled={
                        !Boolean(
                            filterOptions.search ||
                                filterOptions.ring ||
                                filterOptions.sector ||
                                filterOptions.groups.length > 0,
                        )
                    }
                    onClick={() =>
                        setFilterOptions({
                            search: '',
                            ring: null,
                            sector: null,
                            groups: [],
                        })
                    }
                    size="medium"
                    variant="plain"
                >
                    Сбросить
                </Button>
            </S.FlexContainer>
        </>
    );
};
