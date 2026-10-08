import React, { FC, useMemo } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useGetProductE2eStepsQuery } from 'api/queries/product';
import { formatNullableString } from 'utils/formatters';

import { filterParticipationRows } from '../../utils';
import { ParticipationRow } from '../ParticipationRow';
import { TechCapabilityCell } from '../TechCapabilityCell';

import { IE2EStepsTable } from './types';
import { buildE2ERows, formatE2EMethod, getE2EMethodSearchValues } from './utils';

export const E2EStepsTable: FC<IE2EStepsTable> = ({ cmdb, search }) => {
    const { data: steps = [], isLoading } = useGetProductE2eStepsQuery(cmdb);
    const rows = useMemo(
        () => filterParticipationRows(buildE2ERows(steps), search, getE2EMethodSearchValues),
        [steps, search],
    );

    if (isLoading) return <Skeleton radius={12} height={200} />;

    if (rows.length === 0) {
        return (
            <NotFoundBlock
                imageVariant={ImageVariants.EMPTY_BOX}
                title={search ? 'Ничего не найдено' : 'Нет шагов E2E-сценариев'}
            />
        );
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderData>Шаг E2E-сценария</TableHeaderData>
                    <TableHeaderData>Методы</TableHeaderData>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <ParticipationRow
                        key={row.key}
                        title={row.title}
                        code={row.code}
                        url={row.url}
                        methodsCount={row.methods.length}
                        expanded={row.expanded}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Метод</TableHeaderData>
                                    <TableHeaderData>Техническая возможность</TableHeaderData>
                                    <TableHeaderData>C4 Dynamic</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.methods.map((method) => (
                                    <TableRow key={`${method.entityType}-${method.id}`}>
                                        <TableData>{formatE2EMethod(method)}</TableData>
                                        <TableData>
                                            <TechCapabilityCell
                                                techCapability={method.techCapability}
                                            />
                                        </TableData>
                                        <TableData>{formatNullableString(null)}</TableData>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ParticipationRow>
                ))}
            </TableBody>
        </Table>
    );
};
