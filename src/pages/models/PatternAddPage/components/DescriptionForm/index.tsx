import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useSearchParams } from 'react-router-dom';
import { Banner, FileUploader, IconButton, TextArea } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';
import { MarkdownLinkRenderer } from 'features/technologies';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';

import { useCreatePatternMutation, useUpdatePatternMutation } from 'api/queries/patterns';
import { formatSize } from 'utils/formatters';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { IDescriptionForm } from './types';
import * as S from './units';

export const DescriptionForm: FC<IDescriptionForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
}) => {
    const [fileText, setFileText] = useState<string | null>(null);
    const readerRef = useRef(new FileReader());

    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { mutateAsync, isPending } = useCreatePatternMutation();
    const { mutateAsync: updatePattern } = useUpdatePatternMutation();

    useEffect(() => {
        readerRef.current.onload = () =>
            setFileText(
                typeof readerRef.current.result === 'string' ? readerRef.current.result : null,
            );
    }, [readerRef]);

    useEffect(() => {
        if (savedData.descriptionFile) {
            readerRef.current.readAsText(savedData.descriptionFile);
        } else {
            setFileText(null);
        }
    }, [savedData.descriptionFile]);

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
                    dsl: savedData.dsl ?? '',
                    rule: savedData.rule ?? '',
                },
            });
        } else {
            await mutateAsync({
                groups: savedData.group ?? [],
                relationsTech: savedData.tech ?? [],
                name: savedData.name ?? '',
                rule: savedData.rule ?? '',
                isAntiPattern: savedData.type === 1,
                description: savedData.description ?? '',
                dsl: savedData.dsl ?? '',
            });
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
                    disabled={!!savedData.descriptionFile}
                    label="Описание архитектуры в structurize dsl"
                />

                <S.TextContainer>
                    <Text variant="subtitle1">Вложенный файл</Text>
                </S.TextContainer>

                {!savedData.descriptionFile && (
                    <FileUploader
                        hideFileList
                        disabled={!!savedData.description}
                        accept=".md"
                        subTitle="markdown до 100 мб"
                        onChange={(event) =>
                            setSavedData({
                                ...savedData,
                                descriptionFile: Array.from(event.target.files ?? [])[0],
                            })
                        }
                    />
                )}

                {savedData.descriptionFile && fileText && (
                    <>
                        <S.MarkdownFileContainer>
                            <Markdown
                                components={{ a: MarkdownLinkRenderer }}
                                urlTransform={(v) => v}
                                remarkPlugins={[remarkGfm]}
                            >
                                {fileText}
                            </Markdown>
                        </S.MarkdownFileContainer>

                        <S.FileNameContainer>
                            <S.FileMetadataContainer>
                                <Text variant="body3">{savedData.descriptionFile.name}</Text>
                                <Text inactive variant="caption">
                                    {formatSize(savedData.descriptionFile.size)}{' '}
                                    {dayjs(savedData.descriptionFile.lastModified)
                                        .local()
                                        .format('DD.MM.YYYY, HH:mm')}
                                </Text>
                            </S.FileMetadataContainer>
                            <IconButton
                                iconName={Icons.Delete}
                                size="medium"
                                onClick={() =>
                                    setSavedData({ ...savedData, descriptionFile: undefined })
                                }
                            />
                        </S.FileNameContainer>
                    </>
                )}
            </S.Container>
            <FormFooter
                onCancelButtonClick={() => setStepVariant(StepVariants.RULES)}
                submitButtonDisabled={
                    (!savedData.description && !savedData.descriptionFile) || isPending
                }
                submitButtonText="Создать"
            />
        </S.FormStyled>
    );
};
