import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { Search, Skeleton } from 'components/ui';

import { IStagingSequenceBiStep } from 'api/staging-sequence/types';
import { E2ETreeItemType } from 'pages/models/E2EPage/types';

import { ListItem } from './components';
import { IE2EData } from './types';
import * as S from './units';

export const E2EData: FC<IE2EData> = ({ activeBiStep, biSteps, isLoading }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [menuOpened, setMenuOpened] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [itemToScroll, setItemToScroll] = useState<IStagingSequenceBiStep | null>(null);

    const searchResultsFiltered = biSteps.filter(
        (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.code.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handleSearchResultClick = (item: IStagingSequenceBiStep) => {
        const params = new URLSearchParams(searchParams);
        params.set('id', String(item.code));
        params.set('type', E2ETreeItemType.BI_STEP);
        setSearchParams(params);
        setSearchText(item.name);
        setMenuOpened(false);
        setItemToScroll(item);
    };

    return (
        <>
            <S.FiltersContainer>
                <S.SearchContainer>
                    <Search
                        fullWidth
                        size="small"
                        placeholder="Название E2E"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onClear={() => setSearchText('')}
                        onFocus={() => setMenuOpened(true)}
                        onBlur={() => setMenuOpened(false)}
                    />
                    {menuOpened && searchText.trim().length >= 1 && (
                        <S.MenuBlock>
                            {searchResultsFiltered.map((item, index) => (
                                <S.MenuItem
                                    key={`${item.code}-${index}`}
                                    onMouseDown={() => handleSearchResultClick(item)}
                                >
                                    <Text variant="body2">{item.name}</Text>
                                    <Text inactive variant="body3">
                                        {item.code}
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
                </S.SearchContainer>
            </S.FiltersContainer>
            <S.TreeContainer>
                {isLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} height={48} radius={12} />
                    ))}
                {biSteps.map((item, i) => (
                    <ListItem
                        key={`${i}-${item.code}`}
                        item={item}
                        activeBiStep={activeBiStep}
                        itemToScroll={itemToScroll}
                        setItemToScroll={setItemToScroll}
                    />
                ))}
            </S.TreeContainer>
        </>
    );
};
