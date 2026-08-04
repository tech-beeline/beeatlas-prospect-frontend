import React, { FC, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, TextArea } from 'components/ui';

import { ApplicationStatus } from 'api/applications/types';
import { usePatchBCApplicationStatusMutation } from 'api/queries/applications';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IRevisionSideblock } from './types';
import * as S from './units';

export const RevisionSideblock: FC<IRevisionSideblock> = ({ isOpen, onClose, application }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync } = usePatchBCApplicationStatusMutation();

    const handleClose = () => {
        onClose();
        setComment('');
    };

    const handleCreateClick = async () => {
        if (comment.length !== 0) {
            handleClose();
            mutateAsync({
                id: application.business_key,
                nextStatus: ApplicationStatus.RFCTR,
                data: { comment },
            });
            showSnackbar({ message: 'Заявка отправлена на доработку' });
        } else {
            setError(true);
        }
    };
    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Вернуть на доработку</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={handleClose} />
                    </S.TitleContainer>
                    <TextArea
                        fullWidth
                        onChange={(e) => {
                            setComment(e.target.value);
                            setError(false);
                        }}
                        error={error}
                        label="Укажите причину*"
                    />
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button size="medium" variant="outlined" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button size="medium" variant="contained" onClick={handleCreateClick}>
                        Вернуть
                    </Button>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
