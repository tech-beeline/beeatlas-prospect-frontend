import React, { useState } from 'react';
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

import * as S from './units';

export const E2EProcessRow = () => {
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
                            Я, как клиент, хочу подключить домашний интернет, ТВ билайн и купить
                            новую SIM
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
                                    <TableHeaderData>Система потребителей</TableHeaderData>
                                    <TableHeaderData>Интерфейс</TableHeaderData>
                                    <TableHeaderData>Метод</TableHeaderData>
                                    <TableHeaderData>Зависимость от систем</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableData>UAPI</TableData>
                                    <TableData>API/2.0.0/napi</TableData>
                                    <TableData>GET /2.0.0/napi/sim-info</TableData>
                                    <TableData>MOBILEAPP</TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>UAPI</TableData>
                                    <TableData>API/2.0.0/napi</TableData>
                                    <TableData>GET /2.0.0/napi/sim-info</TableData>
                                    <TableData>MOBILEAPP</TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>UAPI</TableData>
                                    <TableData>API/2.0.0/napi</TableData>
                                    <TableData>GET /2.0.0/napi/sim-info</TableData>
                                    <TableData>MOBILEAPP</TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                    </S.TableContainer>
                </TableRow>
            )}
        </>
    );
};
