import React, { FC, FormEvent, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Banner, FileUploader, IconButton, ProgressButton, TextArea } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';
import { downloadTextFile } from 'utils/helpers';

import { IImportDataForm } from './types';
import * as S from './units';

const MAX_FILE_SIZE = 100 * 1024 * 1024;
type InputSource = 'file' | 'text';

export const ImportDataForm: FC<IImportDataForm> = ({ targetId, isSubmitting, onSubmit }) => {
    const [file, setFile] = useState<File | null>(null);
    const [plantUmlText, setPlantUmlText] = useState('');
    const [fileErrorText, setFileErrorText] = useState<string | null>(null);
    const [submitErrorText, setSubmitErrorText] = useState<string | null>(null);
    const [submitErrorSource, setSubmitErrorSource] = useState<InputSource | null>(null);

    const hasText = Boolean(plantUmlText.trim());
    const canSubmit = Boolean(targetId) && Boolean(file || hasText) && !isSubmitting;

    const clearSubmitError = () => {
        setSubmitErrorText(null);
        setSubmitErrorSource(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        event.target.value = '';
        clearSubmitError();

        if (!selectedFile) return;

        if (selectedFile.size > MAX_FILE_SIZE) {
            setFile(null);
            setFileErrorText('Размер файла не должен превышать 100 МБ');
            return;
        }

        if (!selectedFile.name.toLowerCase().endsWith('.puml')) {
            setFile(null);
            setFileErrorText('Выберите файл в формате .puml');
            return;
        }

        setFileErrorText(null);
        setFile(selectedFile);
    };

    const handleDownload = async () => {
        if (!file) return;
        downloadTextFile(file.name, await file.text());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSubmit) return;

        const inputSource: InputSource = file ? 'file' : 'text';
        const submittedFile =
            file ??
            new File([plantUmlText], `e2e-${targetId}.puml`, {
                type: 'text/plain;charset=utf-8',
                lastModified: Date.now(),
            });

        clearSubmitError();

        const error = await onSubmit(submittedFile);

        if (error) {
            setSubmitErrorText(error);
            setSubmitErrorSource(inputSource);
        }
    };

    return (
        <S.Form onSubmit={handleSubmit}>
            <S.ScrollArea>
                <S.Content>
                    <Banner
                        iconName={Icons.InfoCircled}
                        title="Для добавления данных доступно два варианта: вставка текста или добавление файла с устройства"
                    />

                    <S.FieldGroup>
                        <Text variant="subtitle1">Добавить файл</Text>
                        <FileUploader
                            hideFileList
                            accept=".puml"
                            subTitle="puml до 100 МБ"
                            disabled={hasText || isSubmitting}
                            error={Boolean(fileErrorText)}
                            helperText={fileErrorText ?? undefined}
                            onChange={handleFileChange}
                        />

                        {file && (
                            <S.FileRow>
                                <S.FileInfo>
                                    <S.FileUploaderListItemStyled name="" />
                                    <S.FileName>
                                        <Text variant="body2">{file.name}</Text>
                                        <S.FileMetadata>
                                            {formatSize(file.size)} ·{' '}
                                            {dayjs(file.lastModified).format('DD.MM.YYYY, HH:mm')}
                                        </S.FileMetadata>
                                    </S.FileName>
                                </S.FileInfo>
                                <S.FileActions>
                                    <IconButton
                                        iconName={Icons.Download}
                                        size="medium"
                                        onClick={handleDownload}
                                        aria-label="Скачать файл"
                                    />
                                    <IconButton
                                        iconName={Icons.Delete}
                                        size="medium"
                                        onClick={() => {
                                            setFile(null);
                                            setFileErrorText(null);
                                            clearSubmitError();
                                        }}
                                        aria-label="Удалить файл"
                                    />
                                </S.FileActions>
                            </S.FileRow>
                        )}

                        {submitErrorText && submitErrorSource === 'file' && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={submitErrorText}
                            />
                        )}
                    </S.FieldGroup>

                    <S.FieldGroup>
                        <Text variant="subtitle1">Вставить текст</Text>
                        <TextArea
                            fullWidth
                            rows={8}
                            label="PlantUml"
                            value={plantUmlText}
                            disabled={Boolean(file) || isSubmitting}
                            onChange={(event) => {
                                setPlantUmlText(event.target.value);
                                setFileErrorText(null);
                                clearSubmitError();
                            }}
                        />

                        {submitErrorText && submitErrorSource === 'text' && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={submitErrorText}
                            />
                        )}
                    </S.FieldGroup>
                </S.Content>
            </S.ScrollArea>
            <S.Footer>
                <ProgressButton
                    type="submit"
                    variant="contained"
                    state={isSubmitting ? 'loading' : 'default'}
                    disabled={!canSubmit}
                >
                    Проверить
                </ProgressButton>
            </S.Footer>
        </S.Form>
    );
};
