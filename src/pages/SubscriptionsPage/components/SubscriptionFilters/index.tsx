import React, { FC } from 'react';
import { Chip } from '@beeline/design-system-react';

import { CHIPS } from '../../const';

import { ISubscriptionFilters } from './types';
import * as S from './units';

export const SubscriptionFilters: FC<ISubscriptionFilters> = ({
    search,
    setSearch,
    setPage,
    filterVariant,
    setFilterVariant,
}) => {
    return (
        <>
            <S.FiltersContainer>
                <S.SearchStyled
                    placeholder="Поиск"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    onClear={() => {
                        setSearch('');
                        setPage(1);
                    }}
                />
            </S.FiltersContainer>
            <S.ChipsContainer>
                {CHIPS.map((chip) => (
                    <Chip
                        key={chip.value}
                        label={chip.label}
                        active={filterVariant === chip.value}
                        onClick={() => {
                            setFilterVariant(chip.value);
                            setPage(1);
                        }}
                    />
                ))}
            </S.ChipsContainer>
        </>
    );
};
