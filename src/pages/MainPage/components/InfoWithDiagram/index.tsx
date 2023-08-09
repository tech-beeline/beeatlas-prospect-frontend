import React from 'react';

import * as S from './units';
import * as STYLES from 'styles/units';

export const InfoWithDiagram = (props: any) => {
    return (
        <S.FlexContainer className="InfoWithDiagramFlexContainer">
            <S.Diagram className="Diagram" src={props.diagram} />

            <STYLES.H2 className="TitleFirst">{props.titleFirst}</STYLES.H2>

            <STYLES.H4 className="TitleSecond">{props.titleSecond}</STYLES.H4>

            <S.Description>{props.children}</S.Description>
        </S.FlexContainer>
    );
};
