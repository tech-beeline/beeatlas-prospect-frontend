import React, { FC } from 'react';

import { Text } from 'components/core';
import { Link } from 'components/other/Link';

import * as R from 'router/const';

import { IProductCard } from './types';
import * as S from './units';

export const ProductCard: FC<IProductCard> = ({ product }) => {
    return (
        <S.ProductCardContainer>
            <S.TextContainer>
                <Link
                    url={`${R.MODELS_PATH}${R.APPS_PATH}${
                        R.VIEW_PATH
                    }?cmdb=${product.alias.toUpperCase()}`}
                    title={`${product.name}`}
                />
                <Text inactive variant="body3">
                    {product.alias}
                </Text>
            </S.TextContainer>
        </S.ProductCardContainer>
    );
};
