import React, { FC, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Label, TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { IFitnessFunctionRowOld } from './types';
import * as S from './units';

export const FitnessFunctionRowOld: FC<IFitnessFunctionRowOld> = ({
    fitnessFunction,
    createdDate,
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <S.TableRowStyled expanded={expanded}>
                <TableData>
                    <S.CodeContainer>
                        <S.IconButtonContainer>
                            {fitnessFunction.details &&
                                fitnessFunction.details.length !== 0 &&
                                fitnessFunction.tableStruct &&
                                fitnessFunction.tableStruct.length !== 0 && (
                                    <IconButton
                                        iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                        onClick={() => setExpanded(!expanded)}
                                        size="medium"
                                    />
                                )}
                        </S.IconButtonContainer>
                        <Text variant="body3">{fitnessFunction.code}</Text>
                    </S.CodeContainer>
                </TableData>
                <TableData>{fitnessFunction.description}</TableData>
                <TableData>
                    <Link title={fitnessFunction.docLink} url={fitnessFunction.docLink} />
                </TableData>
                <TableData>
                    <Label
                        title={fitnessFunction.isCheck ? 'Успешно' : 'Ошибка'}
                        variant="contained"
                        type={fitnessFunction.isCheck ? 'success' : 'error'}
                    />
                </TableData>
                <TableData>{dayjs.utc(createdDate).local().format('DD.MM.YYYY HH:mm')}</TableData>
                <TableData alignRight>{formatNullableString(null)}</TableData>
                {/* <TableData alignRight>
                    <Text variant="body3">
                        {fitnessFunction.details && fitnessFunction.details.length !== 0
                            ? `${fitnessFunction.details.length}/${
                                  fitnessFunction.details.filter((ff) => ff.isCheck).length
                              }`
                            : formatNullableString(null)}
                    </Text>
                </TableData> */}
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={6}>
                        <S.ServiceContainer>
                            <Text variant="body3">
                                {formatNullableString(fitnessFunction.assessmentDescription)}
                            </Text>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <S.TableHeaderDataFixedWidth>
                                            Статус публикации
                                        </S.TableHeaderDataFixedWidth>
                                        {(fitnessFunction.tableStruct ?? []).map((value, i) => (
                                            <TableHeaderData key={i}>{value}</TableHeaderData>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(fitnessFunction.details ?? []).map((detail, i) => (
                                        <TableRow key={i}>
                                            <TableData>
                                                <Label
                                                    type={detail.isCheck ? 'success' : 'error'}
                                                    variant="icon"
                                                    iconName={
                                                        detail.isCheck ? Icons.Check : Icons.Close
                                                    }
                                                />
                                            </TableData>
                                            {(fitnessFunction.tableStruct ?? []).map(
                                                (struct, i) => (
                                                    <TableData key={i}>
                                                        <S.ValueContainer
                                                            dangerouslySetInnerHTML={{
                                                                __html: formatNullableString(
                                                                    detail.details.find(
                                                                        (v) => v.key === struct,
                                                                    )?.value,
                                                                ),
                                                            }}
                                                        />
                                                    </TableData>
                                                ),
                                            )}
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
