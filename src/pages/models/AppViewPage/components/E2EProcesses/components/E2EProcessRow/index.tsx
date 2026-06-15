import React, { useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

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
                                    <TableHeaderData>Приложение потребитель</TableHeaderData>
                                    <TableHeaderData>Интерфейс</TableHeaderData>
                                    <TableHeaderData>Метод</TableHeaderData>
                                    <TableHeaderData>Зависимость от приложения</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            title="UAPI"
                                        />
                                    </TableData>
                                    <TableData>API/2.0.0/napi</TableData>
                                    <TableData>GET /2.0.0/napi/sim-info</TableData>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            title="MOBILEAPP"
                                        />
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            title="UAPI"
                                        />
                                    </TableData>
                                    <TableData>API/2.0.0/napi</TableData>
                                    <TableData>GET /2.0.0/napi/sim-info</TableData>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            title="MOBILEAPP"
                                        />
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            title="UAPI"
                                        />
                                    </TableData>
                                    <TableData>API/2.0.0/napi</TableData>
                                    <TableData>GET /2.0.0/napi/sim-info</TableData>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}`}
                                            title="MOBILEAPP"
                                        />
                                    </TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                    </S.TableContainer>
                </TableRow>
            )}
        </>
    );
};
