import React, { FC, useState } from 'react';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { TextField } from 'components/ui';
import { Button } from 'components/ui';

import { useCreateCategoryMutation } from 'api/queries/technologies';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ICreateCategorySideblock } from './types';
import * as S from './units';

export const CreateCategorySideblock: FC<ICreateCategorySideblock> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync } = useCreateCategoryMutation();

    const handleClose = () => {
        onClose();
        setName('');
        setError(false);
    };

    const handleCreateClick = async () => {
        if (name.length !== 0) {
            await mutateAsync({ data: { name } });
            handleClose();
            showSnackbar({ message: 'Группа создана' });
        } else {
            setError(true);
        }
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
                        error={error}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(false);
                        }}
                        label="Название группы*"
                        maxLength={50}
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
