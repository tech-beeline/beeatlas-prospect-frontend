import React, { useState } from 'react';
import {
    Autocomplete,
    Button,
    IconButton,
    Select,
    Switch,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';

import { TechnologiesRow } from './components';
import * as S from './units';

export const Technologies = () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    return (
        <>
            <S.Container>
                <S.ActionsContainer>
                    <S.SearchContainer>
                        <Autocomplete
                            fullWidth
                            placeholder="Название технологии"
                            options={[]}
                            renderValue={() => ''}
                            type="search"
                            value={null}
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onChange={() => {}}
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onInputChange={() => {}}
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onInputClear={() => {}}
                        />
                    </S.SearchContainer>
                    <S.SelectContainer>
                        <Select
                            fullWidth
                            label="Статус технологии"
                            options={[
                                {
                                    value: 'Все',
                                },
                            ]}
                            values={selectedValue ? [{ value: selectedValue }] : []}
                            onChange={(options) => {
                                if (options.length > 0) {
                                    setSelectedValue(options[0].value);
                                } else {
                                    setSelectedValue(null);
                                }
                            }}
                        />
                    </S.SelectContainer>
                    <S.SwitchContainer>
                        <Switch label="Допустимо КИ" checked={false} onClick={() => []} />
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
                            Технологии допустимые для использования в объекте критической
                            инфраструктуры
                        </TooltipContainer>
                    </S.SwitchContainer>
                    <Button
                        disabled={true}
                        size="small"
                        variant="plain"
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onClick={() => {}}
                    >
                        Сбросить
                    </Button>
                </S.ActionsContainer>
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
                        {Array.from({ length: 3 }).map((_, i) => (
                            <TechnologiesRow key={i} />
                        ))}
                    </TableBody>
                </S.TableLayout>
            </S.Container>
        </>
    );
};
