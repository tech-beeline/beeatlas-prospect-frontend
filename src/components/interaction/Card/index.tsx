import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './units';

export const Card = (props: any) => {
    const navigate = useNavigate();

    return (
        <S.Card
            colorType={props.colorType}
            withImage={props.withImage}
            onClick={() => props.to && navigate(props.to)}
            {...props}
        >
            <S.Title withImage={props.withImage}>{props.title}</S.Title>

            <S.Text withImage={props.withImage}>{props.children}</S.Text>
        </S.Card>
    );
};
