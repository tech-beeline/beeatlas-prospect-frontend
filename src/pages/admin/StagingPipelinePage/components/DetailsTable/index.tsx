import React, { FC, useState } from 'react';
import {
    getPipelineRunDurationMs,
    ISideblockData,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
    RawDataSideblock,
} from 'features/staging';

import { Text } from 'components/core';
import { Badge, TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { formatNullableString } from 'utils/formatters';

import { IDetailsTable } from './types';
import * as S from './units';

export const DetailsTable: FC<IDetailsTable> = ({ pipelineDetails }) => {
    const [sideblockData, setSideblockData] = useState<ISideblockData | null>(null);

    return (
        <S.Container>
            <Text variant="h5">Детали стадий</Text>

            <S.TableStyled>
                <TableHead>
                    <TableRow>
                        <S.TableHeaderDataNoWrap>Стадия</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Модуль</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Статус</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Ошибка</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Длительность</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Вход</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Выход</S.TableHeaderDataNoWrap>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {pipelineDetails.stages.map((stage) => (
                        <TableRow key={stage.id}>
                            <TableData>{stage.stageName}</TableData>
                            <TableData>{stage.runId}</TableData>
                            <TableData>
                                <Badge
                                    type="secondary"
                                    semantic={pipelineStatusToSemanticMap[stage.status]}
                                    icon={pipelineStatusToIconMap[stage.status]}
                                >
                                    {pipelineStatusToNameMap[stage.status]}
                                </Badge>
                            </TableData>
                            <TableData>
                                {stage.failureReason ? (
                                    <S.ErrorText>{stage.failureReason}</S.ErrorText>
                                ) : (
                                    formatNullableString(null)
                                )}
                            </TableData>
                            <TableData>
                                {getPipelineRunDurationMs(stage.startedAt, stage.completedAt)} ms
                            </TableData>
                            <TableData>
                                {stage.inputData ? (
                                    <S.JsonPreview
                                        onClick={() =>
                                            setSideblockData({
                                                rawData: String(stage.inputData),
                                                title: `${stage.stageName} - Вход`,
                                            })
                                        }
                                    >
                                        {String(stage.inputData)}
                                    </S.JsonPreview>
                                ) : (
                                    formatNullableString(null)
                                )}
                            </TableData>
                            <TableData>
                                {stage.outputData ? (
                                    <S.JsonPreview
                                        onClick={() =>
                                            setSideblockData({
                                                rawData: String(stage.outputData),
                                                title: `${stage.stageName} - Выход`,
                                            })
                                        }
                                    >
                                        {String(stage.outputData)}
                                    </S.JsonPreview>
                                ) : (
                                    formatNullableString(null)
                                )}
                            </TableData>
                        </TableRow>
                    ))}
                </TableBody>
            </S.TableStyled>
            <RawDataSideblock
                isOpen={!!sideblockData}
                onClose={() => setSideblockData(null)}
                data={sideblockData}
            />
        </S.Container>
    );
};
