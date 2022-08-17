import React from 'react';

import * as S from './units';

export const Card = (props: any) => {
    return (
        <S.CardContainer>
            <S.Card colorType={props.colorType}>
                <S.Title>{props.title}</S.Title>

                <S.Text>{props.children}</S.Text>
            </S.Card>
        </S.CardContainer>
    );
};
