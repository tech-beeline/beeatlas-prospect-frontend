import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '@beeline/design-system-react';

import { Text } from 'components/core';

import { IE2ETreeItem } from '../../types';

import { TreeItem } from './components';
import { ISideMenu } from './types';
import * as S from './units';

export const SideMenu: FC<ISideMenu> = ({ activeItem, treeData, flatData }) => {
    const [, setSearchParams] = useSearchParams();
    const [menuOpened, setMenuOpened] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [itemToScroll, setItemToScroll] = useState<IE2ETreeItem | null>(null);

    const searchResultsFiltered = flatData.filter(
        (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.code.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handleSearchResultClick = (item: IE2ETreeItem) => {
        setSearchParams(
            new URLSearchParams({
                id: String(item.code),
                type: item.type,
            }),
        );
        setSearchText(item.title);
        setMenuOpened(false);
        setItemToScroll(item);
    };

    return (
        <S.SideMenuContainer>
            <S.ResizableStyled
                enable={{ right: true }}
                defaultSize={{
                    width: 410,
                    height: 'calc(100vh - 64px)',
                }}
                minWidth={340}
                maxWidth={640}
            >
                <S.SearchContainer>
                    <Search
                        fullWidth
                        size="small"
                        placeholder="Название или код"
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
                <S.TreeContainer>
                    {treeData.map((item) => (
                        <TreeItem
                            key={item.code}
                            item={item}
                            level={0}
                            activeItem={activeItem}
                            itemToScroll={itemToScroll}
                            setItemToScroll={setItemToScroll}
                        />
                    ))}
                </S.TreeContainer>
            </S.ResizableStyled>
        </S.SideMenuContainer>
    );
};
