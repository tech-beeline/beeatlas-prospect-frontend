import React, { FC, useRef } from 'react';
import { Nullable } from 'types/common';

import { useMountEffect } from 'hooks';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { ISideBlock } from './types';
import * as S from './units';

export const SideBlock: FC<ISideBlock> = ({
    children,
    isOpen,
    onClose,
    hasBackdrop,
    toggleId,
    closeOnOutsideClick = false,
    outsideClickExceptionIds,
    aboveContent = true,
    large = false,
}) => {
    const sideBlockRef = useRef(null);

    const toggleRef = useRef<Nullable<HTMLElement>>(null);

    useMountEffect(() => {
        if (!!toggleId) {
            toggleRef.current = document.getElementById(toggleId);
        }
    });

    useOutsideClick(
        sideBlockRef,
        isOpen && closeOnOutsideClick,
        onClose,
        toggleRef,
        outsideClickExceptionIds,
    );

    const Container = aboveContent ? S.ContainerFixed : S.ContainerBlock;

    return (
        <>
            <Container ref={sideBlockRef} isOpen={isOpen} large={large} data-testid="Widget">
                {children}
            </Container>
            {hasBackdrop && <S.Backdrop onClick={onClose} isOpen={isOpen} />}
        </>
    );
};
