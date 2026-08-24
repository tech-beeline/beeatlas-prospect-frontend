import React, { FC, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, FileUploader, ProgressButton } from 'components/ui';
import { Typography } from 'components/ui/Typography';

import {
    CJ_PREFIX,
    useCreateCJByBPMN,
    useUploadBPMNFile,
    useValidateBPMNByDocIdMutation,
} from 'api/queries/cj';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { downloadBpmnFile } from '../../utils/formatters';

import { ICJImport } from './types';
import * as S from './units';

export const CJImport: FC<ICJImport> = ({ isOpen, onClose, cjId, isRefreshing, isEmptyCJ }) => {
    const [bpmnFile, setBpmnFile] = useState<File | null>(null);
    const [bpmnErrorText, setBpmnErrorText] = useState<string | null>(null);
    const [isSideSheetSubmitting, setIsSideSheetSubmitting] = useState(false);
    const { mutateAsync: createCJByBPMN, isPending: isPendingCJ } = useCreateCJByBPMN();
    const { mutateAsync: validateBPMNByDocId } = useValidateBPMNByDocIdMutation();
    const { mutateAsync: uploadBPMN } = useUploadBPMNFile();
    const queryClient = useQueryClient();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setBpmnFile(files[0]);
        }
        event.target.value = '';
    };

    useEffect(() => setBpmnErrorText(null), [bpmnFile]);

    const handleRemoveFile = () => {
        setBpmnFile(null);
    };

    const isLoading = isRefreshing || isPendingCJ;

    const handleUploadFile = async () => {
        if (bpmnFile) {
            const fileContent = await bpmnFile.text();
            downloadBpmnFile(bpmnFile.name, fileContent);
        }
    };

    const { modalOpened, openModal, closeModal } = useModal();

    const handleSubmit = async (shouldCloseAfter = false) => {
        if (!bpmnFile) return;

        if (shouldCloseAfter) {
            setIsSideSheetSubmitting(true);
        }

        try {
            const { docId } = await uploadBPMN({ file: bpmnFile, cjId });
            await validateBPMNByDocId(docId);
            await createCJByBPMN(cjId);

            await queryClient.invalidateQueries({
                queryKey: [CJ_PREFIX],
            });

            if (shouldCloseAfter) {
                setBpmnFile(null);
                onClose();
                showSnackbar({ message: 'Изменения сохранены' });
            }
        } catch (bpmnError) {
            const errorText =
                (bpmnError as any)?.response?.data?.errorMessage ??
                'Ошибка при обработке BPMN файла. Проверьте формат файла и попробуйте снова.';
            setBpmnErrorText(errorText);
        } finally {
            if (shouldCloseAfter) {
                setIsSideSheetSubmitting(false);
            }
        }
    };

    const handleSaveClick = () => {
        if (isEmptyCJ) {
            handleSubmit(true);
        } else {
            openModal();
        }
    };

    useEffect(() => {
        if (!isRefreshing && !isPendingCJ) {
            if (modalOpened) {
                setBpmnFile(null);
                closeModal();
                onClose();
                showSnackbar({ message: 'Изменения сохранены' });
            }
        }
    }, [isRefreshing, isPendingCJ]);
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true} hasBackdrop>
            <S.Container>
                <S.FlexWrapper>
                    <div>
                        <S.SideBlockTitle>Импортировать CJ</S.SideBlockTitle>
                        <Text inactive variant="body3">
                            Загрузка нового файла обновит предыдущие данные
                        </Text>
                    </div>

                    <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                </S.FlexWrapper>

                <S.FileAddingContainer>
                    <FileUploader
                        hideFileList
                        accept=".bpmn"
                        subTitle="bpmn до 200 кб"
                        onChange={handleFileChange}
                        error={!!bpmnErrorText}
                        helperText={bpmnErrorText ?? undefined}
                    />
                    {bpmnFile && (
                        <S.FileNameContainer>
                            <S.FileNameWrapper>
                                <S.FileUploaderListItemStyled name="" />
                                <S.FileMetadataContainer>
                                    <Typography variant="body2">{bpmnFile.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {formatSize(bpmnFile.size)}{' '}
                                        {dayjs(bpmnFile.lastModified)
                                            .local()
                                            .format('DD.MM.YYYY, HH:mm')}
                                    </Typography>
                                </S.FileMetadataContainer>
                            </S.FileNameWrapper>
                            <S.IconButtonContainer>
                                <IconButton
                                    iconName={Icons.Download}
                                    size="medium"
                                    onClick={handleUploadFile}
                                />
                                <IconButton
                                    iconName={Icons.Delete}
                                    size="medium"
                                    onClick={handleRemoveFile}
                                />
                            </S.IconButtonContainer>
                        </S.FileNameContainer>
                    )}
                </S.FileAddingContainer>
                <S.ButtonContainer>
                    <Button
                        type="button"
                        disabled={isLoading}
                        onClick={() => {
                            setBpmnFile(null);
                            onClose();
                        }}
                    >
                        Отменить
                    </Button>

                    {isSideSheetSubmitting ? (
                        <ProgressButton size="medium" variant="contained" state="loading">
                            Сохранить
                        </ProgressButton>
                    ) : (
                        <Button
                            disabled={!bpmnFile}
                            type="submit"
                            variant="contained"
                            onClick={handleSaveClick}
                        >
                            Сохранить
                        </Button>
                    )}
                </S.ButtonContainer>
            </S.Container>
            <Dialog
                title="Сохранить новую версию?"
                opened={modalOpened}
                confirmText="Сохранить"
                onConfirm={() => handleSubmit(false)}
                onClose={closeModal}
                isPending={isLoading}
            >
                Внимание! При сохранении новой версии CJ, описанные вызовы в удаленных шагах
                сценария BI будут безвозвратно утеряны и не отобразятся при возвращении старой
                версии
            </Dialog>
        </SideBlock>
    );
};
