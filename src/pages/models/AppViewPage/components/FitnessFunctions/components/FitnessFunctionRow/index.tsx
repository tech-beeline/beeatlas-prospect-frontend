import React, { useState } from 'react';
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

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as S from './units';

export const FitnessFunctionRow = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <S.TableRowStyled expanded={expanded}>
                <TableData>
                    <S.CodeContainer>
                        <IconButton
                            iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setExpanded(!expanded)}
                            size="medium"
                        />
                        <Text variant="body3">CTX.03</Text>
                    </S.CodeContainer>
                </TableData>
                <TableData>
                    Все связи на диаграмме контекста должны иметь технологию взаимодействия
                </TableData>
                <TableData>
                    <Link
                        title="https://docs.bw.vimpelcom.ru/techpolicy/"
                        url="https://docs.bw.vimpelcom.ru/techpolicy/"
                    />
                </TableData>
                <TableData>
                    <Label title="Успешно" variant="contained" type="success" />
                </TableData>
                <TableData alignRight>
                    <Text variant="body3">145/145</Text>
                </TableData>
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={5}>
                        <S.ServiceContainer>
                            <Text variant="body3">
                                У продукта найдены capability в Structurizr :
                            </Text>
                            <S.TableStyled>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderData>Название</TableHeaderData>
                                        <TableHeaderData>Код</TableHeaderData>
                                        <TableHeaderData alignRight>
                                            Статус публикации
                                        </TableHeaderData>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableData>
                                            <Link
                                                title="Возможность online-отображения информации в процессе коммуникации сотрудников офисов и call-цен..."
                                                url="#"
                                            />
                                        </TableData>
                                        <TableData>B2CDIGITALRETAILDELIVERYCATALOG.002</TableData>
                                        <TableData>
                                            <Label
                                                type="success"
                                                variant="icon"
                                                iconName={Icons.Check}
                                            />
                                        </TableData>
                                    </TableRow>
                                </TableBody>
                            </S.TableStyled>
                        </S.ServiceContainer>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
