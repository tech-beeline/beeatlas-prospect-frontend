import React, { FC, useState } from 'react';
import { Button, Search, Select } from '@beeline/design-system-react';
import { sendAnalytics } from 'features/analytics';

import { useGetTechradarCategoriesQuery } from 'api/queries/techradar';
import { ITech } from 'api/tech-radar/types';

import { IFilters } from './types';
import * as S from './units';

export const Filters: FC<IFilters> = ({
    search,
    filterValue,
    activeMenuItem,
    filteredItems,
    setSearch,
    setFilterValue,
    setHintText,
    setActiveMenuItem,
    setShowInMenu,
    setActiveRing,
}) => {
    const { data: categoriesData, isLoading } = useGetTechradarCategoriesQuery();

    const [menuOpened, setMenuOpened] = useState(false);

    const handleSearchClear = () => {
        setSearch('');
        setHintText('');
        setActiveMenuItem(0);
    };

    const handleItemClick = (item: ITech) => {
        setActiveRing(null);
        setActiveMenuItem(item.sector.id);
        if (activeMenuItem === item.sector.id) {
            setShowInMenu(true);
            setHintText(item.label);
        } else {
            // После зума, есди item находится в другом секторе
            setTimeout(() => {
                setShowInMenu(true);
                setHintText(item.label);
            }, 450);
        }
    };

    const handleClearClick = () => {
        handleSearchClear();
        setFilterValue(null);
    };

    const filterOptions = (categoriesData ?? []).map((category) => ({
        id: category.id,
        value: category.name,
    }));

    const selectedFilterValue = filterOptions.find((option) => option.value === filterValue);

    return (
        <S.FilterContainer>
            <S.SearchContainer>
                <Search
                    placeholder="Поиск"
                    size="small"
                    maxLength={50}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setHintText('');
                    }}
                    onFocus={() => {
                        setMenuOpened(true);
                        sendAnalytics(['techradar', 'searchFocus']);
                    }}
                    onBlur={() => setMenuOpened(false)}
                    onClear={handleSearchClear}
                />
                {menuOpened && search.length >= 3 && filteredItems.length > 0 && (
                    <S.MenuBlock>
                        {filteredItems.map((item, i) => (
                            <S.MenuItem key={i} onMouseDown={() => handleItemClick(item)}>
                                {item.label}
                            </S.MenuItem>
                        ))}
                    </S.MenuBlock>
                )}
            </S.SearchContainer>
            <S.SelectContainer>
                <Select
                    fullWidth
                    size="small"
                    placeholder="Фильтрация по группам"
                    options={filterOptions}
                    disabled={isLoading}
                    values={selectedFilterValue ? [selectedFilterValue] : []}
                    onChange={(options) => {
                        setFilterValue(options[0].value);
                        sendAnalytics(['techradar', 'group', options[0].value]);
                    }}
                />
            </S.SelectContainer>
            <Button
                disabled={!search && !filterValue}
                size="small"
                variant="plain"
                onClick={handleClearClick}
            >
                Сбросить
            </Button>
        </S.FilterContainer>
    );
};
