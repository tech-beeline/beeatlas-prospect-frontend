import React, { FC } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

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
