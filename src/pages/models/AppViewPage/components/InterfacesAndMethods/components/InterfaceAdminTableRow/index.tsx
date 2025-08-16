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

import { IInterfaceAdminTableRow } from './types';
import * as S from './units';

export const InterfaceAdminTableRow: FC<IInterfaceAdminTableRow> = ({ adminInterface }) => {
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
                        <Text variant="body3">{adminInterface.name}</Text>
                    </S.NameContainer>
                </TableData>
                <TableData>{adminInterface.contextApi}</TableData>
                <TableData>{adminInterface.contextProvider}</TableData>
                <TableData>{adminInterface.aaacInterface}</TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={4} style={{ padding: 0 }}>
                        <S.TableContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Метод mapic</TableHeaderData>
                                        <TableHeaderData>Метод AaAC</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminInterface.methods.map((method, i) => (
                                        <TableRow key={i}>
                                            <TableData>{method.mapicMethod}</TableData>
                                            <TableData>{method.aaacMethod}</TableData>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </S.TableStyled>
                        </S.TableContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
