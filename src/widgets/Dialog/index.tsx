import React, { FC } from 'react';
import { Button } from '@beeline/design-system-react';

import { THEME_ELEMENT_ID } from 'styles';

import { IDialog } from './types';
import * as S from './units';

export const Dialog: FC<IDialog> = ({
    opened,
    title,
    onClose,
    onConfirm,
    onDecline,
    children,
    showDeclineButton = true,
    declineText = 'Отменить',
    confirmText = 'Подтвердить',
}) => {
    const footer = (
        <S.ButtonsContainer>
            {showDeclineButton && (
                <Button size="medium" variant="outlined" onClick={onDecline ?? onClose}>
                    {declineText}
                </Button>
            )}
            <Button size="medium" variant="contained" onClick={onConfirm}>
                {confirmText}
            </Button>
        </S.ButtonsContainer>
    );

    return (
        <S.DialogStyled open={opened} onClose={onClose} applicationRootElement={THEME_ELEMENT_ID}>
            <S.DialogContentStyled title={title} footer={footer} variant="desktop">
                {children}
            </S.DialogContentStyled>
        </S.DialogStyled>
    );
};
