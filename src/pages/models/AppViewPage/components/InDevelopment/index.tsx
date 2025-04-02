import React from 'react';

import { Text } from 'components/core';

import image from './images/empty_list.png';

import * as S from './units';

export const InDevelopment = () => {
    return (
        <S.Container>
            <S.Column>
                <img src={image} />
                <Text variant="h5">Раздел в разработке</Text>
            </S.Column>
        </S.Container>
    );
};
