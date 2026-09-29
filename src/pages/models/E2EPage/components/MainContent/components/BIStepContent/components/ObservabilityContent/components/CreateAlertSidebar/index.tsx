import React, { FC, useEffect, useState } from 'react';
import { useAuthStore } from 'features/auth';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, TextArea } from 'components/ui';

import { usePostSequenceAlertByIdMutation } from 'api/queries/staging-sequence';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ICreateAlertSidebar } from './types';
import * as S from './units';

export const CreateAlertSidebar: FC<ICreateAlertSidebar> = ({
    isOpen,
    onClose,
    data,
    selectedE2ECode,
}) => {
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => setErrorMessage(null), [comment]);

    const userInfo = useAuthStore((store) => store.userInfo);

    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const { mutateAsync: createSequenceAlert, isPending } = usePostSequenceAlertByIdMutation();

    const handleSave = async () => {
        if (!selectedE2ECode) return;
        setErrorMessage(null);
        try {
            await createSequenceAlert({
                uid: encodeURI(selectedE2ECode),
                data: {
                    creator: `${userInfo?.family_name} ${userInfo?.given_name}`,
                    note: comment,
                },
            });
            showSnackbar({ message: data ? 'Alerts обновлен' : 'Alerts создан' });
            onClose();
        } catch (e) {
            const message =
                (e as any).response?.data?.errorMessage || (e as any).response?.data?.errorMesssage;
            setErrorMessage(message);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setComment(data?.note ?? '');
        }
    }, [isOpen, data]);

    useEffect(() => {
        if (data && data.note) {
            setComment(data.note);
        }
    }, [data]);

    return (
        <SideBlock hasBackdrop large isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.Content>
                    <S.TitleContainer>
                        <Text variant="h5">{data ? 'Обновление alerts' : 'Создание alerts'}</Text>
                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.TitleContainer>
                    <TextArea
                        fullWidth
                        label="Комментарий"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        error={!!errorMessage}
                        helperText={errorMessage || undefined}
                    />
                </S.Content>
                <S.Footer>
                    <S.ButtonContainer>
                        <Button fullWidth variant="outlined" size="medium" onClick={onClose}>
                            Отмена
                        </Button>
                    </S.ButtonContainer>
                    <S.ButtonContainer>
                        <S.ProgressButtonStyled
                            fullWidth
                            variant="contained"
                            size="medium"
                            onClick={handleSave}
                            showProgress={isPending}
                            state={isPending ? 'loading' : 'default'}
                            disabled={!selectedE2ECode || isPending}
                        >
                            {data ? 'Обновить' : 'Создать'}
                        </S.ProgressButtonStyled>
                    </S.ButtonContainer>
                </S.Footer>
            </S.Container>
        </SideBlock>
    );
};
