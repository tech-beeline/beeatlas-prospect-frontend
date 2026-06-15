import React, { FC, useState } from 'react';

import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { TableBody, TableData, TableHead, TableHeaderData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IInterfaceRow } from './types';
import * as S from './units';

export const InterfaceRow: FC<IInterfaceRow> = ({ fullData, interfaceOperation }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const uniqueMethods = Array.from(
        new Set(
            fullData
                .filter((o) => o.interface.id === interfaceOperation.interface.id)
                .map((o) => o.id),
        ),
    ).map((operationId) => fullData.find((o) => o.id === operationId)!);

    return (
        <>
            <TableRow>
                <TableData colSpan={2}>
                    <S.NameContainer>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                        <Link
                            title={interfaceOperation.interface.name}
                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&subtab=Structurizr&type=arch_interface&id=${interfaceOperation.interface.id}&hideEmpty=false&hideDeleted=false`}
                        />
                    </S.NameContainer>
                </TableData>
                <TableData alignRight>{uniqueMethods.length}</TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={3}>
                        <S.InterfaceContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Код</TableHeaderData>
                                        {/* <TableHeaderData>Протокол</TableHeaderData>
                                        <TableHeaderData>Версия</TableHeaderData>
                                        <TableHeaderData>Спецификация&nbsp;API</TableHeaderData>
                                        <TableHeaderData>Дата&nbsp;изменения</TableHeaderData> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableData>{interfaceOperation.interface.code}</TableData>
                                        {/* <TableData>REST</TableData>
                                        <TableData>1.2.0</TableData>
                                        <TableData>
                                            <Link url="https://beeline.ru" />
                                        </TableData>
                                        <TableData>12.03.2025, 00:00</TableData> */}
                                    </TableRow>
                                </TableBody>
                            </S.TableStyled>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <S.TableHeaderDataMaxWidth>Метод</S.TableHeaderDataMaxWidth>
                                        {/* <TableHeaderData alignRight>RPS</TableHeaderData>
                                        <TableHeaderData alignRight>
                                            Latency,&nbsp;ms
                                        </TableHeaderData>
                                        <TableHeaderData alignRight>
                                            Error&nbsp;Rate,&nbsp;%
                                        </TableHeaderData> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {uniqueMethods.map((methodOperation, i) => (
                                        <TableRow key={i}>
                                            <TableData>
                                                {/* <Link
                                                    url={`${R.MODELS_PATH}${R.FDM_PATH}`}
                                                    title="GET /2.0.0/napi/sim-info"
                                                /> */}
                                                <Link
                                                    title={`${methodOperation.type} ${methodOperation.name}`}
                                                    url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&subtab=Structurizr&type=arch_operation&id=${methodOperation.id}&hideEmpty=false&hideDeleted=false`}
                                                />
                                            </TableData>
                                            {/* <TableData alignRight>10</TableData>
                                            <TableData alignRight>1500</TableData>
                                            <TableData alignRight>99</TableData> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </S.TableStyled>
                        </S.InterfaceContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
