import React, { FC, FormEvent, useState } from 'react';
import dayjs from 'dayjs';
import { BIStepCodeFields } from 'features/e2e';

import { Text } from 'components/core';
import {
    Banner,
    FileUploader,
    IconButton,
    ProgressButton,
    TextArea,
    TextField,
} from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';
import { downloadTextFile } from 'utils/helpers';

import { IImportDataForm, IImportDataFormSubmitError } from './types';
import * as S from './units';

const MAX_FILE_SIZE = 100 * 1024 * 1024;
type InputSource = 'file' | 'text';

export const ImportDataForm: FC<IImportDataForm> = ({
    isNewE2E,
    name,
    biStepCode,
    file,
    plantUmlText,
    onNameChange,
    onBIStepCodeChange,
    onFileChange,
    onPlantUmlTextChange,
    onOpenActiveRun,
    isSubmitting,
    onSubmit,
}) => {
    const [fileErrorText, setFileErrorText] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<IImportDataFormSubmitError | null>(null);
    const [submitErrorSource, setSubmitErrorSource] = useState<InputSource | null>(null);

    const hasText = Boolean(plantUmlText.trim());
    const hasE2EData = !isNewE2E || (Boolean(name.trim()) && Boolean(biStepCode));
    const canSubmit = hasE2EData && Boolean(file || hasText) && !isSubmitting;

    const clearSubmitError = () => {
        setSubmitError(null);
        setSubmitErrorSource(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        event.target.value = '';
        clearSubmitError();

        if (!selectedFile) return;

        if (selectedFile.size > MAX_FILE_SIZE) {
            onFileChange(null);
            setFileErrorText('Размер файла не должен превышать 100 МБ');
            return;
        }

        if (!selectedFile.name.toLowerCase().endsWith('.puml')) {
            onFileChange(null);
            setFileErrorText('Выберите файл в формате .puml');
            return;
        }

        setFileErrorText(null);
        onFileChange(selectedFile);
    };

    const handleDownload = async () => {
        if (!file) return;
        downloadTextFile(file.name, await file.text());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSubmit) return;

        const inputSource: InputSource = file ? 'file' : 'text';
        clearSubmitError();

        const error = await onSubmit(file ? { file } : { plantUml: plantUmlText });

        if (error) {
            setSubmitError(error);
            setSubmitErrorSource(inputSource);
        }
    };

    return (
        <S.Form onSubmit={handleSubmit}>
            <S.ScrollArea>
                <S.Content>
                    {isNewE2E && (
                        <S.FieldGroup>
                            <Text variant="subtitle1">Данные шага E2E-сценария</Text>
                            <TextField
                                fullWidth
                                label="Название*"
                                value={name}
                                disabled={isSubmitting}
                                onChange={(event) => onNameChange(event.target.value)}
                            />
                            <BIStepCodeFields
                                disabled={isSubmitting}
                                value={biStepCode}
                                onChange={onBIStepCodeChange}
                            />
                        </S.FieldGroup>
                    )}

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
                                            onFileChange(null);
                                            setFileErrorText(null);
                                            clearSubmitError();
                                        }}
                                        aria-label="Удалить файл"
                                    />
                                </S.FileActions>
                            </S.FileRow>
                        )}

                        {submitError && submitErrorSource === 'file' && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={submitError.message}
                                actions={
                                    submitError.activeRunId !== undefined
                                        ? [
                                              {
                                                  label: 'Посмотреть',
                                                  onClick: () =>
                                                      onOpenActiveRun(submitError.activeRunId!),
                                              },
                                          ]
                                        : undefined
                                }
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
                                onPlantUmlTextChange(event.target.value);
                                setFileErrorText(null);
                                clearSubmitError();
                            }}
                        />

                        {submitError && submitErrorSource === 'text' && (
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title={submitError.message}
                                actions={
                                    submitError.activeRunId !== undefined
                                        ? [
                                              {
                                                  label: 'Посмотреть',
                                                  onClick: () =>
                                                      onOpenActiveRun(submitError.activeRunId!),
                                              },
                                          ]
                                        : undefined
                                }
                            />
                        )}
                    </S.FieldGroup>
                </S.Content>
            </S.ScrollArea>
            <S.Footer>
                <S.ButtonContainer>
                    <ProgressButton
                        type="submit"
                        variant="contained"
                        state={isSubmitting ? 'loading' : 'default'}
                        disabled={!canSubmit}
                    >
                        Создать
                    </ProgressButton>
                </S.ButtonContainer>
            </S.Footer>
        </S.Form>
    );
};
