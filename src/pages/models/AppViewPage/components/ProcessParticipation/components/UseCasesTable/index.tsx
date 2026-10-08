import React, { FC, useMemo } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useGetProductMapicInterfacesByCmdbQuery } from 'api/queries/product';
import { useGetUsecasesByOperationsQuery } from 'api/queries/usecase';
import { formatNullableString } from 'utils/formatters';

import { filterParticipationRows } from '../../utils';
import { ParticipationRow } from '../ParticipationRow';
import { TechCapabilityCell } from '../TechCapabilityCell';

import { USECASE_INTERFACE_SOURCE, usecaseMethodStatusBadge } from './const';
import { IUseCasesTable } from './types';
import {
    buildUsecaseRows,
    formatUsecaseMethod,
    getUsecaseMethodSearchValues,
    getUsecaseMethodStatus,
    getUsecaseOperations,
} from './utils';

export const UseCasesTable: FC<IUseCasesTable> = ({ cmdb, search }) => {
    const { data: interfaces = [], isLoading: isInterfacesLoading } =
        useGetProductMapicInterfacesByCmdbQuery(cmdb, USECASE_INTERFACE_SOURCE);
    const operations = useMemo(() => getUsecaseOperations(interfaces), [interfaces]);
    const operationIds = useMemo(() => [...operations.keys()].sort((a, b) => a - b), [operations]);
    const { data: groups = [], isLoading: isGroupsLoading } =
        useGetUsecasesByOperationsQuery(operationIds);
    const rows = useMemo(
        () =>
            filterParticipationRows(
                buildUsecaseRows(groups, operations),
                search,
                getUsecaseMethodSearchValues,
            ),
        [groups, operations, search],
    );

    if (isInterfacesLoading || (operationIds.length > 0 && isGroupsLoading)) {
        return <Skeleton radius={12} height={200} />;
    }

    if (rows.length === 0) {
        return (
            <NotFoundBlock
                imageVariant={ImageVariants.EMPTY_BOX}
                title={search ? 'Ничего не найдено' : 'Нет Use Case'}
            />
        );
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderData>Use Case</TableHeaderData>
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
                                    <TableHeaderData>Описание</TableHeaderData>
                                    <TableHeaderData>Техническая возможность</TableHeaderData>
                                    <TableHeaderData>C4 Dynamic</TableHeaderData>
                                    <TableHeaderData>Статус метода</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.methods.map((method) => {
                                    const status =
                                        usecaseMethodStatusBadge[getUsecaseMethodStatus(method)];
                                    return (
                                        <TableRow key={method.id}>
                                            <TableData>{formatUsecaseMethod(method)}</TableData>
                                            <TableData>
                                                {formatNullableString(method.description)}
                                            </TableData>
                                            <TableData>
                                                <TechCapabilityCell
                                                    techCapability={method.techCapability}
                                                />
                                            </TableData>
                                            <TableData>{formatNullableString(null)}</TableData>
                                            <TableData>
                                                <Badge semantic={status.semantic}>
                                                    {status.label}
                                                </Badge>
                                            </TableData>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </ParticipationRow>
                ))}
            </TableBody>
        </Table>
    );
};
