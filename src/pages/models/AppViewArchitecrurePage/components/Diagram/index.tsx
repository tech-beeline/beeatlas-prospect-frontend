import React from 'react';

import contextDiagram from '../../images/context.png';

import * as S from './units';

export const Diagram = () => {
    return (
        <S.Container>
            <S.ImageStyled src={contextDiagram} />
        </S.Container>
    );
};
