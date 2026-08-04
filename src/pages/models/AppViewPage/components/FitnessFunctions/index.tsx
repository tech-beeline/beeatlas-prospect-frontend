import React, { FC, useState } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { TableHeaderData } from 'components/ui';
import { ButtonGroup, Skeleton, Table, TableBody, TableHead, TableRow } from 'components/ui';

import { useGetProductFitnessFunctionsQuery } from 'api/queries/fitness-functions';

import { FitnessFunctionRow } from './components';
import { FitnessFunctionsTab } from './const';
import { IFitnessFunctions } from './types';
import * as S from './units';

export const FitnessFunctions: FC<IFitnessFunctions> = ({ cmdb }) => {
    const [tab, setTab] = useState<FitnessFunctionsTab>(FitnessFunctionsTab.FITNESS_FUNCTIONS);
    const { data, isLoading } = useGetProductFitnessFunctionsQuery(
        cmdb,
        tab === FitnessFunctionsTab.TRIGGERS ? true : undefined,
    );

    return (
        <S.Container>
            <ButtonGroup
                alwaysSelected
                size="small"
                options={[
                    { label: 'Проверка', id: FitnessFunctionsTab.FITNESS_FUNCTIONS },
                    { label: 'Триггеры', id: FitnessFunctionsTab.TRIGGERS },
                ]}
                selectedOption={{
                    id: tab,
                }}
                onChange={(option) => setTab(option.id as FitnessFunctionsTab)}
            />
            {isLoading && <Skeleton height={200} radius={12} />}
            {data && data.results.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>
                                {tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                    ? 'Код проверки'
                                    : 'Код триггера'}
                            </TableHeaderData>
                            <TableHeaderData>
                                {tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                    ? 'Описание проверки'
                                    : 'Описание триггера'}
                            </TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                            <TableHeaderData>
                                {tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                    ? 'Результат проверки'
                                    : 'Результат триггера'}
                            </TableHeaderData>
                            <TableHeaderData>Дата изменения</TableHeaderData>
                            <TableHeaderData alignRight>Метрика&nbsp;(цель/факт)</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.results
                            .sort((a, b) => a.ff_code.localeCompare(b.ff_code))
                            .map((fitnessFunction) => (
                                <FitnessFunctionRow
                                    key={fitnessFunction.id}
                                    fitnessFunction={fitnessFunction}
                                    tab={tab}
                                />
                            ))}
                    </TableBody>
                </Table>
            )}
            {data && data.results.length === 0 && (
                <S.NotFoundContainer>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title={
                            tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                ? 'Фитнес-функций нет'
                                : 'Триггеров нет'
                        }
                        text=""
                    />
                </S.NotFoundContainer>
            )}
        </S.Container>
    );
};
