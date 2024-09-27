import React, { FC } from 'react';

import { InDevelopmentBanner } from './components';
import { IInDevelopmentPage } from './types';
import * as S from './units';

export const InDevelopmentPage: FC<IInDevelopmentPage> = ({ title }) => {
    return (
        <S.PageWrapper>
            <S.Title>{title}</S.Title>

            <InDevelopmentBanner />
        </S.PageWrapper>
    );
};
