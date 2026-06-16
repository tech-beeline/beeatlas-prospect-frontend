import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { TableData, TableRow } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { PatternRow } from './components';
import { IPatternsRow } from './types';
import * as S from './units';

export const PatternsRow: FC<IPatternsRow> = ({ patterns, productPatterns }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isEmpty = patterns.length === 0;

    return (
        <>
            <TableRow>
                <TableData colSpan={9}>
                    <S.CellContent>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                            size="medium"
                        />
                        Реализация в паттернах
                    </S.CellContent>
                </TableData>
            </TableRow>
            {isExpanded && (
                <>
                    {isEmpty && (
                        <TableRow>
                            <S.TableDataEmpty colSpan={9}>
                                <Text inactive variant="body2">
                                    Нет связанных паттернов
                                </Text>
                            </S.TableDataEmpty>
                        </TableRow>
                    )}
                    {patterns.map((pattern) => (
                        <PatternRow
                            key={pattern.id}
                            pattern={pattern}
                            productPatterns={productPatterns}
                        />
                    ))}
                </>
            )}
        </>
    );
};
