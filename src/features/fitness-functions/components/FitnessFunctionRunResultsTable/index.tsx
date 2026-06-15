import React, { FC } from 'react';

import { IconBadge, Text } from 'components/core';
import { TableHeaderData } from 'components/ui';
import { TableBody, TableData, TableHead, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IFitnessFunctionRunResultsTable } from './types';
import * as S from './units';

export const FitnessFunctionRunResultsTable: FC<IFitnessFunctionRunResultsTable> = ({ result }) => {
    const firstDetail = result.check_result.details?.[0];
    const detailKeys = firstDetail ? Object.keys(firstDetail).filter((key) => key !== 'check') : [];

    return (
        <S.Container>
            <Text variant="subtitle3">Данные проверки</Text>
            <S.TableContainer>
                <S.TableStyled>
                    <TableHead>
                        <TableRow dense>
                            <TableHeaderData>Статус публикации</TableHeaderData>
                            {detailKeys.map((key) => (
                                <TableHeaderData key={key}>{key}</TableHeaderData>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.check_result.details?.map((detail, i) => (
                            <TableRow dense key={i}>
                                <TableData>
                                    <IconBadge
                                        semantic={detail.check ? 'success' : 'danger'}
                                        icon={detail.check ? Icons.Check : Icons.Close}
                                    />
                                </TableData>
                                {detailKeys.map((key) => (
                                    <TableData key={key}>{String(detail[key] ?? '')}</TableData>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </S.TableStyled>
            </S.TableContainer>
        </S.Container>
    );
};
