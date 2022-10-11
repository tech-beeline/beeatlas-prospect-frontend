import React, { FC } from 'react';
import { Button, Icon, Icons } from '@beeline/lk-ui';

import { IIconCard } from './types';
import * as S from './units';

export const IconCard: FC<IIconCard> = (props) => {
    return (
        <S.BorderContainerStyled>
            {/* @ts-ignore */}
            <Icon iconName={Icons[props.icon]} type={props.color || 'default'} />

            <S.Title>{props.title}</S.Title>

            <S.Text>{props.text}</S.Text>

            <S.ButtonWrapper>
                <Button>Скачать шаблон</Button>
            </S.ButtonWrapper>
        </S.BorderContainerStyled>
    );
};
