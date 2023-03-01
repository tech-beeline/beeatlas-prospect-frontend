import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './units';

export const Card = (props: any) => {
    const navigate = useNavigate();

    return (
        <S.Card className="Card" colorType={props.colorType} withImage={props.withImage} {...props}>
            <S.Title
                className="CardTitle"
                withImage={props.withImage}
                onClick={() => props.to && navigate(props.to)}
            >
                {props.title}
            </S.Title>

            <S.Text className="CardText" withImage={props.withImage}>
                {props.children}
            </S.Text>
        </S.Card>
    );
};
