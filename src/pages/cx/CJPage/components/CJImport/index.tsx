import React, { FC, useState } from 'react';
import { Button, FileUploader, Icon, IconButton, Typography } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { CJ_PREFIX, useCreateCJByBPMN, useUploadBPMNFile } from 'api/queries/cj';
import { formatSize } from 'utils/formatters';

import { downloadBpmnFile } from '../../utils/formatters';

import { ICJImport } from './types';
import * as S from './units';

export const CJImport: FC<ICJImport> = ({ isOpen, onClose, cjId, onUploaded }) => {
    const [bpmnFile, setBpmnFile] = useState<File | null>(null);
    const { mutateAsync: createCJByBPMN } = useCreateCJByBPMN();
    const { mutateAsync: uploadBPMN } = useUploadBPMNFile();
    const queryClient = useQueryClient();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setBpmnFile(files[0]);
        }
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

    const onSubmmit = async () => {
        if (bpmnFile) {
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
        }
    };
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
            <S.Container>
                <S.FlexWrapper>
                    <div>
                        <S.SideBlockTitle>Импортировать cj</S.SideBlockTitle>
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
                                <Icon iconName={Icons.Page} size="large" />
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
                        onClick={onSubmmit}
                    >
                        Сохранить
                    </Button>
                </S.ButtonContainer>
            </S.Container>
        </SideBlock>
    );
};
