import React, { useState } from 'react';
import {
    Autocomplete,
    Button,
    Select,
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { PatternsRow } from './components';
import * as S from './units';

export const Patterns = () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    return (
        <S.Container>
            <S.ActionsContainer>
                <S.SearchContainer>
                    <Autocomplete
                        fullWidth
                        placeholder="Название паттерна или технологии"
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
                        label="Тип паттерна"
                        options={[
                            {
                                value: 'Все',
                            },
                            {
                                value: 'Паттерн',
                            },
                            {
                                value: 'Антипаттерн',
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
            <Table>
                <TableHead>
                    <TableRow>
                        <S.TableHeaderDataMaxWidth>Паттерн</S.TableHeaderDataMaxWidth>
                        <TableHeaderData>Тип</TableHeaderData>
                        <TableHeaderData>Технологии</TableHeaderData>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <PatternsRow key={i} />
                    ))}
                </TableBody>
            </Table>
        </S.Container>
    );
};
