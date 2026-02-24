import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Counter, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { CJLibraryStatus } from 'api/cj/types';
import { useGetCJCollectionQuery } from 'api/queries/cj';
import { useDebounce, useModal } from 'hooks';
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
    const [displayOption, setDisplayOption] = useState(DisplayOptions.GRID);
    const {
        openModal: filterOpen,
        closeModal: closeFilter,
        modalOpened: isFilterOpen,
    } = useModal();
    const [filterOptions, setFilterOptions] = useState<ICJFilterOptions>({
        search: '',
        product: ProductVariant.ALL,
        status: CJLibraryStatus.ALL,
        format: FormatVariant.ALL,
        channel: [],
        grafana: false,
    });

    const [search, setSearch] = useState(filterOptions.search);
    const debouncedSearch = useDebounce(search);
    const { modalOpened: createFormOpen, closeModal: closeForm, openModal: formOpen } = useModal();

    const { data: rawCJs, isLoading } = useGetCJCollectionQuery({
        search: '',
        productId:
            filterOptions.product === ProductVariant.ALL || filterOptions.product === null
                ? undefined
                : filterOptions.product,
        sample: filterOptions.status,
    });

    const applyClientFilters = (data: typeof rawCJs): typeof rawCJs => {
        let result = data ?? [];

        if (filterOptions.format === FormatVariant.BPMN) {
            result = result.filter((cj) => cj.bpmn === true);
        } else if (filterOptions.format === FormatVariant.BEEATLAS) {
            result = result.filter((cj) => cj.bpmn !== true);
        }

        if (filterOptions.search.trim() !== '') {
            const term = filterOptions.search.toLowerCase().trim();
            result = result.filter(
                (cj) =>
                    cj.name?.toLowerCase().includes(term) ||
                    cj.uniqueIdent?.toLowerCase().includes(term),
            );
        }
        if (filterOptions.grafana) {
            result = result.filter((cj) => !!cj.dashboardLink);
        }

        return result;
    };

    const CJs = applyClientFilters(rawCJs);
    const columnsCount = isFilterOpen ? 2 : COLUMNS_LENGTH;
    const dataByColumns = groupDataByColumns(CJs ?? [], columnsCount);

    const handleResetClick = () => {
        setSearch('');
        setFilterOptions({
            search: '',
            product: ProductVariant.ALL,
            status: CJLibraryStatus.ALL,
            format: FormatVariant.ALL,
            channel: [],
            grafana: false,
        });
        closeFilter();
    };

    const hasActiveFilters =
        search !== '' ||
        filterOptions.product !== ProductVariant.ALL ||
        filterOptions.status !== CJLibraryStatus.ALL ||
        filterOptions.format !== FormatVariant.ALL ||
        filterOptions.channel.length > 0 ||
        filterOptions.grafana === true;

    const activeFiltersCount = [
        filterOptions.product !== ProductVariant.ALL ? 1 : 0,
        filterOptions.status !== CJLibraryStatus.ALL ? 1 : 0,
        filterOptions.format !== FormatVariant.ALL ? 1 : 0,
        filterOptions.channel.length > 0 ? 1 : 0,
        filterOptions.grafana ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    useEffect(() => {
        setFilterOptions({ ...filterOptions, search: debouncedSearch });
    }, [debouncedSearch]);

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
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
                                selectedOption={{ id: displayOption }}
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
                                onChange={(option) => setDisplayOption(option.id as DisplayOptions)}
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
                                    selectedOption={{ id: displayOption }}
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
                                        setDisplayOption(option.id as DisplayOptions)
                                    }
                                />
                            </S.ToggleContainer>
                        </>
                    )}
                </S.FiltersContainer>

                {isLoading ? (
                    displayOption === DisplayOptions.GRID ? (
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
                    displayOption === DisplayOptions.GRID ? (
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
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                    onClose={closeFilter}
                />
            )}
            <CJCreateForm isOpen={createFormOpen} onClose={closeForm} />
        </S.PageWrapper>
    );
};
