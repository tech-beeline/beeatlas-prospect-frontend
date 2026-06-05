import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Link } from 'components/other';
import { TableHeaderData } from 'components/ui';
import {
    Button,
    Checkbox,
    Skeleton,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableRow,
} from 'components/ui';

import { useGetCapabilityVersionsQuery } from 'api/queries/history';
import * as R from 'router/const';

import { formatNullableString } from '../../../../../utils/formatters';
import { TabVariant } from '../../const';

import { IHistoryTable } from './types';
import * as S from './units';

export const HistoryTable: FC<IHistoryTable> = ({
    capabilityId,
    capabilityType,
    setTabVariant,
}) => {
    const [selectedVersionIds, setSelectedVersionIds] = useState<number[]>([]);
    const navigate = useNavigate();

    const { data, isLoading } = useGetCapabilityVersionsQuery(String(capabilityId), capabilityType);

    const handleCompareButtonClick = () => {
        if (data) {
            const selectedVersionIdsSorted = selectedVersionIds.sort((a, b) => b - a);

            const lastVersionId = data[0].version_info.version;

            navigate(
                `${R.MODELS_PATH}${R.FDM_PATH}${
                    R.HISTORY_PATH
                }?id=${capabilityId}&type=${capabilityType}&v=${
                    selectedVersionIdsSorted[0] === lastVersionId
                        ? selectedVersionIdsSorted[1]
                        : selectedVersionIdsSorted
                }`,
            );
        }
    };

    return (
        <S.Container>
            <div>
                <Button
                    disabled={selectedVersionIds.length !== 2}
                    variant="outlined"
                    fullWidth={false}
                    onClick={handleCompareButtonClick}
                >
                    Сравнить версии
                </Button>
            </div>
            {isLoading ? (
                <Skeleton radius={12} height={200} />
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <S.TableHeaderDataStyled />
                            <TableHeaderData>Версия</TableHeaderData>
                            <TableHeaderData>Дата</TableHeaderData>
                            <TableHeaderData>Автор</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((version, i) => (
                                <TableRow key={version.version_info.version}>
                                    <TableData>
                                        <Checkbox
                                            disabled={
                                                selectedVersionIds.length === 2 &&
                                                !selectedVersionIds.includes(
                                                    version.version_info.version,
                                                )
                                            }
                                            checked={selectedVersionIds.includes(
                                                version.version_info.version,
                                            )}
                                            onClick={() =>
                                                setSelectedVersionIds(
                                                    selectedVersionIds.includes(
                                                        version.version_info.version,
                                                    )
                                                        ? selectedVersionIds.filter(
                                                              (id) =>
                                                                  id !==
                                                                  version.version_info.version,
                                                          )
                                                        : [
                                                              ...selectedVersionIds,
                                                              version.version_info.version,
                                                          ],
                                                )
                                            }
                                        />
                                    </TableData>
                                    <TableData>
                                        {i === 0 ? (
                                            <S.CustomLink
                                                onClick={() => setTabVariant(TabVariant.GENERAL)}
                                            >
                                                Текущая (№{version.version_info.version})
                                            </S.CustomLink>
                                        ) : (
                                            <Link
                                                outer={false}
                                                title={`Версия №${version.version_info.version}`}
                                                url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capabilityId}&type=${capabilityType}&v=${version.version_info.version}`}
                                            />
                                        )}
                                    </TableData>
                                    <TableData>
                                        {dayjs(version.version_info.modified_date).format(
                                            'DD.MM.YYYY, HH:mm',
                                        )}
                                    </TableData>
                                    <TableData>
                                        {formatNullableString(version.version_info.author)}
                                    </TableData>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            )}
        </S.Container>
    );
};
