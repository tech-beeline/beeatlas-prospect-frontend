import React, { FC, useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import dayjs from 'dayjs';
import { MarkdownLinkRenderer } from 'features/technologies';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { FileUploader } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatSize } from 'utils/formatters';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { IDocumentationForm } from './types';
import * as S from './units';

export const DocumentationForm: FC<IDocumentationForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
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
        if (savedData.documentationFile) {
            readerRef.current.readAsText(savedData.documentationFile);
        } else {
            setFileText(null);
        }
    }, [savedData.documentationFile]);

    const onSubmit = () => {
        setStepVariant(StepVariants.RULES);
    };

    return (
        <S.FormStyled onSubmit={onSubmit}>
            <S.OverflowContainer>
                <S.Container>
                    <S.FileContainer>
                        <Text variant="subtitle1">Добавить файл</Text>

                        <FileUploader
                            hideFileList
                            accept=".md"
                            subTitle="markdown до 100 мб"
                            onChange={(event) => {
                                setSavedData({
                                    ...savedData,
                                    documentationFile: Array.from(event.target.files ?? [])[0],
                                });
                                event.target.value = '';
                            }}
                        />

                        {savedData.documentationFile && fileText && (
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
                                        <Text variant="body3">
                                            {savedData.documentationFile.name}
                                        </Text>
                                        <Text inactive variant="caption">
                                            {formatSize(savedData.documentationFile.size)}{' '}
                                            {dayjs(savedData.documentationFile.lastModified)
                                                .local()
                                                .format('DD.MM.YYYY, HH:mm')}
                                        </Text>
                                    </S.FileMetadataContainer>
                                    <IconButton
                                        iconName={Icons.Delete}
                                        size="medium"
                                        onClick={() =>
                                            setSavedData({
                                                ...savedData,
                                                documentationFile: undefined,
                                            })
                                        }
                                    />
                                </S.FileNameContainer>
                            </>
                        )}
                    </S.FileContainer>
                </S.Container>
            </S.OverflowContainer>

            <FormFooter
                onCancelButtonClick={() => setStepVariant(StepVariants.GENERAL_INFO)}
                submitButtonDisabled={!savedData.documentationFile}
                submitButtonText="Далее"
            />
        </S.FormStyled>
    );
};
