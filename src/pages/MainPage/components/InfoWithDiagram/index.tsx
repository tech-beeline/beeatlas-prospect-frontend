import React from 'react';

import * as S from './units';

export const InfoWithDiagram = (props: any) => {
    return (
        <S.FlexContainer className="InfoWithDiagramFlexContainer">
            <S.Diagram className="Diagram" src={props.diagram} />

            <S.TitleFirst className="TitleFirst">{props.titleFirst}</S.TitleFirst>

            <S.TitleSecond className="TitleSecond">{props.titleSecond}</S.TitleSecond>

            <S.Description>{props.children}</S.Description>
        </S.FlexContainer>
    );
};
