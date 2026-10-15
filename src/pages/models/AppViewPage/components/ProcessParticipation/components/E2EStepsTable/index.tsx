import React, { FC, useMemo, useState } from 'react';

import { AutocompleteControlled } from 'components/interaction';
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

import { ParticipationView, SEARCH_PLACEHOLDERS } from '../../const';
import { IParticipationSearchOption } from '../../types';
import * as S from '../../units';
import { getParticipationSearchOptions } from '../../utils';
import { ParticipationRow } from '../ParticipationRow';
import { ParticipationSearchOption } from '../ParticipationSearchOption';
import { TechCapabilityCell } from '../TechCapabilityCell';

import { IE2EStepsTable } from './types';
import { buildE2ERows, formatE2EMethod, getE2EMethodSearchValues } from './utils';

export const E2EStepsTable: FC<IE2EStepsTable> = ({ cmdb }) => {
    const { data: steps = [], isLoading } = useGetProductE2eStepsQuery(cmdb);
    const rows = useMemo(() => buildE2ERows(steps), [steps]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<IParticipationSearchOption | null>(null);
    const options = useMemo(
        () => getParticipationSearchOptions(rows, search, getE2EMethodSearchValues),
        [rows, search],
    );

    if (isLoading) return <Skeleton radius={12} height={200} />;

    if (rows.length === 0) {
        return (
            <NotFoundBlock imageVariant={ImageVariants.EMPTY_BOX} title="Нет шагов E2E-сценариев" />
        );
    }

    return (
        <>
            <S.SearchContainer>
                <AutocompleteControlled
                    options={options}
                    emptyText="Нет результатов"
                    renderOption={(option) => <ParticipationSearchOption option={option} />}
                    searchText={search}
                    placeholder={SEARCH_PLACEHOLDERS[ParticipationView.E2E]}
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
                            selection={selected?.rowKey === row.key ? selected : null}
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
                                    {row.methods.map((method, methodIndex) => (
                                        <TableRow
                                            key={`${method.entityType}-${method.id}`}
                                            data-method-index={methodIndex}
                                            selected={
                                                selected?.rowKey === row.key &&
                                                selected.methodIndex === methodIndex
                                            }
                                        >
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
        </>
    );
};
