import React, { FC } from 'react';

import defaultImg from './images/default.svg';

import { IHumanCard } from './types';
import * as S from './units';

export const HumanCard: FC<IHumanCard> = (props) => {
    return (
        <S.Wrapper>
            <S.FlexContainer>
                <S.Avatar src={props.avatar || defaultImg} />

                <div>
                    {props.secondName && <S.SecondName>{props.secondName}</S.SecondName>}

                    <S.FirstName>{props.firstName}</S.FirstName>
                </div>
            </S.FlexContainer>

            <S.Description>{props.description}</S.Description>
        </S.Wrapper>
    );
};
