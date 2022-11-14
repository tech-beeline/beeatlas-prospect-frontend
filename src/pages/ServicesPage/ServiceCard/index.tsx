import React, { FC } from 'react';

import { BadgeName } from 'components/containers';

import { IServiceCard } from './types';
import * as S from './units';

export const ServiceCard: FC<IServiceCard> = (props) => {
    return (
        <S.BorderContainerStyled>
            <div>
                <S.Title>{props.title}</S.Title>

                <S.Text>{props.text}</S.Text>
            </div>

            <div>
                {props.ownerName && <S.Text>Владелец</S.Text>}

                <S.FlexContainer>
                    <BadgeName>{props.ownerName}</BadgeName>

                    <S.ButtonStyled variant="contained" onClick={props?.onClick}>
                        {props.buttonText}
                    </S.ButtonStyled>
                </S.FlexContainer>
            </div>
        </S.BorderContainerStyled>
    );
};
