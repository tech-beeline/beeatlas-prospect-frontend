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

import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';

import * as R from 'router/const';

import { IServiceTableRow } from './types';
import * as S from './units';

export const ServiceTableRow: FC<IServiceTableRow> = ({ service }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <TableRow>
                <S.TableDataFullWidth>
                    <S.DataContainer>
                        <S.NameContainer>
                            <IconButton
                                size="medium"
                                iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                                onClick={() => setIsExpanded(!isExpanded)}
                            />
                            {service.name}
                        </S.NameContainer>
                        <Link
                            showOuterIcon
                            showIconPermanently
                            url="https://beeline.ru"
                            title="Влияние сервиса"
                        />
                    </S.DataContainer>
                </S.TableDataFullWidth>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.ServiceContainer>
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Код</TableHeaderData>
                                    <TableHeaderData>Протокол</TableHeaderData>
                                    <TableHeaderData>Версия</TableHeaderData>
                                    <TableHeaderData>Спецификация API</TableHeaderData>
                                    <TableHeaderData>Техническая возможность</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableData>{service.code}</TableData>
                                    <TableData>{service.protocol}</TableData>
                                    <TableData>{service.version}</TableData>
                                    <TableData>
                                        <Link url={service.specification} />
                                    </TableData>
                                    <TableData>
                                        <Link
                                            url={`${R.MODELS_PATH}${R.FDM_PATH}`}
                                            title={service.techCapability.name}
                                        />
                                    </TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Метод</TableHeaderData>
                                    <TableHeaderData>Описание</TableHeaderData>
                                    <TableHeaderData>RPS</TableHeaderData>
                                    <TableHeaderData>Latency</TableHeaderData>
                                    <TableHeaderData>Error Rate</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {service.methods.map((method, i) => (
                                    <TableRow key={i}>
                                        <S.TableDataFullWidth>
                                            <S.MethodNameContainer>
                                                {method.name}
                                                <IconButton
                                                    data-tooltip-id={`method-${i}`}
                                                    size="medium"
                                                    iconName={Icons.OpenInBrowser}
                                                    onClick={() =>
                                                        window.open('https://beeline.ru')
                                                    }
                                                />
                                                <TooltipContainer
                                                    noArrow
                                                    place="top"
                                                    id={`method-${i}`}
                                                    offset={8}
                                                >
                                                    Влияние эндпоинта
                                                </TooltipContainer>
                                            </S.MethodNameContainer>
                                        </S.TableDataFullWidth>
                                        <TableData>{method.description}</TableData>
                                        <TableData>{method.rps}</TableData>
                                        <TableData>{method.latency}</TableData>
                                        <TableData>{method.errorRate}</TableData>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </S.TableStyled>
                    </S.ServiceContainer>
                </TableRow>
            )}
        </>
    );
};
