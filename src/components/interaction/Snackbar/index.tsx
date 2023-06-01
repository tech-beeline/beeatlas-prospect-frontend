import React, { FC, useRef } from 'react';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { ISnackbar } from './types';
import * as S from './units';

export const Snackbar: FC<ISnackbar> = (props) => {
    const snackbarRef = useRef(null);

    useOutsideClick(snackbarRef, props.isOpen, props.setOpen);

    return (
        <S.Wrapper isOpen={props.isOpen} ref={snackbarRef}>
            {props.message}
        </S.Wrapper>
    );
};
