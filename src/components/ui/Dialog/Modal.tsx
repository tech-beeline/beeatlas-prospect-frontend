import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

import { DEFAULT_APPLICATION_ROOT_ELEMENT } from './const';
import type { ModalProps } from './types';
import * as S from './units';

export const Modal = ({
    open = false,
    className,
    applicationRootElement,
    children,
    ...rest
}: ModalProps) => {
    const appElementId = applicationRootElement || DEFAULT_APPLICATION_ROOT_ELEMENT;
    const target = typeof document !== 'undefined' ? document.getElementById(appElementId) : null;

    useLayoutEffect(() => {
        if (!open) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    if (!open) {
        return null;
    }

    if (!target) {
        throw new Error(`Application root element with ID "${appElementId}" not found`);
    }

    return createPortal(
        <S.ModalRoot
            className={className}
            aria-modal="true"
            role="dialog"
            data-testid="Modal"
            {...rest}
        >
            {children}
        </S.ModalRoot>,
        target,
    );
};
