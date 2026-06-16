import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { TableData, TableRow } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ISituationsRow } from './types';
import * as S from './units';

export const SituationsRow: FC<ISituationsRow> = ({ chapters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isEmpty = chapters.length === 0;

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
                    {isEmpty && (
                        <S.TableDataEmpty colSpan={9}>
                            <Text inactive variant="body2">
                                Нет связанных жизненных ситуаций
                            </Text>
                        </S.TableDataEmpty>
                    )}
                    {!isEmpty && (
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
                    )}
                </TableRow>
            )}
        </>
    );
};
