import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Checkbox,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { Link } from 'components/other';

import * as R from 'router/const';

import { IHistoryTable } from './types';
import * as S from './units';

export const HistoryTable: FC<IHistoryTable> = ({ capabilityId, capabilityType }) => {
    const [selectedVersionIds, setSelectedVertsionIds] = useState<number[]>([]);
    const navigate = useNavigate();

    return (
        <S.Container>
            <div>
                <Button
                    disabled={selectedVersionIds.length !== 2}
                    variant="outlined"
                    fullWidth={false}
                    onClick={() =>
                        navigate(
                            `${R.MODELS_PATH}${R.FDM_PATH}${R.HISTORY_PATH}?id=${capabilityId}&type=${capabilityType}&v=${selectedVersionIds}`,
                        )
                    }
                >
                    Сравнить версии
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderData />
                        <TableHeaderData>Версия</TableHeaderData>
                        <TableHeaderData>Дата</TableHeaderData>
                        <TableHeaderData>Автор</TableHeaderData>
                        <TableHeaderData>Источник</TableHeaderData>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableData>
                            <Checkbox
                                disabled={
                                    selectedVersionIds.length === 2 &&
                                    !selectedVersionIds.includes(1)
                                }
                                checked={selectedVersionIds.includes(1)}
                                onClick={() =>
                                    setSelectedVertsionIds(
                                        selectedVersionIds.includes(1)
                                            ? selectedVersionIds.filter((id) => id !== 1)
                                            : [...selectedVersionIds, 1],
                                    )
                                }
                            />
                        </TableData>
                        <TableData>
                            <Link
                                outer={false}
                                title="Текущая (№10)"
                                url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capabilityId}&type=${capabilityType}&v=1`}
                            />
                        </TableData>
                        <TableData>23.09.2024, 00:00</TableData>
                        <TableData>Крестовоздвиженский Евгений Константинович</TableData>
                        <TableData>Sparx EA</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>
                            <Checkbox
                                disabled={
                                    selectedVersionIds.length === 2 &&
                                    !selectedVersionIds.includes(2)
                                }
                                checked={selectedVersionIds.includes(2)}
                                onClick={() =>
                                    setSelectedVertsionIds(
                                        selectedVersionIds.includes(2)
                                            ? selectedVersionIds.filter((id) => id !== 2)
                                            : [...selectedVersionIds, 2],
                                    )
                                }
                            />
                        </TableData>
                        <TableData>
                            <Link outer={false} title="Версия №9" url={''} />
                        </TableData>
                        <TableData>19.09.2024, 19:00</TableData>
                        <TableData>—</TableData>
                        <TableData>Structurizr</TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>
                            <Checkbox
                                disabled={
                                    selectedVersionIds.length === 2 &&
                                    !selectedVersionIds.includes(3)
                                }
                                checked={selectedVersionIds.includes(3)}
                                onClick={() =>
                                    setSelectedVertsionIds(
                                        selectedVersionIds.includes(3)
                                            ? selectedVersionIds.filter((id) => id !== 3)
                                            : [...selectedVersionIds, 3],
                                    )
                                }
                            />
                        </TableData>
                        <TableData>
                            <Link outer={false} title="Версия №8" url={''} />
                        </TableData>
                        <TableData>19.09.2024, 11:00</TableData>
                        <TableData>—</TableData>
                        <TableData>Structurizr</TableData>
                    </TableRow>
                </TableBody>
            </Table>
        </S.Container>
    );
};
