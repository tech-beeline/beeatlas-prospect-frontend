import React from 'react';
import { Button, ButtonGroup, Counter, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { CJLibraryStatus } from 'api/cj/types';
import { useGetCJCollectionQuery } from 'api/queries/cj';
import { useModal } from 'hooks';
import {
    createBooleanParser,
    createEnumParser,
    createNumberArrayParser,
    createNumberOrEnumParser,
    useURLFilters,
} from 'hooks/useURLFilters';
import * as STYLES from 'styles/units';

import {
    CJCard,
    CJCreateForm,
    CJLibraryFilters,
    CJTable,
    FormatVariant,
    ICJFilterOptions,
    ProductVariant,
} from './components';
import { COLUMNS_LENGTH, DisplayOptions } from './const';
import * as S from './units';
import { groupDataByColumns } from './utils';

export const CJLibraryPage = () => {
    const {
        openModal: filterOpen,
        closeModal: closeFilter,
        modalOpened: isFilterOpen,
    } = useModal();

    const { filters, setFilters, resetFilters, hasActiveFilters, activeFiltersCount } =
        useURLFilters<ICJFilterOptions & { display: DisplayOptions }>({
            defaults: {
                search: '',
                product: ProductVariant.ALL,
                status: CJLibraryStatus.ALL,
                format: FormatVariant.ALL,
                channel: [],
                grafana: false,
                display: DisplayOptions.GRID,
            },
            debounceKeys: ['search'],

            parsers: {
                product: createNumberOrEnumParser(ProductVariant, ProductVariant.ALL),
                status: createEnumParser(CJLibraryStatus, CJLibraryStatus.ALL),
                format: createEnumParser(FormatVariant, FormatVariant.ALL),
                channel: createNumberArrayParser(),
                grafana: createBooleanParser(),
                display: createEnumParser(DisplayOptions, DisplayOptions.GRID),
            },
        });

    const { modalOpened: createFormOpen, closeModal: closeForm, openModal: formOpen } = useModal();

    const { data: rawCJs, isLoading } = useGetCJCollectionQuery({
        search: '',
        productId:
            filters.product === ProductVariant.ALL || filters.product === null
                ? undefined
                : filters.product,
        sample: filters.status,
    });

    const applyClientFilters = (data: typeof rawCJs): typeof rawCJs => {
        let result = data ?? [];

        if (filters.format === FormatVariant.BPMN) {
            result = result.filter((cj) => cj.bpmn === true);
        } else if (filters.format === FormatVariant.BEEATLAS) {
            result = result.filter((cj) => cj.bpmn !== true);
        }

        if (filters.search.trim() !== '') {
            const term = filters.search.toLowerCase().trim();
            result = result.filter(
                (cj) =>
                    cj.name?.toLowerCase().includes(term) ||
                    cj.uniqueIdent?.toLowerCase().includes(term),
            );
        }
        if (filters.grafana) {
            result = result.filter((cj) => !!cj.dashboardLink);
        }

        return result;
    };

    const CJs = applyClientFilters(rawCJs);
    const columnsCount = isFilterOpen ? 2 : COLUMNS_LENGTH;
    const dataByColumns = groupDataByColumns(CJs ?? [], columnsCount);

    const handleResetClick = () => {
        resetFilters();
        closeFilter();
    };

    return (
        <S.PageWrapper>
            <S.ContentWrapper>
                <S.TitleWrapper>
                    <STYLES.H4>Библиотека CJ</STYLES.H4>
                    <Button variant="contained" size="medium" onClick={formOpen}>
                        Создать CJ
                    </Button>
                </S.TitleWrapper>

                <S.FiltersContainer columns={columnsCount}>
                    <Search
                        fullWidth
                        placeholder="Название или ID CJ"
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
                                        onClick={filterOpen}
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
                                        onClick={filterOpen}
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
                ) : CJs && CJs.length > 0 ? (
                    filters.display === DisplayOptions.GRID ? (
                        <S.CardContainer columns={columnsCount}>
                            {Array.from({ length: columnsCount }).map((_, i) => (
                                <S.CardColumn key={i}>
                                    {dataByColumns[i].map((cj) => (
                                        <CJCard key={cj.id} cj={cj} />
                                    ))}
                                </S.CardColumn>
                            ))}
                        </S.CardContainer>
                    ) : (
                        <CJTable data={CJs} />
                    )
                ) : CJs && CJs.length === 0 ? (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            imageVariant={ImageVariants.EMPTY_BOX}
                            title="Нет результатов, подходящих под параметры поиска"
                            text="Попробуйте изменить поисковой запрос"
                        />
                    </S.NotFoundContainer>
                ) : null}
            </S.ContentWrapper>
            {isFilterOpen && (
                <CJLibraryFilters
                    filterOptions={filters}
                    setFilterOptions={setFilters}
                    onClose={closeFilter}
                    resetFilters={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />
            )}
            <CJCreateForm isOpen={createFormOpen} onClose={closeForm} />
        </S.PageWrapper>
    );
};
