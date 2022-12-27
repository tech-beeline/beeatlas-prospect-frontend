import React from 'react';

import { InDevelopingMock } from 'components/containers';

import * as S from './units';

export const ProductsPage = () => {
    return (
        <S.PageWrapper>
            <S.Title>Продукты</S.Title>

            <InDevelopingMock />
        </S.PageWrapper>
    );
};
