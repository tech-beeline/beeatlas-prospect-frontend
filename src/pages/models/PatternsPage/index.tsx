import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Chip,
    Counter,
    Icon,
    Search,
    Select,
    Skeleton,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';

import { IPattern } from 'api/patterns/types';
import { useDeletePatternMutation, useGetPatternsQuery } from 'api/queries/patterns';
import { useGetAllTechnologiesQuery } from 'api/queries/technologies';
import { useDebounce, useModal } from 'hooks';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';

import { FilterSideblock, PatternCard } from './components';
import { CHIPS, FilterVariants } from './const';
import { IPatternsPage } from './types';
import * as S from './units';
import { filterPatterns } from './utils';

export const PatternsPage: FC<IPatternsPage> = ({ isAdmin }) => {
    const [search, setSearch] = useState('');
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);
    const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
    const [patternToDelete, setPatternToDelete] = useState<IPattern | null>(null);

    const { openModal, closeModal, modalOpened } = useModal();
    const debouncedSearch = useDebounce(search.trim());

    const navigate = useNavigate();
    const handleCreateClick = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`);
    };

    const { mutate: deletePattern } = useDeletePatternMutation();
    const { data: technologies } = useGetAllTechnologiesQuery();
    const { data, isLoading } = useGetPatternsQuery();

    const technologiesOptions = (technologies ?? []).map((tech) => ({
        id: String(tech.id),
        value: tech.label,
    }));

    const selectedTechnologiesOptions = technologiesOptions.filter((option) =>
        selectedTechnology.includes(option.id),
    );

    const filteredData = data
        ? filterPatterns(data, debouncedSearch, filterVariant, selectedTechnology, selectedGroups)
        : data;

    const handleResetFilters = () => {
        setSearch('');
        setFilterVariant(FilterVariants.ALL);
        setSelectedTechnology([]);
        setSelectedGroups([]);
        closeModal();
    };

    const hasActiveFilters =
        search.trim() !== '' ||
        filterVariant !== FilterVariants.ALL ||
        selectedTechnology.length > 0 ||
        selectedGroups.length > 0;

    const handleDeleteConfirm = async () => {
        if (!patternToDelete) return;

        await deletePattern(patternToDelete.id);
        setPatternToDelete(null);
    };
    return (
        <S.PageWrapper>
            <S.Container>
                <S.TitleContainer>
                    <Text variant="h4">Каталог паттернов/антипаттернов</Text>
                    <Button onClick={handleCreateClick} variant="contained" size="small">
                        Создать паттерн
                    </Button>
                </S.TitleContainer>

                <S.ControlsContainer>
                    <S.SearchContainer>
                        <Search
                            fullWidth
                            value={search}
                            maxLength={50}
                            onChange={(e) => setSearch(e.target.value)}
                            onClear={() => setSearch('')}
                            placeholder="Название или описание паттерна"
                        />
                    </S.SearchContainer>
                    <Select
                        placeholder="Технология"
                        multiple
                        values={selectedTechnologiesOptions}
                        options={technologiesOptions}
                        disabled={isLoading}
                        onChange={(options) => {
                            if (!options || options.length === 0) {
                                setSelectedTechnology([]);
                                return;
                            }
                            setSelectedTechnology(options.map((opt) => opt.id));
                        }}
                        size="medium"
                    />
                    <Counter
                        count={selectedGroups.length > 0 ? selectedGroups.length : null}
                        size="small"
                    >
                        <Button
                            onClick={openModal}
                            startIcon={<Icon iconName={Icons.Filter} />}
                            size="medium"
                        >
                            Категории
                        </Button>
                    </Counter>
                    <Button
                        variant="plain"
                        size="medium"
                        onClick={handleResetFilters}
                        disabled={!hasActiveFilters}
                    >
                        Сбросить
                    </Button>
                </S.ControlsContainer>

                <S.ChipsContainer>
                    {CHIPS.map((chip) => (
                        <Chip
                            key={chip.value}
                            label={chip.label}
                            active={filterVariant === chip.value}
                            onClick={() => setFilterVariant(chip.value)}
                        />
                    ))}
                </S.ChipsContainer>
                {!isLoading && filteredData && filteredData.length === 0 && (
                    <S.NotFoundContainer>
                        <NotFoundBlock
                            title="По заданным фильтрам ничего не найдено"
                            text="Попробуйте изменить запрос"
                            imageVariant={ImageVariants.EMPTY_BOX}
                        />
                    </S.NotFoundContainer>
                )}

                <S.CardsContainer>
                    {isLoading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} height={200} radius={12} />
                        ))}

                    {!isLoading &&
                        filteredData &&
                        filteredData.length > 0 &&
                        filteredData.map((pattern) => (
                            <PatternCard
                                key={pattern.id}
                                isAdmin={isAdmin}
                                pattern={pattern}
                                setPatternToDelete={setPatternToDelete}
                            />
                        ))}
                </S.CardsContainer>
            </S.Container>
            {modalOpened && (
                <FilterSideblock
                    isAdmin={isAdmin}
                    onClose={closeModal}
                    onGroupsChange={setSelectedGroups}
                />
            )}

            <Dialog
                opened={!!patternToDelete}
                title="Удалить паттерн?"
                confirmText="Удалить"
                onClose={() => setPatternToDelete(null)}
                onConfirm={handleDeleteConfirm}
            >
                Паттерн <S.BoldSpan>{patternToDelete?.name}</S.BoldSpan> будет удален
            </Dialog>
        </S.PageWrapper>
    );
};
