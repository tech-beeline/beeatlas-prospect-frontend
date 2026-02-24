import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Counter, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetBICollectionQuery } from 'api/queries/bi';
import { useDebounce, useModal } from 'hooks';
import * as ROUTER from 'router/const';
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
    const [displayOption, setDisplayOption] = useState(DisplayOptions.GRID);
    const { openModal, closeModal, modalOpened } = useModal();
    const [filterOptions, setFilterOptions] = useState<IBIFilterOptions>({
        search: '',
        product: ProductVariant.ALL,
        status: StatusVariant.ALL,
        character: CharacterVariant.ALL,
        channel: [],
    });
    const [search, setSearch] = useState(filterOptions.search);
    const debouncedSearch = useDebounce(search);

    const { data: rawBis, isLoading } = useGetBICollectionQuery({
        search: filterOptions.search,
        productId:
            filterOptions.product === ProductVariant.ALL || filterOptions.product === null
                ? undefined
                : filterOptions.product,
        draft:
            filterOptions.status === StatusVariant.ALL
                ? undefined
                : filterOptions.status === StatusVariant.DRAFT
                ? true
                : false,
    });

    const applyClientFilters = (data: typeof rawBis): typeof rawBis => {
        let result = data ?? [];

        if (filterOptions.character !== CharacterVariant.ALL) {
            const isTarget = filterOptions.character === CharacterVariant.TARGET;
            result = result.filter((bi) => bi.target === isTarget);
        }

        if (filterOptions.channel.length > 0) {
            const required = new Set(filterOptions.channel);
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
        navigate(`${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`);
    };

    const handleResetClick = () => {
        setSearch('');
        setFilterOptions({
            search: '',
            product: ProductVariant.ALL,
            status: StatusVariant.ALL,
            character: CharacterVariant.ALL,
            channel: [],
        });
        closeModal();
    };

    const hasActiveFilters =
        search !== '' ||
        filterOptions.product !== ProductVariant.ALL ||
        filterOptions.character !== CharacterVariant.ALL ||
        filterOptions.status !== StatusVariant.ALL ||
        filterOptions.channel.length > 0;

    const activeFiltersCount = [
        filterOptions.product !== ProductVariant.ALL ? 1 : 0,
        filterOptions.status !== StatusVariant.ALL ? 1 : 0,
        filterOptions.character !== CharacterVariant.ALL ? 1 : 0,
        filterOptions.channel.length > 0 ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    useEffect(() => {
        setFilterOptions({ ...filterOptions, search: debouncedSearch });
    }, [debouncedSearch]);

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
                ) : bis && bis.length > 0 ? (
                    displayOption === DisplayOptions.GRID ? (
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
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                    onClose={closeModal}
                />
            )}
        </S.PageWrapper>
    );
};
