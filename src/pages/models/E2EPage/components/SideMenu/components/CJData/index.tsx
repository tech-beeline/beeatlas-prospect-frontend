import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { Search, Skeleton } from 'components/ui';

import { IE2ETreeItem } from 'pages/models/E2EPage/types';

import { TreeItem } from './components';
import { ICJData } from './types';
import * as S from './units';

export const CJData: FC<ICJData> = ({ activeTreeItem, treeData, flatTreeData, isLoading }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [menuOpened, setMenuOpened] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [itemToScroll, setItemToScroll] = useState<IE2ETreeItem | null>(null);
    // const [cjFilterVariant, setCjFilterVariant] = useState(CJFilterVariants.ALL);

    const searchResultsFiltered = flatTreeData.filter(
        (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.code.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handleSearchResultClick = (item: IE2ETreeItem) => {
        const params = new URLSearchParams(searchParams);
        params.set('id', String(item.code));
        params.set('type', item.type);
        setSearchParams(params);
        setSearchText(item.title);
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
                        placeholder="Название или код cj, bi, bi step"
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
                                    <Text variant="body2">{item.title}</Text>
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

                {/* <S.ChipsContainer>
                    {CHIPS.map((chip) => (
                        <Chip
                            key={chip.value}
                            label={chip.label}
                            active={cjFilterVariant === chip.value}
                            onClick={() => setCjFilterVariant(chip.value)}
                        />
                    ))}
                </S.ChipsContainer> */}
            </S.FiltersContainer>
            <S.TreeContainer>
                {isLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} height={48} radius={12} />
                    ))}
                {treeData.map((item) => (
                    <TreeItem
                        key={item.code}
                        item={item}
                        level={0}
                        activeTreeItem={activeTreeItem}
                        itemToScroll={itemToScroll}
                        setItemToScroll={setItemToScroll}
                    />
                ))}
            </S.TreeContainer>
        </>
    );
};
