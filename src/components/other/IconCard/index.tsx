import React, { FC } from 'react';

import { Button, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IIconCard } from './types';
import * as S from './units';

export const IconCard: FC<IIconCard> = (props) => {
    return (
        <S.BorderContainerStyled className="IconCardBorderContainerStyled">
            {/* @ts-ignore */}
            <Icon iconName={Icons[props.icon]} type={props.color || 'default'} />

            <S.Title className="IconCardTitle">{props.title}</S.Title>

            <S.Text className="IconCardText">{props.text}</S.Text>

            <S.FlexBottomWrapper className="IconCardFlexBottomWrapper">
                {props.deadlineText && (
                    <S.DeadlineBlock className="DeadlineBlock">
                        <S.DeadlineTitle className="DeadlineTitle">срок выполнения</S.DeadlineTitle>{' '}
                        {props.deadlineText}
                    </S.DeadlineBlock>
                )}

                <S.ButtonWrapper className="IconCardButtonWrapper">
                    <Button onClick={props.onClick}>{props.buttonText || 'Скачать шаблон'}</Button>
                </S.ButtonWrapper>
            </S.FlexBottomWrapper>
        </S.BorderContainerStyled>
    );
};
