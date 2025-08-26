import React, { useState } from 'react';
import {
    Chip,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { Link } from 'components/other';

import { E2EProcessRow } from './components';
import { CHIPS, TableVariant } from './const';
import * as S from './units';

export const E2ETCTable = () => {
    const [tableVariant, setTableVariant] = useState(TableVariant.E2E);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableData colSpan={5}>
                        <S.FlexContainer>
                            {CHIPS.map((chip) => (
                                <Chip
                                    key={chip.value}
                                    label={chip.label}
                                    active={tableVariant === chip.value}
                                    onClick={() => setTableVariant(chip.value)}
                                />
                            ))}
                        </S.FlexContainer>
                    </TableData>
                </TableRow>
                {tableVariant === TableVariant.TC && (
                    <TableRow>
                        <TableHeaderData>№</TableHeaderData>
                        <TableHeaderData>Название</TableHeaderData>
                    </TableRow>
                )}
            </TableHead>
            <TableBody>
                {tableVariant === TableVariant.E2E && (
                    <>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <E2EProcessRow key={i} />
                        ))}
                    </>
                )}
                {tableVariant === TableVariant.TC && (
                    <>
                        <TableRow>
                            <TableData>
                                <Link title="UB.001" url="https://beeline.ru" />
                            </TableData>
                            <TableData>Возможность списания мобильной коммерции с ЕБ</TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>
                                <Link title="UB.002" url="https://beeline.ru" />
                            </TableData>
                            <TableData>Возможность получения баланса номера</TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>
                                <Link title="UB.003" url="https://beeline.ru" />
                            </TableData>
                            <TableData>Возможность списания мобильной коммерции с ЕБ</TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>
                                <Link title="UB.004" url="https://beeline.ru" />
                            </TableData>
                            <TableData>Возможность списания мобильной коммерции с ЕБ</TableData>
                        </TableRow>
                    </>
                )}
            </TableBody>
        </Table>
    );
};
