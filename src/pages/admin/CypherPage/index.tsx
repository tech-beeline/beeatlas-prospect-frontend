import React, { FC, useEffect, useMemo, useState } from 'react';

import { Tab, Tabs, Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Banner, Button, Skeleton, TextArea } from 'components/ui';

import { ICypherDiagram } from 'api/graph/types';
import { useGetCypherQuery } from 'api/queries/graph';
import { useValidateRulesMutation } from 'api/queries/patterns';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { CypherChip, CypherGraph, CypherTable } from './components';
import { CYPHER_QUERY_EXAMPLES, CYPHER_TABS, DEFAULT_VIEW_MODE } from './const';
import { useCypherPageStore } from './store';
import { CypherStatus, CypherTabVariants } from './types';
import * as S from './units';
import { countNodesAndLinks, getErrorMessage } from './utils';

export const CypherPage: FC = () => {
    const [inputQuery, setInputQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [isFormExpanded, setIsFormExpanded] = useState(true);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [cypherData, setCypherData] = useState<ICypherDiagram[]>([]);
    const [cypherStatus, setCypherStatus] = useState<CypherStatus>(CypherStatus.IDLE);
    const [viewMode, setViewMode] = useState<CypherTabVariants>(DEFAULT_VIEW_MODE);

    const { successfulQueries, addSuccessfulQuery } = useCypherPageStore((s) => ({
        successfulQueries: s.successfulQueries,
        addSuccessfulQuery: s.addSuccessfulQuery,
    }));

    const { mutateAsync: validateRules, isPending: isValidating } = useValidateRulesMutation();
    const { mutateAsync: runCypherQuery, isPending: isCypherLoading } = useGetCypherQuery();

    const { nodesCount, linksCount } = useMemo(() => countNodesAndLinks(cypherData), [cypherData]);
    const trimmedInputQuery = inputQuery.trim();

    useEffect(() => {
        setValidationError(null);
    }, [inputQuery]);

    useEffect(() => {
        if (!submittedQuery || isCypherLoading || cypherStatus !== CypherStatus.SUCCESS) return;

        setIsFormExpanded(false);
        addSuccessfulQuery(submittedQuery);
    }, [submittedQuery, isCypherLoading, cypherStatus]);

    const handleExecuteQuery = async () => {
        if (!trimmedInputQuery) return;

        setValidationError(null);
        setCypherStatus(CypherStatus.IDLE);

        try {
            const res = await validateRules(trimmedInputQuery);
            const isValid = String(res?.valid).toLowerCase() === 'true';

            if (!isValid) {
                setValidationError(res?.error ?? res?.readOnly ?? 'Запрос некорректен');
                return;
            }

            setSubmittedQuery(trimmedInputQuery);

            const response = await runCypherQuery(trimmedInputQuery);

            setCypherData(response ?? []);
            setCypherStatus(CypherStatus.SUCCESS);
        } catch (e: any) {
            setCypherData([]);
            setCypherStatus(CypherStatus.ERROR);

            setValidationError(getErrorMessage(e, 'Ошибка выполнения запроса'));
        }
    };

    return (
        <S.PageWrapper>
            <Text variant="h4">Сypher-запросы</Text>
            <S.FormContainer>
                <S.TitleWrapper>
                    <S.Subtitle variant="h6">Сypher-запросы</S.Subtitle>
                    <S.ToggleIconButton
                        expanded={isFormExpanded}
                        iconName={Icons.NavArrowUp}
                        size="medium"
                        onClick={() => setIsFormExpanded((v) => !v)}
                    />
                </S.TitleWrapper>
                {isFormExpanded && (
                    <>
                        <TextArea
                            id="cypher-query"
                            value={inputQuery}
                            label="Запрос"
                            onChange={(e) => setInputQuery(e.target.value)}
                            size="small"
                            helperPosition="absolute"
                            fullWidth
                        />
                        {!!validationError && (
                            <Banner
                                title={validationError}
                                iconName={Icons.InfoCircled}
                                color="error"
                            />
                        )}

                        <S.SectionBlock>
                            <Text variant="body2" inactive>
                                Примеры
                            </Text>
                            <S.ChipsContainer>
                                {CYPHER_QUERY_EXAMPLES.map((example, index) => (
                                    <CypherChip
                                        key={`${example}-${index}`}
                                        tooltipId={`cypher-example-${index}`}
                                        text={example}
                                        isActive={trimmedInputQuery === example}
                                        onClick={() => setInputQuery(example)}
                                        onClear={() => setInputQuery('')}
                                    />
                                ))}
                            </S.ChipsContainer>
                        </S.SectionBlock>

                        <S.SectionBlock>
                            <Text variant="body2" inactive>
                                Успешные запросы
                            </Text>
                            <S.ChipsContainer>
                                {successfulQueries.map((savedQuery, index) => (
                                    <CypherChip
                                        key={`${savedQuery}-${index}`}
                                        tooltipId={`cypher-success-${index}`}
                                        text={savedQuery}
                                        isActive={trimmedInputQuery === savedQuery}
                                        onClick={() => setInputQuery(savedQuery)}
                                        onClear={() => setInputQuery('')}
                                    />
                                ))}
                            </S.ChipsContainer>
                        </S.SectionBlock>

                        <S.ActionRow>
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={handleExecuteQuery}
                                disabled={isCypherLoading || isValidating || !trimmedInputQuery}
                            >
                                Выполнить
                            </Button>
                        </S.ActionRow>
                    </>
                )}
            </S.FormContainer>

            {cypherData.length > 0 ? (
                <>
                    <S.TabsRow>
                        <Tabs>
                            {CYPHER_TABS.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    href="#"
                                    isActive={viewMode === tab.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setViewMode(tab.id);
                                    }}
                                >
                                    {tab.label({
                                        nodesCount,
                                        linksCount,
                                        rowCount: cypherData.length,
                                    })}
                                </Tab>
                            ))}
                        </Tabs>
                    </S.TabsRow>

                    {viewMode === CypherTabVariants.TABLE && <CypherTable data={cypherData} />}

                    {viewMode === CypherTabVariants.GRAPH && <CypherGraph data={cypherData} />}
                </>
            ) : !submittedQuery ? null : isCypherLoading ? (
                <Skeleton height={300} radius={12} style={{ width: '100%' }} />
            ) : (
                <NotFoundBlock
                    imageVariant={ImageVariants.SEARCH}
                    title="Нет результатов"
                    text="Попробуйте изменить запрос"
                />
            )}
        </S.PageWrapper>
    );
};
