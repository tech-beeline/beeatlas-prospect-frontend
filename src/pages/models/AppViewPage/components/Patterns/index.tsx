import React, { FC, useState } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Autocomplete,
    Button,
    Icon,
    Select,
    Skeleton,
    TableBody,
    TableHead,
    TableRow,
} from 'components/ui';

import { useGetProductPatternsQuery } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { PatternsRow } from './components';
import { PatternType, PatternTypeValue } from './const';
import { IPatterns, PatternAutocompleteOption } from './types';
import * as S from './units';
import { filterProductPatterns } from './utils';

export const Patterns: FC<IPatterns> = ({ cmdb }) => {
    const [patternInput, setPatternInput] = useState('');
    const [autocompleteResetKey, setAutocompleteResetKey] = useState(0);
    const [selectedPatternOption, setSelectedPatternOption] =
        useState<PatternAutocompleteOption | null>(null);
    const [patternType, setPatternType] = useState<PatternTypeValue | null>(PatternType.ALL);

    const { data: patterns, isLoading } = useGetProductPatternsQuery(cmdb);

    const list = patterns ?? [];

    const patternAutocompleteOptions: PatternAutocompleteOption[] = list
        .filter((p) => {
            const q = patternInput.trim().toLowerCase();
            if (!q) {
                return true;
            }
            return (
                p.name.toLowerCase().includes(q) ||
                p.technologies.some((t) => t.label.toLowerCase().includes(q))
            );
        })
        .map((p) => ({ id: p.id, value: p.name }));

    const listForTable = selectedPatternOption
        ? list.filter((p) => p.id === selectedPatternOption.id)
        : list;
    const filteredPatterns = filterProductPatterns(listForTable, '', patternType);

    const hasActiveFilters =
        selectedPatternOption !== null || (patternType !== null && patternType !== PatternType.ALL);

    return (
        <S.Container>
            <S.ActionsContainer>
                <S.SearchContainer>
                    <Autocomplete
                        key={autocompleteResetKey}
                        fullWidth
                        placeholder="Название паттерна или технологии"
                        options={patternAutocompleteOptions}
                        renderValue={(v) => v.value}
                        type="search"
                        value={selectedPatternOption}
                        makeOption={(option) => (
                            <S.AutocompleteOptionRow>
                                <Icon iconName={Icons.Search} size="large" />
                                <span>{option.value}</span>
                            </S.AutocompleteOptionRow>
                        )}
                        onChange={(value) => {
                            setPatternInput('');
                            setSelectedPatternOption(value);
                        }}
                        onInputChange={(v) => {
                            setPatternInput(v);
                            setSelectedPatternOption(null);
                        }}
                        onInputClear={() => {
                            setPatternInput('');
                            setSelectedPatternOption(null);
                        }}
                    />
                </S.SearchContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        label="Тип паттерна"
                        options={[
                            {
                                value: PatternType.ALL,
                            },
                            {
                                value: PatternType.PATTERN,
                            },
                            {
                                value: PatternType.ANTIPATTERN,
                            },
                        ]}
                        values={patternType ? [{ value: patternType }] : []}
                        onChange={(options) => {
                            if (options.length > 0) {
                                setPatternType(options[0].value);
                            } else {
                                setPatternType(null);
                            }
                        }}
                    />
                </S.SelectContainer>
                <Button
                    disabled={!hasActiveFilters}
                    size="small"
                    variant="plain"
                    onClick={() => {
                        setPatternInput('');
                        setSelectedPatternOption(null);
                        setAutocompleteResetKey((k) => k + 1);
                        setPatternType(PatternType.ALL);
                    }}
                >
                    Сбросить
                </Button>
            </S.ActionsContainer>
            {isLoading ? (
                <Skeleton height={300} radius={4} />
            ) : list.length === 0 ? (
                <S.EmptyStateContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text={null}
                        title="Паттернов нет"
                    />
                </S.EmptyStateContainer>
            ) : filteredPatterns.length === 0 ? (
                <S.EmptyStateContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        text="Попробуйте изменить запрос"
                        title="Нет результатов, подходящих под параметры поиска"
                    />
                </S.EmptyStateContainer>
            ) : (
                <S.PatternsTable>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataMaxWidth>Паттерн</S.TableHeaderDataMaxWidth>
                            <S.TypeColumnHeader>Тип</S.TypeColumnHeader>
                            <S.TechnologiesColumnHeader>Технологии</S.TechnologiesColumnHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPatterns.map((pattern) => (
                            <PatternsRow key={pattern.id} pattern={pattern} />
                        ))}
                    </TableBody>
                </S.PatternsTable>
            )}
        </S.Container>
    );
};
