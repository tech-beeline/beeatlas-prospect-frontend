import React, { FC, useMemo, useState } from 'react';

import { AutocompleteControlled } from 'components/interaction';
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

import { ParticipationView, SEARCH_PLACEHOLDERS } from '../../const';
import { IParticipationSearchOption } from '../../types';
import * as S from '../../units';
import { getParticipationSearchOptions } from '../../utils';
import { ParticipationRow } from '../ParticipationRow';
import { ParticipationSearchOption } from '../ParticipationSearchOption';
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

export const UseCasesTable: FC<IUseCasesTable> = ({ cmdb }) => {
    const { data: interfaces = [], isLoading: isInterfacesLoading } =
        useGetProductMapicInterfacesByCmdbQuery(cmdb, USECASE_INTERFACE_SOURCE);
    const operations = useMemo(() => getUsecaseOperations(interfaces), [interfaces]);
    const operationIds = useMemo(() => [...operations.keys()].sort((a, b) => a - b), [operations]);
    const { data: groups = [], isLoading: isGroupsLoading } =
        useGetUsecasesByOperationsQuery(operationIds);
    const rows = useMemo(() => buildUsecaseRows(groups, operations), [groups, operations]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<IParticipationSearchOption | null>(null);
    const options = useMemo(
        () => getParticipationSearchOptions(rows, search, getUsecaseMethodSearchValues),
        [rows, search],
    );

    if (isInterfacesLoading || (operationIds.length > 0 && isGroupsLoading)) {
        return <Skeleton radius={12} height={200} />;
    }

    if (rows.length === 0) {
        return <NotFoundBlock imageVariant={ImageVariants.EMPTY_BOX} title="Нет Use Case" />;
    }

    return (
        <>
            <S.SearchContainer>
                <AutocompleteControlled
                    options={options}
                    emptyText="Нет результатов"
                    renderOption={(option) => <ParticipationSearchOption option={option} />}
                    searchText={search}
                    placeholder={SEARCH_PLACEHOLDERS[ParticipationView.USE_CASE]}
                    setSearchText={(value) => {
                        setSearch(value);
                        setSelected(null);
                    }}
                    onChange={(option) => {
                        setSelected({ ...option });
                        setSearch(option.value);
                    }}
                    onClear={() => {
                        setSearch('');
                        setSelected(null);
                    }}
                />
            </S.SearchContainer>
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
                            selection={selected?.rowKey === row.key ? selected : null}
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
                                    {row.methods.map((method, methodIndex) => {
                                        const status =
                                            usecaseMethodStatusBadge[
                                                getUsecaseMethodStatus(method)
                                            ];
                                        return (
                                            <TableRow
                                                key={method.id}
                                                data-method-index={methodIndex}
                                                selected={
                                                    selected?.rowKey === row.key &&
                                                    selected.methodIndex === methodIndex
                                                }
                                            >
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
        </>
    );
};
