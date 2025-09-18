import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Icon, Search, Select } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import { useModal } from 'hooks';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';

import { FilterSideblock, PatternCard } from './components';
import { CHIPS, FilterVariants } from './const';
import { IPatternsPage } from './types';
import * as S from './units';

export const PatternsPage: FC<IPatternsPage> = ({ isAdmin }) => {
    const [search, setSearch] = useState('');
    const [filterVariant, setFilterVariant] = useState(FilterVariants.ALL);

    const [patternToDelete, setPatternToDelete] = useState<string | null>(null);

    const { openModal, closeModal, modalOpened } = useModal();

    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.ADD_PATH}`);
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
                            onChange={(e) => setSearch(e.target.value)}
                            onClear={() => setSearch('')}
                            placeholder="Название или описание паттерна"
                        />
                    </S.SearchContainer>
                    <Select
                        placeholder="Технология"
                        values={[]}
                        options={[]}
                        onChange={() => 1}
                        size="medium"
                    />
                    <Button
                        onClick={openModal}
                        startIcon={<Icon iconName={Icons.Filter} />}
                        size="medium"
                    />
                    <Button variant="plain" size="medium">
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

                <S.CardsContainer>
                    <PatternCard isAdmin={isAdmin} setPatternToDelete={setPatternToDelete} />
                    <PatternCard isAdmin={isAdmin} setPatternToDelete={setPatternToDelete} />
                    <PatternCard isAdmin={isAdmin} setPatternToDelete={setPatternToDelete} />
                    <PatternCard isAdmin={isAdmin} setPatternToDelete={setPatternToDelete} />
                    <PatternCard isAdmin={isAdmin} setPatternToDelete={setPatternToDelete} />
                    <PatternCard isAdmin={isAdmin} setPatternToDelete={setPatternToDelete} />
                </S.CardsContainer>
            </S.Container>
            {modalOpened && <FilterSideblock isAdmin={isAdmin} onClose={closeModal} />}

            <Dialog
                opened={!!patternToDelete}
                title="Удалить паттерн?"
                confirmText="Удалить"
                onClose={() => setPatternToDelete(null)}
                onConfirm={() => setPatternToDelete(null)}
            >
                Паттерн <S.BoldSpan>{patternToDelete}</S.BoldSpan> будет удален
            </Dialog>
        </S.PageWrapper>
    );
};
