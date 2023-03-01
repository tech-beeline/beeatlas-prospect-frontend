import React, { FC } from 'react';
import { Icons } from '@beeline/lk-ui';

import { IHumanCard } from './types';
import * as S from './units';

export const HumanCard: FC<IHumanCard> = (props) => {
    return (
        <S.Wrapper className="HumanCardWrapper" {...props}>
            <S.FlexContainer className="HumanCardFlexContainer">
                {props.avatar && props.avatar !== 'group' ? (
                    <S.Avatar className="HumanCardAvatar" src={props.avatar} />
                ) : (
                    <S.IconStyled
                        className="HumanCardIconStyled"
                        iconName={props.avatar === 'group' ? Icons.Group : Icons.User}
                        type="default"
                    />
                )}

                <div>
                    {props.secondName && (
                        <S.SecondName className="HumanCardSecondName">
                            {props.secondName}
                        </S.SecondName>
                    )}

                    <S.FirstName className="HumanCardFirstName">{props.firstName}</S.FirstName>
                </div>
            </S.FlexContainer>

            <S.Description className="HumanCardDescription">{props.description}</S.Description>
        </S.Wrapper>
    );
};
