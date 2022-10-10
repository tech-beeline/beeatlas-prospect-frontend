import React, { FC } from 'react';
import { Icon, Icons } from '@beeline/lk-ui';

import { IIconText } from './types';
import * as S from './units';

export const IconText: FC<IIconText> = ({ isSecondary = false, ...props }) => {
    return (
        <S.Wrapper {...{ isSecondary }} {...props}>
            {props.number ? (
                <S.Background>{props.number}</S.Background>
            ) : (
                // @ts-ignore
                <Icon iconName={Icons[props.icon]} type={props.color || 'default'} />
            )}

            <p style={{ whiteSpace: 'pre-line' }}>{props.text}</p>
        </S.Wrapper>
    );
};
