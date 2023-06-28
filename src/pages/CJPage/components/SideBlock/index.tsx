import React, { FC, useRef } from 'react';

import { useOutsideClick } from 'hooks/useOutsideClick';

import { ISideBlock } from './types';
import * as S from './units';

export const SideBlock: FC<ISideBlock> = (props) => {
    const sideBlockRef = useRef(null);

    useOutsideClick(sideBlockRef, props.isOpen, props.setOpen);

    return (
        <S.Container isOpen={props.isOpen} ref={sideBlockRef}>
            {props.children}
        </S.Container>
    );
};
