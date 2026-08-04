import React, { FC, useState } from 'react';

import { TooltipContainer } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import {
    Autocomplete,
    Button,
    Icon,
    Select,
    Skeleton,
    Switch,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import type { IProductEmbeddedTech, IProductTechProduct } from 'api/product/types';
import { useGetProductTechnologiesQuery } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { TechnologiesRow } from './components';
import { RING_STATUS_SELECT_OPTIONS, RingStatus } from './const';
import { ITechnologies, TechAutocompleteOption } from './types';
import * as S from './units';
import { filterProductTechnologies } from './utils';

export const Technologies: FC<ITechnologies> = ({ cmdb }) => {
    const [techInput, setTechInput] = useState('');
    const [autocompleteResetKey, setAutocompleteResetKey] = useState(0);
    const [selectedTechOption, setSelectedTechOption] = useState<TechAutocompleteOption | null>(
        null,
    );
    const [ringStatus, setRingStatus] = useState<string>(RingStatus.ALL);
    const [criticalOnly, setCriticalOnly] = useState(false);

    const { data, isLoading } = useGetProductTechnologiesQuery(cmdb);
    const list = (data?.techProducts ?? []).filter(
        (p): p is IProductTechProduct & { tech: IProductEmbeddedTech } => p.tech != null,
    );

    const techAutocompleteOptions: TechAutocompleteOption[] = list
        .filter((p) => p.tech.label.toLowerCase().includes(techInput.trim().toLowerCase()))
        .map((p) => ({ id: p.id, value: p.tech.label }));

    const listForTable = selectedTechOption
        ? list.filter((p) => p.id === selectedTechOption.id)
        : list;
    const filteredList = filterProductTechnologies(listForTable, ringStatus, criticalOnly);

    const hasActiveFilters =
        selectedTechOption !== null || ringStatus !== RingStatus.ALL || criticalOnly;

    return (
        <S.Container>
            <S.ActionsContainer>
                <S.SearchContainer>
                    <Autocomplete
                        key={autocompleteResetKey}
                        fullWidth
                        placeholder="Название технологии"
                        options={techAutocompleteOptions}
                        renderValue={(v) => v.value}
                        type="search"
                        value={selectedTechOption}
                        makeOption={(option) => (
                            <S.AutocompleteOptionRow>
                                <Icon iconName={Icons.Search} size="large" />
                                <span>{option.value}</span>
                            </S.AutocompleteOptionRow>
                        )}
                        onChange={(value) => {
                            setTechInput('');
                            setSelectedTechOption(value);
                        }}
                        onInputChange={(v) => {
                            setTechInput(v);
                            setSelectedTechOption(null);
                        }}
                        onInputClear={() => {
                            setTechInput('');
                            setSelectedTechOption(null);
                        }}
                    />
                </S.SearchContainer>
                <S.SelectContainer>
                    <Select
                        fullWidth
                        label="Статус технологии"
                        options={RING_STATUS_SELECT_OPTIONS}
                        values={ringStatus ? [{ value: ringStatus }] : []}
                        onChange={(options) => {
                            if (options.length > 0) {
                                setRingStatus(options[0].value);
                            } else {
                                setRingStatus(RingStatus.ALL);
                            }
                        }}
                    />
                </S.SelectContainer>
                <S.SwitchContainer>
                    <Switch
                        label="Допустимо КИ"
                        checked={criticalOnly}
                        onChange={(e) => setCriticalOnly(e.target.checked)}
                    />
                    <IconButton
                        data-tooltip-id="critical-switch"
                        iconName={Icons.InfoCircled}
                        size="medium"
                    />
                    <TooltipContainer
                        id="critical-switch"
                        largePadding
                        noArrow
                        offset={6}
                        place="top"
                    >
                        Технологии допустимые для использования в объекте критической инфраструктуры
                    </TooltipContainer>
                </S.SwitchContainer>
                <Button
                    disabled={!hasActiveFilters}
                    size="small"
                    variant="plain"
                    onClick={() => {
                        setTechInput('');
                        setSelectedTechOption(null);
                        setAutocompleteResetKey((k) => k + 1);
                        setRingStatus(RingStatus.ALL);
                        setCriticalOnly(false);
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
                        title="Технологий нет"
                    />
                </S.EmptyStateContainer>
            ) : filteredList.length === 0 ? (
                <S.EmptyStateContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.SEARCH}
                        text="Попробуйте изменить запрос"
                        title="Нет результатов, подходящих под параметры поиска"
                    />
                </S.EmptyStateContainer>
            ) : (
                <S.TableLayout>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Технология</TableHeaderData>
                            <TableHeaderData>Статус технологии</TableHeaderData>
                            <TableHeaderData>Статус критической инфраструктуры</TableHeaderData>
                            <TableHeaderData>Источник</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map((row) => (
                            <TechnologiesRow key={row.id} techProduct={row} />
                        ))}
                    </TableBody>
                </S.TableLayout>
            )}
        </S.Container>
    );
};
