import React, { FC } from 'react';
import {
    Skeleton,
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import dayjs from 'dayjs';

import { Text } from 'components/core';

import { useGetProductFitnessFunctionsByCmdbQuery } from 'api/queries/product';

import { FitnessFunctionRow } from './components';
import { IFitnessFunctions } from './types';
import * as S from './units';

export const FitnessFunctions: FC<IFitnessFunctions> = ({ cmdb }) => {
    const { data, isLoading } = useGetProductFitnessFunctionsByCmdbQuery(cmdb);

    return (
        <S.Container>
            {isLoading && <Skeleton height={200} radius={12} />}
            {data && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData colSpan={4}>
                                <Text variant="subtitle3">
                                    Обновление фитнес-функций по итогам публикации архитектуры от{' '}
                                    {dayjs.utc(data.createdDate).local().format('DD.MM.YYYY')}
                                </Text>
                            </TableHeaderData>
                        </TableRow>
                        <TableRow>
                            <TableHeaderData>Код проверки</TableHeaderData>
                            <TableHeaderData>Описание проверки</TableHeaderData>
                            <TableHeaderData>Методика</TableHeaderData>
                            <TableHeaderData>Результат проверки</TableHeaderData>
                            {/* <TableHeaderData alignRight>Метрика(цель/факт)</TableHeaderData> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.fitnessFunctions
                            .sort((a, b) => a.code.localeCompare(b.code))
                            .map((fitnessFunction) => (
                                <FitnessFunctionRow
                                    fitnessFunction={fitnessFunction}
                                    key={fitnessFunction.id}
                                />
                            ))}
                    </TableBody>
                </Table>
            )}
        </S.Container>
    );
};
