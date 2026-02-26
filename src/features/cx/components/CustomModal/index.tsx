import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { CustomModalProps } from './types';
import * as S from './units';

export const CustomModal: FC<CustomModalProps> = ({ open, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [open, onClose]);

    if (!open) return null;

    return ReactDOM.createPortal(
        <S.Backdrop onClick={onClose}>
            <S.ModalWrapper onClick={(e) => e.stopPropagation()}>{children}</S.ModalWrapper>
        </S.Backdrop>,
        document.body,
    );
};
