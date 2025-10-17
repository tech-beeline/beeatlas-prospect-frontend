import React, { FC, useState } from 'react';
import {
    IconButton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

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
                            {e2e.e2e}
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
                                <TableRow>
                                    <TableData>{e2e.client.join(', ')}</TableData>
                                    <TableData>{e2e.operation}</TableData>
                                    <TableData>{cmdb}</TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                    </S.TableContainer>
                </TableRow>
            )}
        </>
    );
};
