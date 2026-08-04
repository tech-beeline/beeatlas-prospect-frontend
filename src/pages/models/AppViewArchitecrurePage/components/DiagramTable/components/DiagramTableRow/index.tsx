import React, { useState } from 'react';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import contextDiagram from '../../../../images/context.png';

import * as S from './units';

export const DiagramTableRow = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
            <S.TableRowStyled expanded={isExpanded}>
                <S.TableDataFullWidth>
                    <S.TitleContainer>
                        <Text variant="subtitle1">[System Context] Pretium</Text>
                        <IconButton
                            iconName={isExpanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            size="large"
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                    </S.TitleContainer>
                </S.TableDataFullWidth>
            </S.TableRowStyled>
            {isExpanded && (
                <S.TableRowStyled>
                    <S.TableDataFullWidth>
                        <S.ImageContainer>
                            <S.ImageStyled src={contextDiagram} />
                        </S.ImageContainer>
                    </S.TableDataFullWidth>
                </S.TableRowStyled>
            )}
        </>
    );
};
