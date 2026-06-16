import React, { FC, useState } from 'react';
import { sendAnalytics } from 'features/analytics';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Select } from 'components/ui';
import { Button, Search, Switch } from 'components/ui';

import { useGetTechnologyCategoriesQuery } from 'api/queries/technologies';
import { ITech } from 'api/technologies/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { openTechInLeftMenu } from '../../utils';

import { IFilters } from './types';
import * as S from './units';

export const Filters: FC<IFilters> = ({
    search,
    filterValue,
    criticalValue,
    filteredItems,
    activeMenuItem,
    setHoveredTechId,
    setSearch,
    setFilterValue,
    setCriticalValue,
    setActiveMenuItem,
    setActiveRing,
}) => {
    const { data: categoriesData, isLoading } = useGetTechnologyCategoriesQuery();

    const [menuOpened, setMenuOpened] = useState(false);

    const handleSearchClear = () => {
        setSearch('');
        setActiveMenuItem(0);
    };

    const handleItemClick = (item: ITech) => {
        setActiveRing(null);
        setActiveMenuItem(item.sector.id);
        openTechInLeftMenu(item.id);
        if (activeMenuItem === item.sector.id) {
            setHoveredTechId(item.id);
        } else {
            setTimeout(() => setHoveredTechId(item.id), 450);
        }
    };

    const handleClearClick = () => {
        handleSearchClear();
        setFilterValue(null);
        setCriticalValue(false);
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
            <S.SwitchContainer>
                <Switch
                    label="Допустимо КИ"
                    checked={criticalValue}
                    onClick={() => setCriticalValue(!criticalValue)}
                />
                <IconButton
                    data-tooltip-id="critical-switch"
                    iconName={Icons.InfoCircled}
                    size="medium"
                />
                <TooltipContainer id="critical-switch" largePadding noArrow offset={6} place="top">
                    Технологии допустимые для использования в объекте критической инфраструктуры
                </TooltipContainer>
            </S.SwitchContainer>
            <Button
                disabled={!search && !filterValue && !criticalValue}
                size="small"
                variant="plain"
                onClick={handleClearClick}
            >
                Сбросить
            </Button>
        </S.FilterContainer>
    );
};
