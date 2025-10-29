import React, { FC, useEffect, useRef, useState } from 'react';
import {
    IconButton,
    Label,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Link } from 'components/other';

import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { IServiceTableRow } from './types';
import * as S from './units';

export const ServiceTableRow: FC<IServiceTableRow> = ({ structurizrInterface, selectedEntity }) => {
    const rowRef = useRef<HTMLDivElement | null>(null);

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (
            selectedEntity &&
            structurizrInterface.operations.map((i) => i.id).includes(Number(selectedEntity.id))
        ) {
            setIsExpanded(true);
        }
    }, [selectedEntity]);

    const structurizrOperationsFiltered =
        selectedEntity && selectedEntity.interfaceId === structurizrInterface.id
            ? structurizrInterface.operations.filter((o) => o.id === selectedEntity.id)
            : structurizrInterface.operations;

    return (
        <>
            <div ref={rowRef} />
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
                <TableData>
                    {
                        <Label
                            title={structurizrInterface.deletedDate ? 'Удален' : 'Активен'}
                            type={structurizrInterface.deletedDate ? 'error' : 'success'}
                        />
                    }
                </TableData>
                <TableData alignRight>{structurizrInterface.operations.length}</TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={6}>
                        <S.ServiceContainer>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Код</TableHeaderData>
                                        <TableHeaderData>Протокол</TableHeaderData>
                                        <TableHeaderData>Версия</TableHeaderData>
                                        <TableHeaderData>Спецификация API</TableHeaderData>
                                        <TableHeaderData>
                                            Техническая&nbsp;возможность
                                        </TableHeaderData>
                                        <TableHeaderData>Дата&nbsp;изменения</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableData>
                                            {formatNullableString(structurizrInterface.code)}
                                        </TableData>
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
                                        <TableData>
                                            {dayjs(
                                                structurizrInterface.updateDate ??
                                                    structurizrInterface.createDate,
                                            )
                                                .local()
                                                .format('DD.MM.YYYY\u00A0HH:mm')}
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
                                        <TableHeaderData>Статус</TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {structurizrOperationsFiltered.map((operation, i) => (
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
                                            <TableData>
                                                <Label
                                                    title={
                                                        operation.deletedDate ? 'Удален' : 'Активен'
                                                    }
                                                    type={
                                                        operation.deletedDate ? 'error' : 'success'
                                                    }
                                                />
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
