import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import {
    Badge,
    Banner,
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
import * as S from '../../units';

import { UnmappedPartCard } from './components';
import { OPERATION_STATUS_BADGE } from './const';
import { IResultStep } from './types';
import {
    buildDecisions,
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
    savingDecision,
    applying,
    cancelling,
    actionError,
    onRestart,
    onApply,
}) => {
    const { data: products = [], isLoading: productsLoading } = useGetAllProductsQuery();
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
    const remaining = decisionOperations.filter(
        (operation) => !isOperationResolved(operation, drafts[operation.operationId]),
    ).length;
    const disabled = savingDecision || applying || cancelling;

    const getParticipantProduct = (operation: IProjectUsecasePipelineOperation) =>
        result.participants.find(({ alias }) => alias === operation.toAlias)?.productAlias;

    const getDraft = (operation: IProjectUsecasePipelineOperation) =>
        drafts[operation.operationId] ?? getEmptyDraft(getParticipantProduct(operation));

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
                        getEmptyDraft(getParticipantProduct(operation))),
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
            const draft = drafts[operation.operationId];
            return draft && isDraftComplete(draft)
                ? buildDecisions(operation, draft, getParticipantProduct(operation))
                : [];
        });
        onApply(orderDecisions(decisions));
    };

    return (
        <>
            <S.ScrollArea>
                <S.Content>
                    <Text variant="subtitle1">Staging собрал Use Case из PlantUML</Text>
                    {actionError && (
                        <Banner color="error" iconName={Icons.WarningCircled} title={actionError} />
                    )}
                    <S.Summary>
                        <S.SummaryCard $semantic="success">
                            <Text variant="h4">{confirmed}</Text>
                            <Text inactive variant="subtitle3">
                                Подтверждено
                            </Text>
                        </S.SummaryCard>
                        <S.SummaryCard $semantic="warning">
                            <Text variant="h4">{unresolved}</Text>
                            <Text inactive variant="subtitle3">
                                Требуют решения
                            </Text>
                        </S.SummaryCard>
                        <S.SummaryCard $semantic="neutral">
                            <Text variant="h4">{planned}</Text>
                            <Text inactive variant="subtitle3">
                                Планируется
                            </Text>
                        </S.SummaryCard>
                    </S.Summary>
                    <S.Section>
                        <Text variant="subtitle1">Список участников</Text>
                        <S.TableStyled>
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
                                        <TableRow dense key={participant.alias}>
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
                        </S.TableStyled>
                    </S.Section>
                    <S.Section>
                        <Text variant="subtitle1">Смаппированные части</Text>
                        <S.TableStyled>
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
                        </S.TableStyled>
                    </S.Section>
                    <S.Section>
                        <S.SectionTitle>
                            <Text variant="subtitle1">Несмаппированные части</Text>
                            <Text inactive variant="body3">
                                Кол-во частей: {decisionOperations.length}
                            </Text>
                        </S.SectionTitle>
                        {decisionOperations.map((operation) => (
                            <UnmappedPartCard
                                key={operation.operationId}
                                disabled={disabled}
                                draft={getDraft(operation)}
                                isEditing={
                                    operation.status === 'unmapped' ||
                                    editingOperationIds.includes(operation.operationId)
                                }
                                operation={operation}
                                productLocked={isProductLocked(operation)}
                                products={products}
                                productsLoading={productsLoading}
                                onDraftChange={(patch) => setDraft(operation, patch)}
                                onEdit={() =>
                                    setEditingOperationIds((current) => [
                                        ...current,
                                        operation.operationId,
                                    ])
                                }
                                onTypeChange={(type) => changeType(operation, type)}
                            />
                        ))}
                    </S.Section>
                </S.Content>
            </S.ScrollArea>
            <S.Footer>
                <S.FooterContent>
                    {remaining > 0 && (
                        <Text inactive variant="body3">
                            Осталось решений: {remaining}
                        </Text>
                    )}
                    <ProgressButton
                        disabled={disabled}
                        size="medium"
                        state={cancelling ? 'loading' : 'default'}
                        type="button"
                        variant="outlined"
                        onClick={onRestart}
                    >
                        Переделать Use Case
                    </ProgressButton>
                    <ProgressButton
                        disabled={disabled || remaining > 0}
                        size="medium"
                        state={applying || savingDecision ? 'loading' : 'default'}
                        type="button"
                        variant="contained"
                        onClick={applyDecisions}
                    >
                        Применить Use Case
                    </ProgressButton>
                </S.FooterContent>
            </S.Footer>
        </>
    );
};
