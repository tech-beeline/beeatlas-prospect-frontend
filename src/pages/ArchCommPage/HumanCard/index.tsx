import React, { FC } from 'react';
import { Icons } from '@beeline/lk-ui';

import { IHumanCard } from './types';
import * as S from './units';

export const HumanCard: FC<IHumanCard> = (props) => {
    return (
        <S.Wrapper {...props}>
            <S.FlexContainer>
                {props.avatar && props.avatar !== 'group' ? (
                    <S.Avatar src={props.avatar} />
                ) : (
                    <S.IconStyled
                        iconName={props.avatar === 'group' ? Icons.Group : Icons.User}
                        type="default"
                    />
                )}

                <div>
                    {props.secondName && <S.SecondName>{props.secondName}</S.SecondName>}

                    <S.FirstName>{props.firstName}</S.FirstName>
                </div>
            </S.FlexContainer>

            <S.Description>{props.description}</S.Description>
        </S.Wrapper>
    );
};
