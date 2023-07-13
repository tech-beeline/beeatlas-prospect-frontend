import React, { FC, useRef } from 'react';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { ISideBlock } from './types';
import * as S from './units';
import { useMountEffect } from 'hooks';
import { Nullable } from 'types/common';

export const SideBlock: FC<ISideBlock> = (props) => {
    const sideBlockRef = useRef(null);

    const toggleRef = useRef<Nullable<HTMLElement>>(null);

    useMountEffect(() => {
        if (!!props.toggleId) {
            toggleRef.current = document.getElementById(props.toggleId);
        }
    });

    useOutsideClick(sideBlockRef, props.isOpen, props.setOpen, toggleRef);

    return (
        <S.Container ref={sideBlockRef} {...props}>
            {props.children}
        </S.Container>
    );
};
