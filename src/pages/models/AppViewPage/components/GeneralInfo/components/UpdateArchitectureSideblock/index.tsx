import React, { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, FileUploader } from 'components/ui';

import { useCreateProcessDSLMutation, useCreateProcessJSONMutation } from 'api/queries/camunda';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import { ArchitectureErrorTypes, IArchitectureError, IUpdateArchitectureSideblock } from './types';
import * as S from './units';
import { toBase64 } from './utils';

export const UpdateArchitectureSideblock: FC<IUpdateArchitectureSideblock> = ({
    isOpen,
    onClose,
    cmdb,
    setTempDisabled,
}) => {
    const [error, setError] = useState<IArchitectureError | null>(null);
    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const [fileList, setFileList] = useState<File[]>([]);

    useEffect(() => {
        if (fileList.length === 0 || ['dsl', 'json'].includes(fileList[0].name.split('.')[1])) {
            setError(null);
        } else {
            setError({ type: ArchitectureErrorTypes.EXTENSION, title: 'Не то расширение' });
        }
    }, [fileList]);

    useEffect(() => {
        if (!isOpen) {
            setFileList([]);
            setError(null);
        }
    }, [isOpen]);

    const { mutateAsync: createJSONProcess, isPending: isCreatingJSONProcess } =
        useCreateProcessJSONMutation();
    const { mutateAsync: createDSLProcess, isPending: isCreatingDSLProcess } =
        useCreateProcessDSLMutation();

    const handleStartButtonClick = async () => {
        if (fileList[0] && fileList[0].name.split('.')[1] === 'json') {
            try {
                setTempDisabled(true);
                await createJSONProcess({ file: fileList[0], cmdb });
                showSnackbar({ message: 'Идет процесс обновления данных' });
                setTimeout(() => setTempDisabled(false), 15 * 1000);
                onClose();
            } catch (e) {
                const errorMessage = (e as AxiosError<{ errorMessage: string }>).response?.data
                    ?.errorMessage;
                if (errorMessage) {
                    setError({
                        type: ArchitectureErrorTypes.VALIDATION,
                        title: 'Ошибка валидации файла',
                        errorMessage,
                    });
                }
                setTempDisabled(false);
            }
        } else if (fileList[0] && fileList[0].name.split('.')[1] === 'dsl') {
            try {
                setTempDisabled(true);
                const fileEncoded = await toBase64(fileList[0]);
                await createDSLProcess({ workspace: fileEncoded, cmdb });
                showSnackbar({ message: 'Идет процесс обновления данных' });
                setTimeout(() => setTempDisabled(false), 15 * 1000);
                onClose();
            } catch (e) {
                const errorMessage = (e as AxiosError<{ detail: { error: string } }>).response?.data
                    ?.detail?.error;
                if (errorMessage) {
                    setError({
                        type: ArchitectureErrorTypes.VALIDATION,
                        title: 'Ошибка валидации файла',
                        errorMessage,
                    });
                }
                setTempDisabled(false);
            }
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
                    <div>
                        <FileUploader
                            subTitle="dsl, json до 5 мб"
                            accept=".dsl, .json"
                            onChange={(event) => {
                                setFileList(Array.from(event.target.files ?? []));
                                event.target.value = '';
                            }}
                            fileList={fileList}
                            onRemove={() => setFileList([])}
                        />
                        {error && (
                            <S.ErrorContainer>
                                <Text variant="caption">{error.title}</Text>
                            </S.ErrorContainer>
                        )}
                    </div>
                    {error && error.errorMessage && (
                        <S.BannerStyled
                            color="error"
                            title={error.errorMessage}
                            iconName={Icons.InfoCircled}
                        />
                    )}
                </S.ContentContainer>
                <S.ButtonsContainer>
                    <Button fullWidth size="medium" variant="outlined" onClick={onClose}>
                        Отменить
                    </Button>
                    <S.ProgressButtonStyled
                        fullWidth
                        size="medium"
                        variant="contained"
                        onClick={handleStartButtonClick}
                        showProgress={isCreatingJSONProcess || isCreatingDSLProcess}
                        state={
                            isCreatingJSONProcess || isCreatingDSLProcess ? 'loading' : 'default'
                        }
                        disabled={
                            !fileList[0] ||
                            (!!error && error.type === ArchitectureErrorTypes.EXTENSION)
                        }
                    >
                        Запустить
                    </S.ProgressButtonStyled>
                </S.ButtonsContainer>
            </S.SideblockContainer>
        </SideBlock>
    );
};
