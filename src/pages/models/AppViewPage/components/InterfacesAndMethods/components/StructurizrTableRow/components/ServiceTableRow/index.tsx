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

export const ServiceTableRow: FC<IServiceTableRow> = ({
    structurizrInterface,
    originalStructurizrInterface,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <TableRow>
                <S.TableDataFullWidth colSpan={2}>
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
                <TableData alignRight>{originalStructurizrInterface?.operations.length}</TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={3}>
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
                                        <TableData>
                                            {formatNullableString(structurizrInterface.protocol)}
                                        </TableData>
                                        <TableData>
                                            {formatNullableString(structurizrInterface.version)}
                                        </TableData>
                                        <TableData>
                                            {structurizrInterface.specLink ? (
                                                <Link url={structurizrInterface.specLink} />
                                            ) : (
                                                formatNullableString(null)
                                            )}
                                        </TableData>
                                        <TableData>
                                            {structurizrInterface.techCapability ? (
                                                <Link
                                                    url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${structurizrInterface.techCapability.id}&type=TECH`}
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
                                        <TableHeaderData alignRight>RPS</TableHeaderData>
                                        <TableHeaderData alignRight>Latency, ms</TableHeaderData>
                                        <TableHeaderData alignRight>Error Rate, %</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {structurizrInterface.operations.map((operation, i) => (
                                        <TableRow key={i}>
                                            <S.TableDataFullWidth>
                                                <S.MethodNameContainer>
                                                    {`${operation.type} ${operation.name}`}
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
                                                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${operation.techCapability.id}&type=TECH`}
                                                        title={operation.techCapability.name}
                                                    />
                                                ) : (
                                                    formatNullableString(null)
                                                )}
                                            </TableData>
                                            <TableData alignRight>
                                                {typeof operation.sla?.rps === 'number'
                                                    ? operation.sla?.rps
                                                    : formatNullableString(null)}
                                            </TableData>
                                            <TableData alignRight>
                                                {typeof operation.sla?.latency === 'number'
                                                    ? operation.sla?.latency
                                                    : formatNullableString(null)}
                                            </TableData>
                                            <TableData alignRight>
                                                {typeof operation.sla?.errorRate === 'number'
                                                    ? operation.sla?.errorRate
                                                    : formatNullableString(null)}
                                            </TableData>
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
