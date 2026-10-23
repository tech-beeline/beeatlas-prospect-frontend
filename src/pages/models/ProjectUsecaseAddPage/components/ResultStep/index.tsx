import React, { FC, useEffect, useState } from 'react';

import { Text } from 'components/core';
import {
    Badge,
    Banner,
    Button,
    Icon,
    ProgressButton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useGetAllProductsQuery } from 'api/queries/product';
import { IProjectUsecasePipelineOperation } from 'api/staging-service/types';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { CallDecisionType, IResolutionDraft } from '../../types';
import * as Layout from '../../units';

import { UnmappedPartCard } from './components';
import { OPERATION_STATUS_BADGE } from './const';
import { IResultStep } from './types';
import * as S from './units';
import {
    buildDecisions,
    getDefaultDraft,
    getEmptyDraft,
    getParticipantBadge,
    getSiblingProduct,
    getStepsCount,
    isDecisionOperation,
    isDraftComplete,
    isOperationResolved,
    orderDecisions,
    shareParticipantProduct,
} from './utils';

export const ResultStep: FC<IResultStep> = ({
    result,
    isEditing,
    savingDecision,
    applying,
    cancelling,
    actionError,
    onRestart,
    onApply,
}) => {
    const { data: products = [], isLoading: productsLoading } = useGetAllProductsQuery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editingOperationIds, setEditingOperationIds] = useState<string[]>([]);
    const [drafts, setDrafts] = useState<Record<string, IResolutionDraft>>({});
    const [productOwners, setProductOwners] = useState<Record<string, string>>({});
    const mappedOperations = result.operations.filter(({ status }) => status !== 'unmapped');
    const decisionOperations = result.operations.filter(isDecisionOperation);
    const confirmed = getStepsCount(mappedOperations.filter(({ status }) => status !== 'planned'));
    const unresolved = getStepsCount(
        result.operations.filter(({ status }) => status === 'unmapped'),
    );
    const planned = getStepsCount(mappedOperations.filter(({ status }) => status === 'planned'));
    const disabled = savingDecision || applying || cancelling;

    const getParticipantProduct = (operation: IProjectUsecasePipelineOperation) =>
        result.participants.find(({ alias }) => alias === operation.toAlias)?.productAlias;

    const getDraft = (operation: IProjectUsecasePipelineOperation) =>
        drafts[operation.operationId] ?? getEmptyDraft(getParticipantProduct(operation));

    const remaining = decisionOperations.filter(
        (operation) => !isOperationResolved(operation, getDraft(operation)),
    ).length;

    const currentOperation = decisionOperations[currentIndex];
    const currentOperationId = currentOperation?.operationId;
    const currentProduct = currentOperation && getParticipantProduct(currentOperation);
    const currentStatus = currentOperation?.status;

    useEffect(() => {
        if (!currentOperationId) return;
        setDrafts((current) =>
            current[currentOperationId]
                ? current
                : {
                      ...current,
                      [currentOperationId]: {
                          ...getEmptyDraft(currentProduct),
                          type: currentStatus === 'unmapped' ? CallDecisionType.NOT_A_CALL : null,
                      },
                  },
        );
    }, [currentOperationId, currentProduct, currentStatus]);

    const resolvedCount = decisionOperations.length - remaining;
    const decisionCounts = decisionOperations.reduce<Record<string, number>>(
        (counts, operation) => {
            const draft = getDraft(operation);
            const type = draft.type ?? operation.status;
            if (isOperationResolved(operation, draft)) counts[type] = (counts[type] ?? 0) + 1;
            return counts;
        },
        {},
    );

    const isProductLocked = (operation: IProjectUsecasePipelineOperation) => {
        const owner = productOwners[operation.toAlias];
        return (
            Boolean(getParticipantProduct(operation)) ||
            Boolean(owner && owner !== operation.operationId)
        );
    };

    const setProductOwner = (operation: IProjectUsecasePipelineOperation, owned: boolean) => {
        setProductOwners((current) => {
            const { [operation.toAlias]: owner, ...rest } = current;
            if (owned) return { ...rest, [operation.toAlias]: operation.operationId };
            return owner === operation.operationId ? rest : current;
        });
    };

    const setDraft = (
        operation: IProjectUsecasePipelineOperation,
        patch: Partial<IResolutionDraft>,
    ) => {
        const sharesProduct =
            patch.productAlias !== undefined &&
            !getParticipantProduct(operation) &&
            getDraft(operation).type === CallDecisionType.EXISTING;

        if (sharesProduct) setProductOwner(operation, Boolean(patch.productAlias));

        setDrafts((current) => {
            const next = {
                ...current,
                [operation.operationId]: {
                    ...(current[operation.operationId] ??
                        getDefaultDraft(operation, getParticipantProduct(operation))),
                    ...patch,
                },
            };
            return sharesProduct
                ? shareParticipantProduct(
                      next,
                      decisionOperations,
                      operation,
                      patch.productAlias ?? null,
                  )
                : next;
        });
    };

    const changeType = (operation: IProjectUsecasePipelineOperation, type: CallDecisionType) => {
        if (type !== CallDecisionType.EXISTING) setProductOwner(operation, false);

        setDrafts((current) => ({
            ...current,
            [operation.operationId]: {
                ...getEmptyDraft(
                    getParticipantProduct(operation) ??
                        (type === CallDecisionType.EXISTING
                            ? getSiblingProduct(operation, decisionOperations, current)
                            : null),
                ),
                type,
            },
        }));
    };

    const applyDecisions = () => {
        const decisions = decisionOperations.flatMap((operation) => {
            const draft = getDraft(operation);
            return isDraftComplete(draft)
                ? buildDecisions(operation, draft, getParticipantProduct(operation))
                : [];
        });
        onApply(orderDecisions(decisions));
    };

    return (
        <>
            <Layout.ScrollArea>
                <Layout.Content>
                    <Text variant="subtitle1">Staging собрал Use Case из PlantUML</Text>
                    {actionError && (
                        <Banner color="error" iconName={Icons.WarningCircled} title={actionError} />
                    )}
                    <Layout.Summary>
                        <Layout.SummaryCard $semantic="success">
                            <Text variant="h4">{confirmed}</Text>
                            <Text inactive variant="subtitle3">
                                Подтверждено
                            </Text>
                        </Layout.SummaryCard>
                        <Layout.SummaryCard $semantic="warning">
                            <Text variant="h4">{unresolved}</Text>
                            <Text inactive variant="subtitle3">
                                Требуют решения
                            </Text>
                        </Layout.SummaryCard>
                        <Layout.SummaryCard $semantic="neutral">
                            <Text variant="h4">{planned}</Text>
                            <Text inactive variant="subtitle3">
                                Планируется
                            </Text>
                        </Layout.SummaryCard>
                    </Layout.Summary>
                    <Layout.Section>
                        <Text variant="subtitle1">Список участников</Text>
                        <Layout.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Мнемоника</TableHeaderData>
                                    <TableHeaderData>Название</TableHeaderData>
                                    <TableHeaderData>Статус</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.participants.map((participant) => {
                                    const badge = getParticipantBadge(participant);
                                    return (
                                        <TableRow dense minHeight={52} key={participant.alias}>
                                            <TableData>{participant.alias}</TableData>
                                            <TableData>
                                                {participant.productName ?? participant.name}
                                            </TableData>
                                            <TableData>
                                                <Badge semantic={badge.semantic}>
                                                    {badge.label}
                                                </Badge>
                                            </TableData>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Layout.TableStyled>
                    </Layout.Section>
                    <Layout.Section>
                        <Text variant="subtitle1">Смаппированные части</Text>
                        <Layout.TableStyled>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderData>Шаг</TableHeaderData>
                                    <TableHeaderData>Вызывающий</TableHeaderData>
                                    <TableHeaderData>Вызываемый</TableHeaderData>
                                    <TableHeaderData>Действие</TableHeaderData>
                                    <TableHeaderData>Вызов</TableHeaderData>
                                    <TableHeaderData>Статус вызова</TableHeaderData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mappedOperations.flatMap((operation) =>
                                    operation.steps.map((step) => (
                                        <TableRow
                                            dense
                                            minHeight={52}
                                            key={`${operation.operationId}-${step.partId}`}
                                        >
                                            <TableData>{step.partId}</TableData>
                                            <TableData>{step.fromAlias}</TableData>
                                            <TableData>{operation.toAlias}</TableData>
                                            <TableData>{step.name}</TableData>
                                            <TableData>
                                                {operation.connectionOperation
                                                    ? `${operation.connectionOperation.operationType} ${operation.connectionOperation.operationName}`
                                                    : `${operation.type} ${operation.path}`}
                                            </TableData>
                                            <TableData>
                                                {operation.status !== 'unmapped' && (
                                                    <Badge
                                                        semantic={
                                                            OPERATION_STATUS_BADGE[operation.status]
                                                                .semantic
                                                        }
                                                    >
                                                        {
                                                            OPERATION_STATUS_BADGE[operation.status]
                                                                .label
                                                        }
                                                    </Badge>
                                                )}
                                            </TableData>
                                        </TableRow>
                                    )),
                                )}
                            </TableBody>
                        </Layout.TableStyled>
                    </Layout.Section>
                    <Layout.Section>
                        {unresolved > 0 && <Text variant="subtitle1">Несмаппированные части</Text>}
                        {currentOperation && (
                            <S.ReviewSummary>
                                <S.Pagination>
                                    <Button
                                        aria-label="Предыдущая часть"
                                        disabled={disabled || currentIndex === 0}
                                        startIcon={<Icon iconName={Icons.NavArrowLeft} />}
                                        size="small"
                                        onClick={() => setCurrentIndex((index) => index - 1)}
                                    />
                                    <Text variant="h6">
                                        {currentIndex + 1}/{decisionOperations.length}
                                    </Text>
                                    <Button
                                        aria-label="Следующая часть"
                                        disabled={
                                            disabled ||
                                            currentIndex === decisionOperations.length - 1
                                        }
                                        startIcon={<Icon iconName={Icons.NavArrowRight} />}
                                        size="small"
                                        onClick={() => setCurrentIndex((index) => index + 1)}
                                    />
                                    <Text variant="body2">
                                        Маппинг: {resolvedCount} из {decisionOperations.length} —{' '}
                                        {Math.round(
                                            (resolvedCount / decisionOperations.length) * 100,
                                        )}
                                        %
                                    </Text>
                                </S.Pagination>
                                <S.Metrics>
                                    <Text inactive variant="body3">
                                        В спецификации:{' '}
                                        {(decisionCounts[CallDecisionType.EXISTING] ?? 0) +
                                            (decisionCounts.architect_specified ?? 0) +
                                            (decisionCounts.matched ?? 0)}
                                    </Text>
                                    <Text inactive variant="body3">
                                        Вне спецификации:{' '}
                                        {(decisionCounts[CallDecisionType.EXISTS_UNSPECIFIED] ??
                                            0) + (decisionCounts.exists_unspecified ?? 0)}
                                    </Text>
                                    <Text inactive variant="body3">
                                        К разработке:{' '}
                                        {(decisionCounts[CallDecisionType.DEVELOP] ?? 0) +
                                            (decisionCounts.planned ?? 0)}
                                    </Text>
                                    <Text inactive variant="body3">
                                        Не вызов:{' '}
                                        {(decisionCounts[CallDecisionType.NOT_A_CALL] ?? 0) +
                                            (decisionCounts.not_a_call ?? 0)}
                                    </Text>
                                </S.Metrics>
                            </S.ReviewSummary>
                        )}
                        {currentOperation && (
                            <UnmappedPartCard
                                key={currentOperation.operationId}
                                disabled={disabled}
                                draft={getDraft(currentOperation)}
                                isEditing={
                                    currentOperation.status === 'unmapped' ||
                                    editingOperationIds.includes(currentOperation.operationId)
                                }
                                operation={currentOperation}
                                productLocked={isProductLocked(currentOperation)}
                                products={products}
                                productsLoading={productsLoading}
                                onDraftChange={(patch) => setDraft(currentOperation, patch)}
                                onEdit={() =>
                                    setEditingOperationIds((current) => [
                                        ...current,
                                        currentOperation.operationId,
                                    ])
                                }
                                onTypeChange={(type) => changeType(currentOperation, type)}
                            />
                        )}
                    </Layout.Section>
                </Layout.Content>
            </Layout.ScrollArea>
            <Layout.Footer>
                <Layout.FooterContent>
                    <ProgressButton
                        disabled={disabled}
                        size="medium"
                        state={cancelling ? 'loading' : 'default'}
                        type="button"
                        variant="outlined"
                        onClick={onRestart}
                    >
                        {isEditing ? 'Переделать сценарий' : 'Переделать Use Case'}
                    </ProgressButton>
                    <ProgressButton
                        disabled={disabled || remaining > 0}
                        size="medium"
                        state={applying || savingDecision ? 'loading' : 'default'}
                        type="button"
                        variant="contained"
                        onClick={applyDecisions}
                    >
                        {isEditing ? 'Применить изменения сценария' : 'Применить Use Case'}
                    </ProgressButton>
                </Layout.FooterContent>
            </Layout.Footer>
        </>
    );
};
