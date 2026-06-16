import React, { useCallback, useEffect } from 'react';

import { ESC_KEY_CODE } from './const';
import { Modal } from './Modal';
import type { DialogProps } from './types';
import * as S from './units';
import { classNames } from './utils';

export const Dialog = ({
    open = false,
    onClose,
    children,
    applicationRootElement,
    className,
    ...rest
}: DialogProps) => {
    const handleEscClick = useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === ESC_KEY_CODE && onClose) {
                onClose(event);
            }
        },
        [onClose],
    );

    useEffect(() => {
        if (open) {
            document.addEventListener('keydown', handleEscClick, false);
        } else {
            document.removeEventListener('keydown', handleEscClick, false);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClick, false);
        };
    }, [handleEscClick, open]);

    return (
        <Modal
            data-testid="Dialog"
            open={open}
            className={classNames('dsb_modal', open && 'dsb_modal__open')}
            applicationRootElement={applicationRootElement}
            {...rest}
        >
            <S.DialogRoot className={classNames('dsb_dialog', className)}>
                <S.DialogBackdrop className="dsb_dialog-backdrop" />
                {children}
            </S.DialogRoot>
        </Modal>
    );
};
