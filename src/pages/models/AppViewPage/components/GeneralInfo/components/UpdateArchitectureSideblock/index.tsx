import React, { FC, useState } from 'react';
import { Button, FileUploader, IconButton, ProgressButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { useCreateProcessDSLMutation, useCreateProcessJSONMutation } from 'api/queries/camunda';
import { useSnackbarStore } from 'widgets/Snackbar';

import { IUpdateArchitectureSideblock } from './types';
import * as S from './units';
import { toBase64 } from './utils';

export const UpdateArchitectureSideblock: FC<IUpdateArchitectureSideblock> = ({
    isOpen,
    onClose,
    cmdb,
    setTempDisabled,
}) => {
    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const [fileList, setFileList] = useState<File[]>([]);

    const { mutateAsync: createJSONProcess, isPending: isCreatingJSONProcess } =
        useCreateProcessJSONMutation();
    const { mutateAsync: createDSLProcess, isPending: isCreatingDSLProcess } =
        useCreateProcessDSLMutation();

    const handleStartButtonClick = async () => {
        try {
            if (fileList[0] && fileList[0].name.split('.')[1] === 'json') {
                setTempDisabled(true);
                await createJSONProcess({ file: fileList[0], cmdb });
                showSnackbar({ message: 'Идет процесс обновления данных' });
                setTimeout(() => setTempDisabled(false), 15 * 1000);
            } else if (fileList[0] && fileList[0].name.split('.')[1] === 'dsl') {
                setTempDisabled(true);
                const fileEncoded = await toBase64(fileList[0]);
                await createDSLProcess({ workspace: fileEncoded, cmdb });
                showSnackbar({ message: 'Идет процесс обновления данных' });
                setTimeout(() => setTempDisabled(false), 15 * 1000);
            }
        } catch (e) {
            setTempDisabled(false);
        } finally {
            onClose();
        }
    };

    return (
        <SideBlock hasBackdrop isOpen={isOpen} onClose={onClose}>
            <S.SideblockContainer>
                <S.ContentContainer>
                    <S.TitleContainer>
                        <Text variant="h5">Загрузка версии архитектуры</Text>
                        <IconButton iconName={Icons.Close} size="large" onClick={onClose} />
                    </S.TitleContainer>
                    <FileUploader
                        subTitle="dsl, json до 200 кб"
                        accept=".dsl, .json"
                        onChange={(event) => {
                            setFileList(Array.from(event.target.files ?? []));
                            event.target.value = '';
                        }}
                        onRemove={() => setFileList([])}
                    />
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button fullWidth size="medium" variant="outlined" onClick={onClose}>
                        Отменить
                    </Button>
                    <ProgressButton
                        fullWidth
                        size="medium"
                        variant="contained"
                        onClick={handleStartButtonClick}
                        state={
                            isCreatingJSONProcess || isCreatingDSLProcess ? 'loading' : 'default'
                        }
                        disabled={!fileList[0]}
                    >
                        Запустить
                    </ProgressButton>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
