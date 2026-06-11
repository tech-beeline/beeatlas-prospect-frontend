import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IE2EProcessRow } from './types';
import * as S from './units';

export const E2EProcessRow: FC<IE2EProcessRow> = ({ cmdb, e2e }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <S.TableRowStyled expanded={expanded}>
                <TableData>
                    <S.NameContainer>
                        <IconButton
                            iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setExpanded(!expanded)}
                            size="medium"
                        />
                        <Text link variant="body3">
                            {e2e.name}
                        </Text>
                    </S.NameContainer>
                </TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableContainer>
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Приложение потребитель</TableHeaderData>
                                    <TableHeaderData>Метод</TableHeaderData>
                                    <TableHeaderData>Зависимость от приложения</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {e2e.operations.map((o, i) => (
                                    <TableRow key={i}>
                                        <S.TableDataColomn>
                                            {o.clients.map((client, index, array) => (
                                                <div key={index}>
                                                    {client}
                                                    {index < array.length - 1 ? ',' : ''}
                                                </div>
                                            ))}
                                        </S.TableDataColomn>
                                        <TableData>{o.operation}</TableData>
                                        <TableData>{cmdb}</TableData>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </S.TableStyled>
                    </S.TableContainer>
                </TableRow>
            )}
        </>
    );
};
