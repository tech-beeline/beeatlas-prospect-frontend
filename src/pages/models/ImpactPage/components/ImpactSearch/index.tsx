import React, { FC, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Chip, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { ISearchSystem } from 'api/graph/types';
import { useGetSearchSystemsQuery } from 'api/queries/graph';
import { useDebounce } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { CHIPS, SearchVariants } from './const';
import { IImpactSearch } from './types';
import * as S from './units';

export const ImpactSearch: FC<IImpactSearch> = () => {
    const [, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [searchVariant, setSearchVariant] = useState(SearchVariants.SYSTEM);
    const [search, setSearch] = useState('');
    const searchDebounced = useDebounce(search);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useOutsideClick(dropdownRef, isOpen, setIsOpen, searchRef);

    const handleCardClick = (system: ISearchSystem) => {
        setSearchParams({ name: system.name, cmdb: system.cmdb });
        setSearch(system.name);
        setIsOpen(false);
    };

    const { data, isLoading } = useGetSearchSystemsQuery({
        search: searchDebounced,
        enabled: searchVariant === SearchVariants.SYSTEM,
    });

    return (
        <S.Container>
            <Search
                fullWidth
                ref={searchRef}
                placeholder="Имя/мнемоника приложения CMDB, мнемоника экземплара CMDB, имя сервиса, endpoint или сервера"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onClear={() => setSearch('')}
            />
            {isOpen && (
                <S.Dropdown ref={dropdownRef}>
                    <Text variant="overline">Выбери категорию в которой будем искать</Text>
                    <S.ChipsContainer>
                        {CHIPS.map((chip) => (
                            <Chip
                                key={chip.value}
                                label={chip.label}
                                active={searchVariant === chip.value}
                                onClick={() => setSearchVariant(chip.value)}
                            />
                        ))}
                    </S.ChipsContainer>
                    {isLoading && (
                        <S.SkeletonContainer>
                            <Skeleton radius={12} height={40} />
                            <Skeleton radius={12} height={40} />
                        </S.SkeletonContainer>
                    )}
                    {data && searchVariant === SearchVariants.SYSTEM && (
                        <S.CardsContainer>
                            {data.map((system) => (
                                <S.SearchCard
                                    key={system.cmdb}
                                    onClick={() => handleCardClick(system)}
                                >
                                    <Icon iconName={Icons.Search} size="large" />
                                    <Text variant="body2">{system.name}</Text>
                                </S.SearchCard>
                            ))}
                        </S.CardsContainer>
                    )}
                </S.Dropdown>
            )}
        </S.Container>
    );
};
