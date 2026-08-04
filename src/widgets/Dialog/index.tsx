import React, { FC } from 'react';

import { Button, ProgressButton } from 'components/ui';

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
    isPending = false,
    declineText = 'Отменить',
    confirmText = 'Подтвердить',
    showFooter = true,
    large = false,
}) => {
    const footer = showFooter ? (
        <S.ButtonsContainer>
            {showDeclineButton && (
                <Button
                    size="medium"
                    variant="outlined"
                    onClick={onDecline ?? onClose}
                    disabled={isPending}
                >
                    {declineText}
                </Button>
            )}
            {isPending ? (
                <ProgressButton size="medium" variant="contained" state="loading">
                    {confirmText}
                </ProgressButton>
            ) : (
                <Button size="medium" variant="contained" onClick={onConfirm}>
                    {confirmText}
                </Button>
            )}
        </S.ButtonsContainer>
    ) : (
        <></>
    );

    return (
        <S.DialogStyled open={opened} onClose={onClose}>
            <S.DialogContentStyled
                large={large}
                showFooter={showFooter}
                title={title}
                footer={footer}
                variant="desktop"
            >
                {children}
            </S.DialogContentStyled>
        </S.DialogStyled>
    );
};
