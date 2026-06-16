import React, { FC } from 'react';

import { TableHeaderData } from 'components/ui';
import { TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { ICypherTable } from './types';
import * as S from './units';
import { formatCellValue, getColumns } from './utils';

export const CypherTable: FC<ICypherTable> = ({ data }) => {
    const columns = getColumns(data);

    return (
        <S.DataTable>
            <TableHead>
                <TableRow>
                    <TableHeaderData>№</TableHeaderData>
                    {columns.map((col) => (
                        <TableHeaderData key={col}>{col}</TableHeaderData>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, i) => (
                    <TableRow key={i}>
                        <TableData>{i + 1}</TableData>
                        {columns.map((col) => (
                            <TableData key={col}>{formatCellValue(row[col])}</TableData>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </S.DataTable>
    );
};
