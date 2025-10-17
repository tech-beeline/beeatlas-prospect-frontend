import React, { FC, useState } from 'react';
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

import { useGetSystemE2EQuery, useGetSystemTCQuery } from 'api/queries/product';

import { E2EProcessRow } from './components';
import { CHIPS, TableVariant } from './const';
import { IE2ETCTable } from './types';
import * as S from './units';

export const E2ETCTable: FC<IE2ETCTable> = ({ cmdb }) => {
    const [tableVariant, setTableVariant] = useState(TableVariant.E2E);
    const { data: e2eData } = useGetSystemE2EQuery(cmdb);
    const { data: tcData } = useGetSystemTCQuery(cmdb);

    const tcDataJoined = tcData ? [...tcData.responsibility, ...tcData.implemented] : [];
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
                {tableVariant === TableVariant.E2E && e2eData && (
                    <>
                        {e2eData.map((e2e, i) => (
                            <E2EProcessRow e2e={e2e} cmdb={cmdb} key={i} />
                        ))}
                    </>
                )}
                {tableVariant === TableVariant.TC && (
                    <>
                        {tcDataJoined.map((tc) => (
                            <TableRow key={tc.id}>
                                <TableData>
                                    <Link
                                        title={tc.code}
                                        url={`/models/fdm?id=${tc.id}&type=TECH`}
                                    />
                                </TableData>
                                <TableData>{tc.name}</TableData>
                            </TableRow>
                        ))}
                    </>
                )}
            </TableBody>
        </Table>
    );
};
