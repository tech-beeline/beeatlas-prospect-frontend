import React, { FC, useState } from 'react';
import { uniqBy } from 'lodash';

import { ImageVariants, Link, NotFoundBlock } from 'components/other';
import { TableHeaderData } from 'components/ui';
import { Chip, Skeleton, Table, TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { useGetSystemE2EQuery, useGetSystemTCQuery } from 'api/queries/product';

import { E2EProcessRow } from './components';
import { CHIPS, TableVariant } from './const';
import { IE2ETCTable } from './types';
import * as S from './units';
import { reduceE2EData } from './utils';

export const E2ETCTable: FC<IE2ETCTable> = ({ cmdb }) => {
    const [tableVariant, setTableVariant] = useState(
        window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND ? TableVariant.TC : TableVariant.E2E,
    );
    const { data: e2eData, isLoading: isLoadingE2EData } = useGetSystemE2EQuery(encodeURI(cmdb));
    const e2eDataReduced = reduceE2EData(e2eData);

    const { data: tcData, isLoading: isLoadingTCData } = useGetSystemTCQuery(encodeURI(cmdb));

    const isLoading = isLoadingE2EData || isLoadingTCData;

    const tcDataJoined = tcData
        ? uniqBy([...tcData.responsibility, ...tcData.implemented], 'id')
        : [];
    return (
        <>
            {isLoading && <Skeleton height={50} radius={12} />}

            {(window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND || e2eData) && tcData && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableData colSpan={5}>
                                <S.FlexContainer>
                                    {CHIPS.filter(
                                        (c) =>
                                            !(
                                                c.value === TableVariant.E2E &&
                                                window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND
                                            ),
                                    ).map((chip) => (
                                        <Chip
                                            key={chip.value}
                                            label={chip.label}
                                            active={tableVariant === chip.value}
                                            onClick={() => setTableVariant(chip.value)}
                                        />
                                    ))}
                                </S.FlexContainer>
                            </TableData>
                        </TableRow>
                        {tableVariant === TableVariant.TC &&
                            tcDataJoined &&
                            tcDataJoined.length !== 0 && (
                                <TableRow>
                                    <TableHeaderData>№</TableHeaderData>
                                    <TableHeaderData>Название</TableHeaderData>
                                </TableRow>
                            )}
                    </TableHead>
                    <TableBody>
                        {tableVariant === TableVariant.E2E && e2eDataReduced && (
                            <>
                                {e2eDataReduced.map((e2e, i) => (
                                    <E2EProcessRow e2e={e2e} cmdb={cmdb} key={i} />
                                ))}
                                {e2eDataReduced.length === 0 && (
                                    <TableRow>
                                        <S.TableDataMaxWidth>
                                            <NotFoundBlock
                                                smallImage
                                                setMinSize={false}
                                                imageVariant={ImageVariants.EMPTY_BOX}
                                                text="Нет связанных E2E процессов"
                                            />
                                        </S.TableDataMaxWidth>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {tableVariant === TableVariant.TC && (
                            <>
                                {tcDataJoined.map((tc) => (
                                    <TableRow key={tc.id}>
                                        <TableData>
                                            <Link
                                                title={tc.code}
                                                url={`/models/fdm?id=${tc.id}&type=TECH`}
                                            />
                                        </TableData>
                                        <TableData>{tc.name}</TableData>
                                    </TableRow>
                                ))}
                                {tcDataJoined.length === 0 && (
                                    <TableRow>
                                        <S.TableDataMaxWidth>
                                            <NotFoundBlock
                                                smallImage
                                                setMinSize={false}
                                                imageVariant={ImageVariants.EMPTY_BOX}
                                                text="Нет связанных технических возможностей"
                                            />
                                        </S.TableDataMaxWidth>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            )}
        </>
    );
};
