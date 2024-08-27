import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { ICard } from './types';
import * as S from './units';

export const Card: FC<ICard> = ({
    title,
    children,
    to,
    withImage = false,
    colorType,
    useTitleAsAttribute = false,
    ...props
}) => {
    const navigate = useNavigate();

    return (
        <S.Card
            className="Card"
            colorType={colorType}
            withImage={withImage}
            title={useTitleAsAttribute ? title : String(children)}
            {...props}
        >
            <S.TitleWrapper withImage={withImage}>
                <S.Title
                    className="CardTitle"
                    withImage={withImage}
                    onClick={() => to && navigate(to)}
                >
                    {title}
                </S.Title>

                {/* @ts-ignore */}
                <Icon size={24} iconName={Icons.ArrowRight} />
            </S.TitleWrapper>

            <S.Text className="CardText" withImage={withImage}>
                {children}
            </S.Text>
        </S.Card>
    );
};
