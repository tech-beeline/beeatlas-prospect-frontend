import React, { useState } from 'react';
import { IconButton, Label, TableData, TableRow } from '@beeline/design-system-react';
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
            </S.TableRowStyled>
            {expanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={4}>
                        <S.Divider />
                        <S.Details>
                            <Text variant="subtitle3">Детальная информация</Text>
                            <Text variant="body3">Ок</Text>
                        </S.Details>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
