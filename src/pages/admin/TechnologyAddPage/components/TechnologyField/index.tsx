import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, FileUploader, Icon, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { MultiSelect, Select, TextArea, TextField } from 'components/form';

import { formatSize } from 'utils/formatters';

import { FormValues } from '../../form';

import { ITechnologyField } from './types';
import * as S from './units';

export const TechnologyField: FC<ITechnologyField> = ({
    isLoading,
    categoriesData,
    fileList,
    setFileList,
}) => {
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
                <TextField
                    name="link"
                    label="Ссылка на страницу с описанием технологии"
                    disabled={isLoading}
                />
                <TextArea
                    name="comment"
                    label="Короткое описание"
                    helperText={`${comment?.length ?? 0}/255`}
                    maxLength={255}
                    disabled={isLoading}
                />

                <S.FileContainer>
                    <Text variant="subtitle1">Вложенный файл</Text>
                    {fileList.length === 0 && (
                        <>
                            <S.BannerContainer>
                                <Icon iconName={Icons.InfoCircled} size="medium" color="blue" />
                                <Text variant="body3">
                                    Для загрузки данных используйте шаблоны. Файлы с другой
                                    структурой загружаться не будут
                                </Text>
                                <Button
                                    startIcon={<Icon iconName={Icons.Download} />}
                                    type="button"
                                >
                                    Скачать шаблон
                                </Button>
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
                            <S.FileContentContainer>
                                <Text inactive variant="h4">
                                    Контент файла
                                </Text>
                            </S.FileContentContainer>
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
                </S.FileContainer>
            </S.FieldContainer>
        </S.Container>
    );
};
