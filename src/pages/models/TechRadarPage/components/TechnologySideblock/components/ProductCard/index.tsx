import React, { FC, useState } from 'react';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';

import * as R from 'router/const';

import { IProductCard } from './types';
import * as S from './units';

export const ProductCard: FC<IProductCard> = ({ product }) => {
    const [isTooltipShown, setIsTooltipShown] = useState(false);

    return (
        <S.ProductCardContainer>
            <S.TextContainer>
                <Text variant="body2">{product.name}</Text>
                <Text inactive variant="body3">
                    {product.alias}
                </Text>
            </S.TextContainer>
            <IconButton
                iconName={Icons.OpenInBrowser}
                size="large"
                onMouseEnter={() => setIsTooltipShown(true)}
                onMouseLeave={() => setIsTooltipShown(false)}
                onClick={() => {
                    window.open(
                        `${R.MODELS_PATH}${R.APPS_PATH}?alias=${product.alias.toUpperCase()}`,
                    );
                }}
                data-tooltip-id={`app-link-${product.id}`}
            />
            <TooltipContainer
                id={`app-link-${product.id}`}
                offset={5}
                // @ts-ignore
                place="top-start"
                noArrow
                isOpen={isTooltipShown}
            >
                Открыть карточку приложения
            </TooltipContainer>
        </S.ProductCardContainer>
    );
};
