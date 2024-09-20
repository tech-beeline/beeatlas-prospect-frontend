import React, { FC } from 'react';

import { Text } from 'components/core';

import * as S from './units';

export const AuthorizationStub: FC = () => (
    <>
        <S.PageWrapper>
            <S.Container>
                <S.ProgressStyled cycled />
                <Text inactive variant="body1">
                    Проверка авторизации...
                </Text>
            </S.Container>
        </S.PageWrapper>
    </>
);
