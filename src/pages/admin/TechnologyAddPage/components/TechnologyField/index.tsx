import React, { FC, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Markdown from 'react-markdown';
import dayjs from 'dayjs';
import { MarkdownLinkRenderer, TechnologyFileContainer } from 'features/technologies';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';
import { MultiSelect, RadioGroupBoolean, Select, TextArea, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Button, FileUploader, Icon, Skeleton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';

import { FormValues } from '../../form';

import { ITechnologyField } from './types';
import * as S from './units';

export const TechnologyField: FC<ITechnologyField> = ({
    isLoading,
    categoriesData,
    isLoadingFileData,
    fileList,
    setFileList,
}) => {
    const [fileText, setFileText] = useState<string | null>(null);
    const readerRef = useRef(new FileReader());

    useEffect(() => {
        readerRef.current.onload = () =>
            setFileText(
                typeof readerRef.current.result === 'string' ? readerRef.current.result : null,
            );
    }, [readerRef]);

    useEffect(() => {
        if (fileList[0]) {
            readerRef.current.readAsText(fileList[0]);
        } else {
            setFileText(null);
        }
    }, [fileList]);

    const { watch } = useFormContext<FormValues>();
    const comment = watch('comment');

    return (
        <S.Container>
            <S.FieldContainer>
                <S.FormRow>
                    <S.GrowContainer>
                        <TextField fullWidth name="name" label="Название*" disabled={isLoading} />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <MultiSelect
                            fullWidth
                            name="categories"
                            label="Группа"
                            options={
                                categoriesData?.map((category) => ({
                                    id: category.id,
                                    value: category.name,
                                })) ?? []
                            }
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                </S.FormRow>
                <S.FormRow>
                    <S.GrowContainer>
                        <Select
                            fullWidth
                            name="sector"
                            label="Сектор*"
                            options={[
                                { id: 1, value: 'Фреймворки и инструменты' },
                                { id: 2, value: 'Платформа и инфраструктура' },
                                { id: 3, value: 'Управление данными' },
                                { id: 4, value: 'Языки' },
                            ]}
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                    <S.GrowContainer>
                        <Select
                            fullWidth
                            name="ring"
                            label="Статус*"
                            options={[
                                { id: 1, value: 'Adopt' },
                                { id: 2, value: 'Trial' },
                                { id: 3, value: 'Assess' },
                                { id: 4, value: 'Hold' },
                            ]}
                            disabled={isLoading}
                        />
                    </S.GrowContainer>
                </S.FormRow>
                <TextArea
                    name="comment"
                    label="Короткое описание"
                    helperText={`${comment?.length ?? 0}/255`}
                    maxLength={255}
                    disabled={isLoading}
                />

                <S.CriticalContainer>
                    <Text variant="subtitle1">
                        Технология допустима для использования в объекте критической инфраструктуры
                    </Text>
                </S.CriticalContainer>

                <S.RadioGroupContainer>
                    <RadioGroupBoolean name="isCritical" disabled={isLoading} />
                </S.RadioGroupContainer>

                <S.FileContainer>
                    <Text variant="subtitle1">Вложенный файл</Text>
                    {fileList.length === 0 && !isLoadingFileData && (
                        <>
                            <S.BannerContainer>
                                <Icon iconName={Icons.InfoCircled} size="medium" color="blue" />
                                <Text variant="body3">
                                    Для загрузки данных используйте шаблоны. Файлы с другой
                                    структурой загружаться не будут
                                </Text>
                                <a
                                    href="/templates/tech/tech_doc_template.md"
                                    download="tech_doc_template.md"
                                    target="_blank"
                                >
                                    <Button
                                        startIcon={<Icon iconName={Icons.Download} />}
                                        type="button"
                                    >
                                        Скачать шаблон
                                    </Button>
                                </a>
                            </S.BannerContainer>
                            <FileUploader
                                hideFileList
                                subTitle="markdown до 100 мб"
                                accept=".md"
                                onChange={(event) =>
                                    setFileList(Array.from(event.target.files ?? []))
                                }
                            />
                        </>
                    )}
                    {fileList.length > 0 && (
                        <S.UploadedFileContainer>
                            <TechnologyFileContainer>
                                <Markdown
                                    components={{ a: MarkdownLinkRenderer }}
                                    urlTransform={(v) => v}
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {fileText}
                                </Markdown>
                            </TechnologyFileContainer>
                            <S.FileNameContainer>
                                <S.FileMetadataContainer>
                                    <Text variant="body3">{fileList[0].name}</Text>
                                    <Text inactive variant="caption">
                                        {formatSize(fileList[0].size)}{' '}
                                        {dayjs(fileList[0].lastModified)
                                            .local()
                                            .format('DD.MM.YYYY, HH:mm')}
                                    </Text>
                                </S.FileMetadataContainer>
                                <IconButton
                                    iconName={Icons.Delete}
                                    size="medium"
                                    onClick={() => setFileList([])}
                                />
                            </S.FileNameContainer>
                        </S.UploadedFileContainer>
                    )}
                    {isLoadingFileData && <Skeleton height={200} radius={12} />}
                </S.FileContainer>
            </S.FieldContainer>
        </S.Container>
    );
};
