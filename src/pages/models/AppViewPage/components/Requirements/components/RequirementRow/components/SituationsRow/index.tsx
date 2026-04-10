import React, { FC, useState } from 'react';
import { IconButton, TableData, TableRow } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { Link } from 'components/other';

import * as R from 'router/const';

import { ISituationsRow } from './types';
import * as S from './units';

export const SituationsRow: FC<ISituationsRow> = ({ chapters }) => {
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
                        Участие в жизненных ситуациях
                    </S.CellContent>
                </TableData>
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <S.TableDataStyled colSpan={9}>
                        <S.Container>
                            {chapters.map((chapter) => (
                                <S.SituationContainer key={chapter.id}>
                                    <Link
                                        title={chapter.name}
                                        url={`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${chapter.id}`}
                                    />
                                    <Text inactive variant="body3">
                                        {chapter.code}
                                    </Text>
                                </S.SituationContainer>
                            ))}
                        </S.Container>
                    </S.TableDataStyled>
                </TableRow>
            )}
        </>
    );
};
