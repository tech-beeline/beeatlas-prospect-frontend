import React, { FC, useState } from 'react';
import { IconButton, TableData, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { PatternRow } from './components';
import { IPatternsRow } from './types';
import * as S from './units';

export const PatternsRow: FC<IPatternsRow> = ({ patterns, productPatterns }) => {
    const [isExpanded, setIsExpanded] = useState(false);

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
                    {patterns.length === 0 && (
                        <TableRow>
                            <S.TableDataFullWidth colSpan={9}>
                                <S.NotFoundBlockContainer>
                                    <NotFoundBlock
                                        imageVariant={ImageVariants.EMPTY_BOX}
                                        text="Нет связанных паттернов"
                                    />
                                </S.NotFoundBlockContainer>
                            </S.TableDataFullWidth>
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
