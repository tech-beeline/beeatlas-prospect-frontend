import React, { FC, useEffect, useState } from 'react';
import { useAuthStore } from 'features/auth';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton, Select } from 'components/ui';
import { Button, TextArea } from 'components/ui';

import { usePostSequenceAlertByIdMutation } from 'api/queries/staging-sequence';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ALERT_SOURCE_OPTIONS, AlertSource } from './const';
import { ICreateAlertSidebar } from './types';
import * as S from './units';

export const CreateAlertSidebar: FC<ICreateAlertSidebar> = ({
    isOpen,
    onClose,
    data,
    selectedE2ECode,
    e2eCodes,
    onSaved,
}) => {
    const [comment, setComment] = useState('');
    const [implementation, setImplementation] = useState<string | null>(selectedE2ECode);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const implementationOptions = e2eCodes.map((code) => ({ id: code, value: code }));

    useEffect(() => {
        if (isOpen) setImplementation(selectedE2ECode);
    }, [isOpen, selectedE2ECode]);

    useEffect(() => setErrorMessage(null), [comment]);

    const userInfo = useAuthStore((store) => store.userInfo);

    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const { mutateAsync: createSequenceAlert, isPending } = usePostSequenceAlertByIdMutation();

    const handleSave = async () => {
        if (!implementation) return;
        setErrorMessage(null);
        try {
            await createSequenceAlert({
                uid: encodeURI(implementation),
                data: {
                    creator: `${userInfo?.family_name} ${userInfo?.given_name}`,
                    note: comment,
                },
            });
            showSnackbar({ message: data ? 'Alerts обновлен' : 'Alerts создан' });
            onSaved(implementation);
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
                    <Select
                        fullWidth
                        label="Тип реализации"
                        options={ALERT_SOURCE_OPTIONS}
                        values={ALERT_SOURCE_OPTIONS.filter(({ id }) => id === AlertSource.E2E)}
                        onChange={() => undefined}
                    />
                    <Select
                        fullWidth
                        label="Реализация"
                        options={implementationOptions}
                        values={implementationOptions.filter(({ id }) => id === implementation)}
                        onChange={(values) =>
                            setImplementation(values[0] ? String(values[0].id) : null)
                        }
                    />
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
                            disabled={!implementation || isPending}
                        >
                            {data ? 'Обновить' : 'Создать'}
                        </S.ProgressButtonStyled>
                    </S.ButtonContainer>
                </S.Footer>
            </S.Container>
        </SideBlock>
    );
};
