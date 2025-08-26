import React, { FC, useRef, useState } from 'react';
import { Chip, Icon, Search, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { CHIPS, SearchVariants } from './const';
import { IImpactSearch } from './types';
import * as S from './units';

export const ImpactSearch: FC<IImpactSearch> = ({ isLoading, setIsSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchVariant, setSearchVariant] = useState(SearchVariants.APP);
    const [search, setSearch] = useState('');

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useOutsideClick(dropdownRef, isOpen, setIsOpen, searchRef);

    const handleCardClick = () => {
        setIsSelected(true);
        setSearch('Ensemble');
        setIsOpen(false);
    };

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
                    {!isLoading && (
                        <S.CardsContainer>
                            <S.SearchCard onClick={handleCardClick}>
                                <Icon iconName={Icons.Search} size="large" />
                                <Text variant="body2">Ensemble</Text>
                            </S.SearchCard>
                            <S.SearchCard onClick={handleCardClick}>
                                <Icon iconName={Icons.Search} size="large" />
                                <Text variant="body2">
                                    Ensemble-dev.apps.yd-m6-kt22.vimpelcom.ru
                                </Text>
                            </S.SearchCard>
                        </S.CardsContainer>
                    )}
                </S.Dropdown>
            )}
        </S.Container>
    );
};
