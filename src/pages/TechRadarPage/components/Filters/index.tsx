import React, { FC, useState } from 'react';
import { Search } from '@beeline/design-system-react';

import { IData } from 'pages/TechRadarPage/types';

import { IFilters } from './types';
import * as S from './units';

export const Filters: FC<IFilters> = ({
    search,
    activeMenuItem,
    filteredItems,
    setSearch,
    setHintText,
    setActiveMenuItem,
    setShowInMenu,
    setActiveRing,
}) => {
    const [menuOpened, setMenuOpened] = useState(false);

    const handleSearchClear = () => {
        setSearch('');
        setHintText('');
        setActiveMenuItem(0);
    };

    const handleItemClick = (item: IData) => {
        setActiveRing(null);
        setActiveMenuItem(item.quadrant + 1);
        if (activeMenuItem === item.quadrant + 1) {
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

    return (
        <S.FilterContainer>
            <Search
                placeholder="Поиск"
                size="small"
                maxLength={50}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setHintText('');
                }}
                onFocus={() => setMenuOpened(true)}
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
        </S.FilterContainer>
    );
};
