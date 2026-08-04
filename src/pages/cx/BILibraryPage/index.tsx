import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { Button, ButtonGroup, Counter, Icon, Search, Skeleton } from 'components/ui';

import { useGetBICollectionQuery } from 'api/queries/bi';
import { useModal } from 'hooks';
import {
    createEnumParser,
    createNumberArrayParser,
    createNumberOrEnumParser,
    useURLFilters,
} from 'hooks/useURLFilters';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import * as STYLES from 'styles/units';

import { IBIFilterOptions } from './components/BILibraryFilters/types';
import {
    BiCard,
    BILibraryFilters,
    BITable,
    CharacterVariant,
    ProductVariant,
    StatusVariant,
} from './components';
import { COLUMNS_LENGTH, DisplayOptions } from './const';
import * as S from './units';
import { groupDataByColumns } from './utils';

export const BILibraryPage = () => {
    const { openModal, closeModal, modalOpened } = useModal();

    const { filters, setFilters, resetFilters, hasActiveFilters, activeFiltersCount } =
        useURLFilters<IBIFilterOptions & { display: DisplayOptions }>({
            defaults: {
                search: '',
                product: ProductVariant.ALL,
                status: StatusVariant.ALL,
                character: CharacterVariant.ALL,
                channel: [],
                display: DisplayOptions.GRID,
            },
            debounceKeys: ['search'],
            nonFilterKeys: ['display'],
            parsers: {
                product: createNumberOrEnumParser(ProductVariant, ProductVariant.ALL),
                status: createEnumParser(StatusVariant, StatusVariant.ALL),
                character: createEnumParser(CharacterVariant, CharacterVariant.ALL),
                channel: createNumberArrayParser(),
                display: createEnumParser(DisplayOptions, DisplayOptions.GRID),
            },
        });

    const { data: rawBis, isLoading } = useGetBICollectionQuery({
        search: filters.search,
        productId:
            filters.product === ProductVariant.ALL || filters.product === null
                ? undefined
                : filters.product,
        draft:
            filters.status === StatusVariant.ALL
                ? undefined
                : filters.status === StatusVariant.DRAFT
                ? true
                : false,
    });

    const applyClientFilters = (data: typeof rawBis): typeof rawBis => {
        let result = data ?? [];

        if (filters.character !== CharacterVariant.ALL) {
            const isTarget = filters.character === CharacterVariant.TARGET;
            result = result.filter((bi) => bi.target === isTarget);
        }

        if (filters.channel.length > 0) {
            const required = new Set(filters.channel);
            result = result.filter((bi) => {
                const biChannels = new Set(bi.channel?.map((c) => c.id) ?? []);
                return [...required].every((id) => biChannels.has(id));
            });
        }

        return result;
    };

    const bis = applyClientFilters(rawBis);

    const columnsCount = modalOpened ? 2 : COLUMNS_LENGTH;
    const dataByColumns = groupDataByColumns(bis ?? [], columnsCount);

    const navigate = useNavigate();

    const handleCreateBiClick = () => {
        navigate(`${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`);
    };

    const handleResetClick = () => {
        resetFilters();
        closeModal();
    };

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.TitleWrapper>
                    <STYLES.H4>Библиотека BI</STYLES.H4>
                    <Button variant="contained" size="medium" onClick={() => handleCreateBiClick()}>
                        Создать BI
                    </Button>
                </S.TitleWrapper>

                <S.FiltersContainer columns={columnsCount}>
                    <Search
                        fullWidth
                        placeholder="Название или ID BI"
                        value={filters.search}
                        onChange={(e) => setFilters({ search: e.target.value })}
                        onClear={() => setFilters({ search: '' })}
                    />

                    {columnsCount === 2 ? (
                        <S.ActionsContainer>
                            <S.ButtonContainer>
                                <Counter
                                    size="small"
                                    count={
                                        activeFiltersCount && activeFiltersCount > 0
                                            ? activeFiltersCount
                                            : null
                                    }
                                >
                                    <Button
                                        startIcon={<Icon iconName={Icons.Filter} />}
                                        size="medium"
                                        onClick={openModal}
                                    >
                                        Фильтры
                                    </Button>
                                </Counter>
                                <Button
                                    disabled={!hasActiveFilters}
                                    size="medium"
                                    variant="plain"
                                    onClick={handleResetClick}
                                >
                                    Сбросить
                                </Button>
                            </S.ButtonContainer>
                            <ButtonGroup
                                alwaysSelected
                                selectedOption={{ id: filters.display }}
                                options={[
                                    {
                                        startIcon: <Icon iconName={Icons.Grid} />,
                                        id: DisplayOptions.GRID,
                                    },
                                    {
                                        startIcon: <Icon iconName={Icons.TableColumns} />,
                                        id: DisplayOptions.TABLE,
                                    },
                                ]}
                                type="secondary"
                                onChange={(option) =>
                                    setFilters({ display: option.id as DisplayOptions })
                                }
                            />
                        </S.ActionsContainer>
                    ) : (
                        <>
                            <S.ButtonContainer>
                                <Counter
                                    size="small"
                                    count={
                                        activeFiltersCount && activeFiltersCount > 0
                                            ? activeFiltersCount
                                            : null
                                    }
                                >
                                    <Button
                                        startIcon={<Icon iconName={Icons.Filter} />}
                                        size="medium"
                                        onClick={openModal}
                                    >
                                        Фильтры
                                    </Button>
                                </Counter>
                                <Button
                                    disabled={!hasActiveFilters}
                                    size="medium"
                                    variant="plain"
                                    onClick={handleResetClick}
                                >
                                    Сбросить
                                </Button>
                            </S.ButtonContainer>
                            <S.ToggleContainer>
                                <ButtonGroup
                                    alwaysSelected
                                    selectedOption={{ id: filters.display }}
                                    options={[
                                        {
                                            startIcon: <Icon iconName={Icons.Grid} />,
                                            id: DisplayOptions.GRID,
                                        },
                                        {
                                            startIcon: <Icon iconName={Icons.TableColumns} />,
                                            id: DisplayOptions.TABLE,
                                        },
                                    ]}
                                    type="secondary"
                                    onChange={(option) =>
                                        setFilters({ display: option.id as DisplayOptions })
                                    }
                                />
                            </S.ToggleContainer>
                        </>
                    )}
                </S.FiltersContainer>

                {isLoading ? (
                    filters.display === DisplayOptions.GRID ? (
                        <S.CardContainer columns={columnsCount}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} height={150} />
                            ))}
                        </S.CardContainer>
                    ) : (
                        <S.CardContainer columns={columnsCount}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} height={150} />
                            ))}
                        </S.CardContainer>
                    )
                ) : bis && bis.length > 0 ? (
                    filters.display === DisplayOptions.GRID ? (
                        <S.CardContainer columns={columnsCount}>
                            {Array.from({ length: columnsCount }).map((_, i) => (
                                <S.CardColumn key={i}>
                                    {dataByColumns[i].map((bi) => (
                                        <BiCard key={bi.id} bi={bi} />
                                    ))}
                                </S.CardColumn>
                            ))}
                        </S.CardContainer>
                    ) : (
                        <BITable data={bis} />
                    )
                ) : bis && bis.length === 0 ? (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Нет результатов, подходящих под параметры поиска"
                            text="Попробуйте изменить поисковой запрос"
                        />
                    </S.NotFoundContainer>
                ) : null}
            </S.ContentWrapper>
            {modalOpened && (
                <BILibraryFilters
                    filterOptions={filters}
                    setFilterOptions={setFilters}
                    onClose={closeModal}
                    resetFilters={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />
            )}
        </S.PageWrapper>
    );
};
