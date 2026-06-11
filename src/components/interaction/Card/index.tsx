import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { CardVariant, ICard } from './types';
import * as S from './units';

const Card: FC<ICard> = ({
    title,
    children,
    to,
    withImage = false,
    variant,
    useTitleAsAttribute = false,
    ...props
}) => {
    const navigate = useNavigate();

    return (
        <S.Card
            className="Card"
            variant={variant}
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

                <Icon iconName={Icons.ArrowRight} />
            </S.TitleWrapper>

            <S.Text className="CardText" withImage={withImage}>
                {children}
            </S.Text>
        </S.Card>
    );
};

export { Card, CardVariant };
