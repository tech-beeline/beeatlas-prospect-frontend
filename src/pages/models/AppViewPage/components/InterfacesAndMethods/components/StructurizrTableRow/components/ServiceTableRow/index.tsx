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

// import { TooltipContainer } from 'components/interaction';
import { Link } from 'components/other';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { IServiceTableRow } from './types';
import * as S from './units';

export const ServiceTableRow: FC<IServiceTableRow> = ({ structurizrInterface }) => {
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
                            {structurizrInterface.name}
                        </S.NameContainer>
                        {/* <Link
                            showOuterIcon
                            showIconPermanently
                            url="https://beeline.ru"
                            title="Влияние сервиса"
                        /> */}
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
                                    <TableData>{structurizrInterface.name}</TableData>
                                    <TableData>{formatNullableString(null)}</TableData>
                                    <TableData>{structurizrInterface.version}</TableData>
                                    <TableData>{formatNullableString(null)}</TableData>
                                    <TableData>
                                        {structurizrInterface.techCapability ? (
                                            <Link
                                                url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${structurizrInterface.techCapability.id}&type=BUSINESS`}
                                                title={structurizrInterface.techCapability.name}
                                            />
                                        ) : (
                                            formatNullableString(null)
                                        )}
                                    </TableData>
                                </TableRow>
                            </TableBody>
                        </S.TableStyled>
                        <S.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Метод</TableHeaderData>
                                    <TableHeaderData>Описание</TableHeaderData>
                                    <TableHeaderData>Техническая возможность</TableHeaderData>
                                    <TableHeaderData>RPS</TableHeaderData>
                                    <TableHeaderData>Latency, ms</TableHeaderData>
                                    <TableHeaderData>Error Rate, %</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {structurizrInterface.operations.map((operation, i) => (
                                    <TableRow key={i}>
                                        <S.TableDataFullWidth>
                                            <S.MethodNameContainer>
                                                {operation.name}
                                                {/* <IconButton
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
                                                </TooltipContainer> */}
                                            </S.MethodNameContainer>
                                        </S.TableDataFullWidth>
                                        <TableData>
                                            {formatNullableString(operation.description)}
                                        </TableData>
                                        <TableData>
                                            {operation.techCapability ? (
                                                <Link
                                                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${operation.techCapability.id}&type=BUSINESS`}
                                                    title={operation.techCapability.name}
                                                />
                                            ) : (
                                                formatNullableString(null)
                                            )}
                                        </TableData>
                                        <TableData>
                                            {typeof operation.sla?.rps === 'number'
                                                ? operation.sla?.rps
                                                : formatNullableString(null)}
                                        </TableData>
                                        <TableData>
                                            {typeof operation.sla?.latency === 'number'
                                                ? operation.sla?.latency
                                                : formatNullableString(null)}
                                        </TableData>
                                        <TableData>
                                            {typeof operation.sla?.errorRate === 'number'
                                                ? operation.sla?.errorRate
                                                : formatNullableString(null)}
                                        </TableData>
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
