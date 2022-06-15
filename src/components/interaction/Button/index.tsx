import React, { FC, forwardRef } from 'react';

import { Loader } from 'components/core';

import * as T from './types';
import * as S from './units';

export const Button = forwardRef<HTMLButtonElement, T.IButton>((props, ref) => {
    return (
        <S.FlexContainer>
            <S.Button {...props} ref={ref}>
                {props.children}
            </S.Button>

            {props.isLoading && <Loader size={45} />}
        </S.FlexContainer>
    );
});

export const IconButton: FC<T.IOutlineButton> = ({ icon, ...props }) => {
    return (
        <S.IconButton {...props}>
            <img src={icon} />
        </S.IconButton>
    );
};
