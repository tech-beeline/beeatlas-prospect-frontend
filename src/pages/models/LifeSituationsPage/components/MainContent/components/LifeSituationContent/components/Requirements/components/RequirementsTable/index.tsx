import React, { FC } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { RequirementRow } from './components';
import { IRequirementsTable } from './types';

export const RequirementsTable: FC<IRequirementsTable> = ({ nfr, activeItem }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderData>Нефункциональное требование</TableHeaderData>
                    <TableHeaderData>Описание</TableHeaderData>
                    <TableHeaderData>Источник</TableHeaderData>
                    <TableHeaderData>Версия</TableHeaderData>
                </TableRow>
            </TableHead>
            <TableBody>
                {nfr.map((n) => (
                    <RequirementRow key={n.id} nfr={n} activeItem={activeItem} />
                ))}
            </TableBody>
        </Table>
    );
};
