import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Button, IconButton, TextField } from 'components/ui';

import { useCreateProjectMutation } from 'api/queries/projects';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import * as S from './units';

interface ICreateProjectSideblockProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateProjectSideblock: FC<ICreateProjectSideblockProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [docLink, setDocLink] = useState('');
    const [nameError, setNameError] = useState(false);

    const { mutateAsync, isPending } = useCreateProjectMutation();

    const resetForm = () => {
        setName('');
        setDocLink('');
        setNameError(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleCreate = async () => {
        if (!name.trim()) {
            setNameError(true);
            return;
        }

        const project = await mutateAsync({
            name: name.trim(),
            description: '',
            docLink: docLink.trim() || undefined,
            source: 'BeeAtlas',
        });

        resetForm();
        onClose();
        navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${project.id}`);
    };

    return (
        <SideBlock large hasBackdrop isOpen={isOpen} onClose={handleClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Создание проекта</Text>
                        <IconButton
                            disabled={isPending}
                            iconName={Icons.Close}
                            size="large"
                            onClick={handleClose}
                        />
                    </S.TitleContainer>

                    <TextField
                        fullWidth
                        disabled={isPending}
                        error={nameError}
                        helperText={nameError ? 'Укажите название проекта' : undefined}
                        label="Название проекта*"
                        maxLength={255}
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setNameError(false);
                        }}
                    />

                    <TextField
                        fullWidth
                        disabled={isPending}
                        label="Ссылка на Jira task"
                        value={docLink}
                        onChange={(event) => setDocLink(event.target.value)}
                    />
                </S.ContentContainer>

                <S.ButtonsContainer>
                    <Button
                        fullWidth
                        disabled={isPending}
                        size="medium"
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Закрыть
                    </Button>
                    <Button
                        fullWidth
                        disabled={isPending}
                        size="medium"
                        variant="contained"
                        onClick={handleCreate}
                    >
                        Создать
                    </Button>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
