import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { MarkdownLinkRenderer } from 'features/technologies';
import { MarkdownCodeRenderer } from 'features/technologies/components/MarkdownLinkRenderer';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Banner, FileUploader, Progress, TextArea } from 'components/ui';

import { useValidateWorkspaceMutation } from 'api/queries/patterns';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { IDescriptionForm } from './types';
import * as S from './units';
import { parseDslError, stringToBase64 } from './utils';

export const DescriptionForm: FC<IDescriptionForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
}) => {
    const [showBanner, setShowBanner] = useState(true);

    const [fileText, setFileText] = useState<string | null>(null);
    const readerRef = useRef(new FileReader());

    const { mutateAsync: validateDsl, isPending: pendingValidateDsl } =
        useValidateWorkspaceMutation();

    const [validationState, setValidationState] = useState<{
        status: 'idle' | 'valid' | 'invalid';
        message: string | null;
    }>({ status: 'idle', message: null });
    const lastValidatedContentRef = useRef<string>('');

    const currentContent = savedData.dsl || fileText || '';
    const isContentChanged = lastValidatedContentRef.current !== currentContent;
    const isValid = validationState.status === 'valid';

    const runValidation = async (content: string): Promise<boolean> => {
        if (!content.trim()) {
            setValidationState({ status: 'idle', message: null });
            lastValidatedContentRef.current = '';
            return false;
        }

        setValidationState({ status: 'idle', message: null });

        try {
            await validateDsl({ workspace: stringToBase64(content) });

            lastValidatedContentRef.current = content;
            setValidationState({
                status: 'valid',
                message: 'Проверка завершена. Описание корректно',
            });

            return true;
        } catch (err) {
            lastValidatedContentRef.current = content;
            setValidationState({
                status: 'invalid',
                message: parseDslError(
                    (err as AxiosError<{ detail: { error: string } }>).response?.data?.detail
                        ?.error ?? '',
                ),
            });

            return false;
        }
    };

    useEffect(() => {
        readerRef.current.onload = () =>
            setFileText(
                typeof readerRef.current.result === 'string' ? readerRef.current.result : null,
            );
    }, [readerRef]);

    useEffect(() => {
        if (savedData.dslFile) {
            readerRef.current.readAsText(savedData.dslFile);
        } else {
            setFileText(null);
        }
    }, [savedData.dslFile]);

    useEffect(() => {
        if (fileText) {
            runValidation(currentContent);
        }
    }, [fileText]);

    useEffect(() => {
        if (!savedData.dslFile && !savedData.dsl && validationState.status !== 'idle') {
            setValidationState({ status: 'idle', message: null });
            lastValidatedContentRef.current = '';
        }
    }, [savedData.dslFile, validationState.status]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValid || isContentChanged) {
            const ok = await runValidation(currentContent);
            if (!ok) return;
        }

        setSavedData({ ...savedData, dsl: currentContent });
        setStepVariant(StepVariants.NFR);
    };

    const isSubmitButtonDisabled =
        !currentContent || pendingValidateDsl || (!isContentChanged && !isValid);

    return (
        <S.FormStyled onSubmit={onSubmit}>
            <S.OverflowContainer>
                <S.Container>
                    {showBanner && (
                        <Banner
                            title="Для добавления данных доступны два варианта: вставка текста или загрузка файла с устройства"
                            iconName={Icons.InfoCircled}
                            onClose={() => setShowBanner(false)}
                        />
                    )}
                    {validationState.status === 'invalid' && !fileText && (
                        <Banner
                            title={validationState.message || ''}
                            iconName={Icons.InfoCircled}
                            color="error"
                        />
                    )}
                    {pendingValidateDsl && savedData.dsl && (
                        <S.ProgressContainer>
                            <Progress shape="circle" cycled />
                            <Text variant="body3">Проверка корректности описания</Text>
                        </S.ProgressContainer>
                    )}
                    {(!savedData.dsl || !pendingValidateDsl) && (
                        <TextArea
                            fullWidth
                            value={savedData.dsl}
                            onChange={(e) => {
                                setSavedData({ ...savedData, dsl: e.target.value });
                                if (validationState.status !== 'idle') {
                                    setValidationState({ status: 'idle', message: null });
                                }
                            }}
                            disabled={!!savedData.dslFile}
                            label="Описание архитектуры в structurizr dsl"
                        />
                    )}

                    <S.TextContainer>
                        <Text variant="subtitle1">Добавить файл</Text>
                    </S.TextContainer>

                    <FileUploader
                        hideFileList
                        disabled={!!savedData.dsl}
                        accept=".dsl"
                        subTitle="dsl до 100 мб"
                        onChange={(event) => {
                            setSavedData({
                                ...savedData,
                                dslFile: Array.from(event.target.files ?? [])[0],
                            });
                            event.target.value = '';
                        }}
                    />

                    {savedData.dslFile && fileText && (
                        <>
                            {validationState.status !== 'idle' && (
                                <Banner
                                    title={validationState.message || ''}
                                    iconName={Icons.InfoCircled}
                                    color={validationState.status === 'valid' ? 'success' : 'error'}
                                />
                            )}
                            <S.MarkdownFileContainer>
                                {pendingValidateDsl && (
                                    <S.ProgressContainer>
                                        <Progress shape="circle" cycled />
                                        <Text variant="body3">Проверка корректности описания</Text>
                                    </S.ProgressContainer>
                                )}
                                {!pendingValidateDsl && (
                                    <Markdown
                                        components={{
                                            a: MarkdownLinkRenderer,
                                            code: MarkdownCodeRenderer,
                                        }}
                                        urlTransform={(v) => v}
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {fileText}
                                    </Markdown>
                                )}
                            </S.MarkdownFileContainer>

                            <S.FileNameContainer>
                                <S.FileMetadataContainer>
                                    <Text variant="body3">{savedData.dslFile.name}</Text>
                                    <Text inactive variant="caption">
                                        {formatSize(savedData.dslFile.size)}{' '}
                                        {dayjs(savedData.dslFile.lastModified)
                                            .local()
                                            .format('DD.MM.YYYY, HH:mm')}
                                    </Text>
                                </S.FileMetadataContainer>
                                <IconButton
                                    iconName={Icons.Delete}
                                    size="medium"
                                    onClick={() =>
                                        setSavedData({ ...savedData, dslFile: undefined })
                                    }
                                />
                            </S.FileNameContainer>
                        </>
                    )}
                </S.Container>
            </S.OverflowContainer>
            <FormFooter
                onCancelButtonClick={() => setStepVariant(StepVariants.RULES)}
                submitButtonDisabled={isSubmitButtonDisabled}
                submitButtonText="Далее"
            />
        </S.FormStyled>
    );
};
