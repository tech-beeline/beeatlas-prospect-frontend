import React, { FC } from 'react';

import { TableHeaderData } from 'components/ui';
import { Table, TableBody, TableHead, TableRow } from 'components/ui';

import { IPatternsTable } from './components/types';
import { PatternRow } from './components';

export const PatternsTable: FC<IPatternsTable> = ({ patterns, activeItem }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderData>Паттерн</TableHeaderData>
                </TableRow>
            </TableHead>
            <TableBody>
                {patterns.map((pattern) => (
                    <PatternRow key={pattern.id} pattern={pattern} activeItem={activeItem} />
                ))}
            </TableBody>
        </Table>
    );
};
