import React, { FC, ReactNode } from 'react';

import * as STYLES from 'styles/units';

import * as S from './units';

interface InfoWithDiagramProps {
    diagram: string;
    titleFirst: string;
    titleSecond: string;
    children?: ReactNode;
}

export const InfoWithDiagram: FC<InfoWithDiagramProps> = ({
    children,
    diagram,
    titleFirst,
    titleSecond,
}) => {
    return (
        <S.FlexContainer className="InfoWithDiagramFlexContainer">
            <S.Diagram className="Diagram" src={diagram} />

            <STYLES.H2 className="TitleFirst">{titleFirst}</STYLES.H2>

            <STYLES.H4 className="TitleSecond">{titleSecond}</STYLES.H4>

            <S.Description>{children}</S.Description>
        </S.FlexContainer>
    );
};
