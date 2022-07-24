import React from 'react';

import * as S from './units';

export const InfoWithDiagram = (props: any) => {
    return (
        <S.FlexContainer>
            <S.Diagram src={props.diagram} />

            <S.TitleFirst>{props.titleFirst}</S.TitleFirst>

            <S.TitleSecond>{props.titleSecond}</S.TitleSecond>

            <S.Description>{props.children}</S.Description>
        </S.FlexContainer>
    );
};
