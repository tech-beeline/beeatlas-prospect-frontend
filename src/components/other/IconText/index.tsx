import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IIconText } from './types';
import * as S from './units';

export const IconText: FC<IIconText> = ({ isSecondary = false, ...props }) => {
    const navigate = useNavigate();

    return (
        <S.Wrapper
            className="IconTextWrapper"
            number={props.number}
            onClick={() => !!props.to && navigate(props.to)}
            {...{ isSecondary }}
            {...props}
        >
            {props.number ? (
                <S.Background className="IconTextBackground">{props.number}</S.Background>
            ) : (
                // @ts-ignore
                <Icon iconName={Icons[props.icon]} type={props.color || 'default'} />
            )}

            <S.Text className="IconTextText" to={props.to}>
                {props.text}
            </S.Text>
        </S.Wrapper>
    );
};
