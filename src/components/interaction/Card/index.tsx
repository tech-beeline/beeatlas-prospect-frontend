import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import * as S from './units';

export const Card = (props: any) => {
    const navigate = useNavigate();

    return (
        <S.Card className="Card" colorType={props.colorType} withImage={props.withImage} {...props}>
            <S.TitleWrapper withImage={props.withImage}>
                <S.Title
                    className="CardTitle"
                    withImage={props.withImage}
                    onClick={() => props.to && navigate(props.to)}
                >
                    {props.title}
                </S.Title>

                {/* @ts-ignore */}
                <Icon size={24} iconName={Icons.ArrowRight} />
            </S.TitleWrapper>

            <S.Text className="CardText" withImage={props.withImage}>
                {props.children}
            </S.Text>
        </S.Card>
    );
};
