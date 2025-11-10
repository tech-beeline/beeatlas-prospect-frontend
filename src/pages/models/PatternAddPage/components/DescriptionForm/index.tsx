import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Banner, FileUploader, IconButton, TextArea } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';
import { MarkdownLinkRenderer } from 'features/technologies';
import { MarkdownCodeRenderer } from 'features/technologies/components/MarkdownLinkRenderer';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';

import {
    useCreatePatternMutation,
    useUpdatePatternMutation,
    useUploadPatternFileMutation,
} from 'api/queries/patterns';
import * as R from 'router/const';
import { formatSize } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { IDescriptionForm } from './types';
import * as S from './units';

export const DescriptionForm: FC<IDescriptionForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const navigate = useNavigate();

    const [fileText, setFileText] = useState<string | null>(null);
    const readerRef = useRef(new FileReader());

    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { mutateAsync: createPattern, isPending } = useCreatePatternMutation();
    const { mutateAsync: updatePattern } = useUpdatePatternMutation();
    const { mutateAsync: uploadPatternFile } = useUploadPatternFileMutation();

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

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (paramId) {
            await updatePattern({
                id: Number(paramId),
                data: {
                    name: savedData.name ?? '',
                    isAntiPattern: savedData.type === 0 ? false : true,
                    description: savedData.description ?? '',
                    groups: savedData.group ?? [],
                    relationsTech: savedData.tech ?? [],
                    rule: savedData.rule ?? '',
                    dsl: savedData.dsl ? savedData.dsl : fileText ? fileText : '',
                },
            });
            if (savedData.documentationFile) {
                await uploadPatternFile({
                    file: savedData.documentationFile,
                    patternId: Number(paramId),
                });
            }
            showSnackbar({ message: 'Изменения сохранены' });
            navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${paramId}`);
        } else {
            const { id } = await createPattern({
                name: savedData.name ?? '',
                isAntiPattern: savedData.type === 1,
                description: savedData.description ?? '',
                groups: savedData.group ?? [],
                relationsTech: savedData.tech ?? [],
                rule: savedData.rule ?? '',
                dsl: savedData.dsl ? savedData.dsl : fileText ? fileText : '',
            });
            if (savedData.documentationFile) {
                await uploadPatternFile({ file: savedData.documentationFile, patternId: id });
            }
            showSnackbar({ message: 'Паттерн создан' });
            navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.VIEW_PATH}?id=${id}`);
        }
    };

    return (
        <S.FormStyled onSubmit={onSubmit}>
            <S.Container>
                <Banner
                    title="Для добавления данных доступны два варианта: вставка текста или загрузка файла с устройства"
                    iconName={Icons.InfoCircled}
                />

                <TextArea
                    fullWidth
                    value={savedData.dsl}
                    onChange={(e) => setSavedData({ ...savedData, dsl: e.target.value })}
                    disabled={!!savedData.dslFile}
                    label="Описание архитектуры в structurize dsl"
                />

                <S.TextContainer>
                    <Text variant="subtitle1">Вложенный файл</Text>
                </S.TextContainer>

                {!savedData.dslFile && (
                    <FileUploader
                        hideFileList
                        disabled={!!savedData.dsl}
                        accept=".dsl"
                        subTitle="markdown до 100 мб"
                        onChange={(event) =>
                            setSavedData({
                                ...savedData,
                                dslFile: Array.from(event.target.files ?? [])[0],
                            })
                        }
                    />
                )}

                {savedData.dslFile && fileText && (
                    <>
                        <S.MarkdownFileContainer>
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
                                onClick={() => setSavedData({ ...savedData, dslFile: undefined })}
                            />
                        </S.FileNameContainer>
                    </>
                )}
            </S.Container>
            <FormFooter
                onCancelButtonClick={() => setStepVariant(StepVariants.RULES)}
                submitButtonDisabled={(!savedData.description && !savedData.dslFile) || isPending}
                submitButtonText={paramId ? 'Сохранить изменения' : 'Создать'}
            />
        </S.FormStyled>
    );
};
