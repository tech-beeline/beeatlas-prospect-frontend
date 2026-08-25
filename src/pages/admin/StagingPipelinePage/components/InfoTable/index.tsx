import React, { FC } from 'react';
import dayjs from 'dayjs';
import { getPipelineRunDurationMs, RawDataSideblock } from 'features/staging';

import { Text } from 'components/core';
import { TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { useGetRawDataQuery } from 'api/queries/staging-service';
import { useModal } from 'hooks';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { IInfoTable } from './types';
import * as S from './units';

export const InfoTable: FC<IInfoTable> = ({ pipelineDetails }) => {
    const durationMs = getPipelineRunDurationMs(
        pipelineDetails.startedAt,
        pipelineDetails.completedAt,
    );

    const { openModal, closeModal, modalOpened } = useModal();

    const { data: rawData } = useGetRawDataQuery(pipelineDetails.rawDataRefId);

    return (
        <S.Container>
            <Text variant="h5">Информация о запуске</Text>

            <S.TableStyled>
                <TableHead>
                    <TableRow>
                        <S.TableHeaderDataNoWrap>UID артефакта</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Название артефакта</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Тип артефакта</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>ID скана</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>ID пакета</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Источник</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Запущен</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Завершён</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Длительность</S.TableHeaderDataNoWrap>
                        <S.TableHeaderDataNoWrap>Сырые данные</S.TableHeaderDataNoWrap>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableData>{pipelineDetails.artifactUid}</TableData>
                        <TableData>{pipelineDetails.artifactName}</TableData>
                        <TableData>{pipelineDetails.artifactType}</TableData>
                        <TableData>{formatNullableString(null)}</TableData>
                        <TableData>{formatNullableString(pipelineDetails.batch)}</TableData>
                        <TableData>{formatNullableString(pipelineDetails.sourceName)}</TableData>
                        <TableData>
                            {dayjs(formatDateToUTC(pipelineDetails.startedAt))
                                .local()
                                .format('DD.MM.YYYY, HH:mm')}
                        </TableData>
                        <TableData>
                            {pipelineDetails.completedAt
                                ? dayjs(formatDateToUTC(pipelineDetails.completedAt))
                                      .local()
                                      .format('DD.MM.YYYY, HH:mm')
                                : formatNullableString(null)}
                        </TableData>
                        <TableData>{durationMs} ms</TableData>
                        <TableData>
                            {pipelineDetails.rawDataRefId ? (
                                <Text link variant="body3" onClick={openModal}>
                                    Посмотреть
                                </Text>
                            ) : (
                                formatNullableString(null)
                            )}
                        </TableData>
                    </TableRow>
                </TableBody>
            </S.TableStyled>
            <RawDataSideblock
                isOpen={modalOpened}
                onClose={closeModal}
                data={{ title: 'Сырые данные', rawData: JSON.stringify(rawData, null, 2) }}
            />
        </S.Container>
    );
};
