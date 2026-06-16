import React, { FC, useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { MarkdownLinkRenderer } from 'features/technologies';
import remarkGfm from 'remark-gfm';

import { Text } from 'components/core';
import { Progress } from 'components/ui';

import * as S from './units';

export const RulesPage: FC = () => {
    const [fileText, setFileText] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const readerRef = useRef(new FileReader());

    useEffect(() => {
        readerRef.current.onload = () => {
            setFileText(
                typeof readerRef.current.result === 'string' ? readerRef.current.result : null,
            );
            setLoading(false);
        };

        readerRef.current.onerror = () => {
            setLoading(false);
        };
    }, []);

    useEffect(() => {
        fetch('/docs/cypher-developer-guide.md')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Файл не найден');
                }
                return response.blob();
            })
            .then((blob) => {
                readerRef.current.readAsText(blob);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <S.PageWrapper>
            <S.Container>
                <Text variant="h4">Инструкция по разработке правил идентификации архитектуры</Text>
                <S.MarkdownFileContainer>
                    {loading ? (
                        <S.ProgressContainer>
                            <Progress shape="circle" cycled />
                            <Text variant="body3">Загрузка файла</Text>
                        </S.ProgressContainer>
                    ) : fileText ? (
                        <Markdown
                            components={{ a: MarkdownLinkRenderer }}
                            urlTransform={(v) => v}
                            remarkPlugins={[remarkGfm]}
                        >
                            {fileText}
                        </Markdown>
                    ) : (
                        <Text variant="body2" inactive>
                            Файл инструкции не найден
                        </Text>
                    )}
                </S.MarkdownFileContainer>
            </S.Container>
        </S.PageWrapper>
    );
};
