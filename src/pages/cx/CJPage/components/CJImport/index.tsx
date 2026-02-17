import React, { FC, useState } from 'react';
import { Button, FileUploader, IconButton, Typography } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { CJ_PREFIX, useCreateCJByBPMN, useUploadBPMNFile } from 'api/queries/cj';
import { useModal } from 'hooks';
import { formatSize } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { downloadBpmnFile } from '../../utils/formatters';

import { ICJImport } from './types';
import * as S from './units';

export const CJImport: FC<ICJImport> = ({ isOpen, onClose, cjId, onUploaded }) => {
    const [bpmnFile, setBpmnFile] = useState<File | null>(null);
    const { mutateAsync: createCJByBPMN, isPending: isLoadingCJbyBPMN } = useCreateCJByBPMN();
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

    const handleRemoveFile = () => {
        setBpmnFile(null);
    };

    const handleUploadFile = async () => {
        if (bpmnFile) {
            const fileContent = await bpmnFile.text();
            downloadBpmnFile(bpmnFile.name, fileContent);
        }
    };

    const { modalOpened, openModal, closeModal } = useModal();

    const onSubmmit = async () => {
        if (bpmnFile) {
            try {
                await uploadBPMN({
                    file: bpmnFile,
                    cjId,
                });

                await createCJByBPMN(cjId);
                queryClient.invalidateQueries({
                    queryKey: [CJ_PREFIX],
                });
                setBpmnFile(null);
                onUploaded?.();
                onClose();
                showSnackbar({ message: 'Изменения сохранены' });
                closeModal();
            } catch (bpmnError) {
                showSnackbar({ message: 'Ошибка валидации файла', showCloseButton: true });
                setBpmnFile(null);
                onClose();
                closeModal();
            }
        }
    };
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
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
                    <Button type="button" onClick={onClose}>
                        Отменить
                    </Button>

                    <Button
                        disabled={!bpmnFile}
                        type="submit"
                        variant="contained"
                        onClick={openModal}
                    >
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.Container>
            <Dialog
                title="Сохранить новую версию?"
                opened={modalOpened}
                confirmText="Сохранить"
                onConfirm={onSubmmit}
                onClose={closeModal}
                isPending={isLoadingCJbyBPMN}
            >
                Внимание! При сохранении новой версии CJ, описанные вызовы в удаленных шагах
                сценария BI будут безвозвратно утеряны и не отобразятся при возвращении старой
                версии
            </Dialog>
        </SideBlock>
    );
};
