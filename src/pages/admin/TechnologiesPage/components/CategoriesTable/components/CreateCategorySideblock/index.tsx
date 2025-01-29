import React, { FC, useState } from 'react';
import { Button, IconButton, TextField } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { useCreateCategoryMutation } from 'api/queries/technologies';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ICreateCategorySideblock } from './types';
import * as S from './units';

export const CreateCategorySideblock: FC<ICreateCategorySideblock> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync } = useCreateCategoryMutation();

    const handleClose = () => {
        onClose();
        setName('');
    };

    const handleCreateClick = async () => {
        await mutateAsync({ data: { name } });
        handleClose();
        showSnackbar({ message: 'Группа создана' });
    };
    return (
        <SideBlock isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Создать группу</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={handleClose} />
                    </S.TitleContainer>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Название группы*"
                    />
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button size="medium" variant="outlined" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button size="medium" variant="contained" onClick={handleCreateClick}>
                        Создать
                    </Button>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
