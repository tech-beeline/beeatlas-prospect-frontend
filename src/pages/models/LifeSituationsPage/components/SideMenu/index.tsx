import React, { FC, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { Button, Search, Skeleton } from 'components/ui';

import { useGetAllChaptersQuery } from 'api/queries/product';
import * as R from 'router/const';

import { LifeSituationItem } from './LifeSituationItem';
import { ISearchItem, ISideMenu, SearchItemType } from './types';
import * as S from './units';
import { createSearchResults, filterSearchResults } from './utils';

export const SideMenu: FC<ISideMenu> = ({ activeItem, isAdmin }) => {
    const [searchText, setSearchText] = useState('');
    const [menuOpened, setMenuOpened] = useState(false);
    const [, setSearchParams] = useSearchParams();

    const { data, isLoading } = useGetAllChaptersQuery();

    const flatRows = useMemo(() => (data ? createSearchResults(data) : []), [data]);

    const searchResultsFiltered = useMemo(
        () => filterSearchResults(flatRows, searchText),
        [flatRows, searchText],
    );

    const handleSearchResultClick = (row: ISearchItem) => {
        if (row.type === SearchItemType.CHAPTER) {
            setSearchParams(new URLSearchParams({ chapterId: String(row.chapterId) }));
        } else {
            setSearchParams(
                new URLSearchParams({
                    chapterId: String(row.chapterId),
                    nfrId: row.nfrId,
                }),
            );
        }
        setSearchText(row.name);
        setMenuOpened(false);
    };

    const navigate = useNavigate();
    const handleCreateLifeSituationClick = () => {
        navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.ADD_PATH}`);
    };

    const handleCreateNFRClick = () => {
        navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}${R.NFR_PATH}${R.ADD_PATH}`);
    };

    return (
        <S.Container>
            <S.ResizableStyled
                enable={{ right: true }}
                defaultSize={{
                    width: 410,
                    height: 'calc(100vh - 64px)',
                }}
                minWidth={340}
                maxWidth={640}
            >
                <S.FlexContainer>
                    {isAdmin && (
                        <S.ButtonsContainer>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                onClick={handleCreateLifeSituationClick}
                            >
                                Создать ЖС
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                onClick={handleCreateNFRClick}
                            >
                                Создать НФТ
                            </Button>
                        </S.ButtonsContainer>
                    )}
                    <S.SearchContainer>
                        <Search
                            fullWidth
                            size="small"
                            disabled={isLoading}
                            placeholder="Название или код"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onClear={() => setSearchText('')}
                            onFocus={() => setMenuOpened(true)}
                            onBlur={() => setMenuOpened(false)}
                        />
                        {menuOpened && searchText.trim().length >= 1 && !isLoading && (
                            <S.MenuBlock>
                                {searchResultsFiltered.map((row) => (
                                    <S.MenuItem
                                        key={[
                                            row.type,
                                            row.chapterId,
                                            row.type === SearchItemType.NFR ? row.nfrId : '',
                                        ].join('-')}
                                        onMouseDown={() => handleSearchResultClick(row)}
                                    >
                                        <Text variant="body2">{row.name}</Text>
                                        {row.type === SearchItemType.NFR && (
                                            <Text inactive variant="body3">
                                                {row.chapterName}
                                            </Text>
                                        )}
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
                    <S.ItemsContainer>
                        {data &&
                            data.map((chapter) => (
                                <LifeSituationItem
                                    key={chapter.id}
                                    item={chapter}
                                    activeItem={activeItem}
                                />
                            ))}
                        {isLoading &&
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} height={48} radius={12} />
                            ))}
                    </S.ItemsContainer>
                </S.FlexContainer>
            </S.ResizableStyled>
        </S.Container>
    );
};
