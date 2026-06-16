import React, { FC, useEffect, useState } from 'react';
import { useAuthStore } from 'features/auth';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { TextField } from 'components/ui';
import { ProgressButton } from 'components/ui';

import { useCreateStructurizrWorkspaceMutation } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ICreateStructurizrWorkspaceSideblock } from './types';
import * as S from './units';

export const CreateStructurizrWorkspaceSideblock: FC<ICreateStructurizrWorkspaceSideblock> = ({
    isOpen,
    onClose,
    cmdb,
}) => {
    const [architectName, setArchitectName] = useState('');

    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const userInfo = useAuthStore((store) => store.userInfo);

    useEffect(() => {
        if (userInfo) {
            setArchitectName(`${userInfo.family_name} ${userInfo.given_name}`);
        }
    }, [userInfo]);

    const { mutateAsync, isPending } = useCreateStructurizrWorkspaceMutation();

    const handleCreateButtonClick = async () => {
        await mutateAsync({ architect_name: architectName, code: cmdb });
        showSnackbar({ message: 'Рабочее пространство создано. Данные перенесены из Structurizr' });
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Создание рабочего пространства</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                    </S.TitleContainer>
                    <TextField
                        fullWidth
                        disabled={isPending}
                        label="Архитектор"
                        value={architectName}
                        onChange={(e) => setArchitectName(e.target.value)}
                    />
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <ProgressButton
                        fullWidth
                        size="medium"
                        variant="contained"
                        onClick={handleCreateButtonClick}
                        state={isPending ? 'loading' : 'default'}
                    >
                        Создать
                    </ProgressButton>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
