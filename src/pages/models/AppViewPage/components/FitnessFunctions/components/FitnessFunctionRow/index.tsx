import React, { FC, useState } from 'react';
import dayjs from 'dayjs';
import {
    FitnessFunctionStatus,
    fitnessFunctionStatusToNameMap,
    fitnessFunctionStatusToSemanticMap,
} from 'features/fitness-functions';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import {
    Badge,
    Label,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { FitnessFunctionsTab } from '../../const';

import { IFitnessFunctionRow } from './types';
import * as S from './units';

export const FitnessFunctionRow: FC<IFitnessFunctionRow> = ({ fitnessFunction, tab }) => {
    const [expanded, setExpanded] = useState(false);

    const currentStatus = fitnessFunction.status as FitnessFunctionStatus;

    const firstDetail = fitnessFunction.details?.[0];
    const detailKeys = firstDetail ? Object.keys(firstDetail).filter((key) => key !== 'check') : [];

    return (
        <>
            <S.TableRowStyled expanded={expanded}>
                <TableData>
                    <S.CodeContainer>
                        <S.IconButtonContainer>
                            {fitnessFunction.details && fitnessFunction.details.length !== 0 && (
                                <IconButton
                                    iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                    onClick={() => setExpanded(!expanded)}
                                    size="medium"
                                />
                            )}
                        </S.IconButtonContainer>
                        <Text variant="body3">{fitnessFunction.ff_code}</Text>
                    </S.CodeContainer>
                </TableData>
                <TableData>{fitnessFunction.ff_description}</TableData>
                <TableData>
                    <Badge semantic={fitnessFunctionStatusToSemanticMap[currentStatus]}>
                        {fitnessFunctionStatusToNameMap[currentStatus]}
                    </Badge>
                </TableData>
                <TableData>
                    <Label
                        title={
                            fitnessFunction.is_check
                                ? tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                    ? 'Успешно'
                                    : 'Обнаружено'
                                : tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                ? 'Ошибка'
                                : 'Не обнаружено'
                        }
                        variant="contained"
                        type={
                            fitnessFunction.is_check
                                ? 'success'
                                : tab === FitnessFunctionsTab.FITNESS_FUNCTIONS
                                ? 'error'
                                : 'default'
                        }
                    />
                </TableData>
                <TableData>
                    {dayjs(fitnessFunction.create_date)
                        .utcOffset(3, true)
                        .local()
                        .format('DD.MM.YYYY HH:mm')}
                </TableData>
                <TableData alignRight>
                    {fitnessFunction.countDetail}/{fitnessFunction.successDetail}
                </TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={6}>
                        <S.ServiceContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <S.TableHeaderDataFixedWidth>
                                            Статус публикации
                                        </S.TableHeaderDataFixedWidth>
                                        {detailKeys.map((key) => (
                                            <TableHeaderData key={key}>{key}</TableHeaderData>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(fitnessFunction.details ?? []).map((detail, i) => (
                                        <TableRow key={i}>
                                            <TableData>
                                                <Label
                                                    type={detail.check ? 'success' : 'error'}
                                                    variant="icon"
                                                    iconName={
                                                        detail.check ? Icons.Check : Icons.Close
                                                    }
                                                />
                                            </TableData>
                                            {detailKeys.map((key) => (
                                                <TableData key={key}>
                                                    <S.ValueContainer
                                                        dangerouslySetInnerHTML={{
                                                            __html: formatNullableString(
                                                                String(detail[key] ?? ''),
                                                            ),
                                                        }}
                                                    />
                                                </TableData>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </S.TableStyled>
                        </S.ServiceContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
