import React from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';

import { Text } from 'components/core';

import { FitnessFunctionRow } from './components';
import * as S from './units';

export const FitnessFunctions = () => {
    return (
        <S.Container>
            <Text variant="subtitle3">
                Обновление фитнес-функций по итогам публикации архитектуры от 12.12.2024
            </Text>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderData>Код проверки</TableHeaderData>
                        <TableHeaderData>Описание проверки</TableHeaderData>
                        <TableHeaderData>Методика</TableHeaderData>
                        <TableHeaderData>Результат проверки</TableHeaderData>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <FitnessFunctionRow key={i} />
                    ))}
                </TableBody>
            </Table>
        </S.Container>
    );
};
