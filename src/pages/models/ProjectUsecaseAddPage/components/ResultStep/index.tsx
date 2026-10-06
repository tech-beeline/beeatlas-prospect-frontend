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
import {
    IProjectUsecaseMappingDecision,
    IProjectUsecasePipelineOperation,
    IProjectUsecasePipelineResult,
} from 'api/staging-service/types';
import { ProjectUsecaseResolutionType } from 'api/usecase';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IResolutionDraft, IResolutionSelection } from '../../types';
import * as S from '../../units';

import { UnmappedPartCard } from './components';

interface IResultStepProps {
    result: IProjectUsecasePipelineResult;
    savingDecision: boolean;
    applying: boolean;
    cancelling: boolean;
    actionError: string | null;
    onSaveDecision: (decision: IProjectUsecaseMappingDecision) => Promise<boolean>;
    onRestart: () => void;
    onApply: () => void;
}

const getEmptyDraft = (productAlias?: string): IResolutionDraft => ({
    type: null,
    productAlias: productAlias ?? null,
    containerId: null,
    interfaceId: null,
    operationId: null,
});

const isArchitectDecision = (operation: IProjectUsecasePipelineOperation) =>
    operation.source === 'architect_decision' ||
    operation.status === 'architect_specified' ||
    operation.status === 'planned';

const getStepsCount = (operations: IProjectUsecasePipelineOperation[]) =>
    operations.reduce((count, operation) => count + operation.steps.length, 0);

export const ResultStep: FC<IResultStepProps> = ({
    result,
    savingDecision,
    applying,
    cancelling,
    actionError,
    onSaveDecision,
    onRestart,
    onApply,
}) => {
    const { data: products = [], isLoading: productsLoading } = useGetAllProductsQuery();
    const [editingOperationId, setEditingOperationId] = useState<string | null>(null);
    const [resolutionDrafts, setResolutionDrafts] = useState<Record<string, IResolutionDraft>>({});
    const mappedOperations = result.operations.filter(({ status }) => status !== 'unmapped');
    const unresolvedOperations = result.operations.filter(({ status }) => status === 'unmapped');
    const decisionOperations = result.operations.filter(
        (operation) => operation.status === 'unmapped' || isArchitectDecision(operation),
    );
    const confirmed = getStepsCount(mappedOperations.filter(({ status }) => status !== 'planned'));
    const unresolved = getStepsCount(unresolvedOperations);
    const planned = getStepsCount(mappedOperations.filter(({ status }) => status === 'planned'));
    const disabled = savingDecision || applying || cancelling;

    const getParticipantProduct = (operation: IProjectUsecasePipelineOperation) =>
        result.participants.find(({ alias }) => alias === operation.toAlias)?.productAlias;

    const getDraft = (operation: IProjectUsecasePipelineOperation) => {
        const savedDraft = resolutionDrafts[operation.operationId];
        if (savedDraft) return savedDraft;

        const draft = getEmptyDraft(
            operation.connectionOperation?.productAlias ?? getParticipantProduct(operation),
        );
        if (operation.status === 'architect_specified') {
            draft.type = ProjectUsecaseResolutionType.EXISTING;
        }
        if (operation.status === 'planned') {
            draft.type = ProjectUsecaseResolutionType.PLANNED;
        }
        return draft;
    };

    const setDraft = (
        operation: IProjectUsecasePipelineOperation,
        patch: Partial<IResolutionDraft>,
    ) => {
        setResolutionDrafts((current) => ({
            ...current,
            [operation.operationId]: {
                ...(current[operation.operationId] ?? getDraft(operation)),
                ...patch,
            },
        }));
    };

    const saveResolution = async (
        operation: IProjectUsecasePipelineOperation,
        selection: IResolutionSelection,
    ) => {
        if (
            selection.type === ProjectUsecaseResolutionType.EXISTING &&
            !getParticipantProduct(operation)
        ) {
            const productSaved = await onSaveDecision({
                type: 'product',
                participant: operation.toAlias,
                productAlias: selection.productAlias,
            });
            if (!productSaved) return false;
        }

        const saved = await onSaveDecision(
            selection.type === ProjectUsecaseResolutionType.EXISTING
                ? {
                      type: 'map_existing',
                      operationId: operation.operationId,
                      connectionOperation: selection.connectionOperation,
                      participant: operation.toAlias,
                      productAlias: selection.productAlias,
                  }
                : selection.type === ProjectUsecaseResolutionType.NEW
                ? {
                      type: 'product',
                      operationId: operation.operationId,
                      participant: operation.toAlias,
                      productAlias: selection.productAlias,
                  }
                : {
                      type: 'planned',
                      operationId: operation.operationId,
                  },
        );

        if (saved) setEditingOperationId(null);
        return saved;
    };

    return (
        <>
            <S.ScrollArea>
                <S.Content>
                    <Text variant="subtitle1">Staging собрал сценарий из PlantUML</Text>
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
                                {result.participants.map((participant) => (
                                    <TableRow dense key={participant.alias}>
                                        <TableData>{participant.alias}</TableData>
                                        <TableData>
                                            {participant.productName ?? participant.name}
                                        </TableData>
                                        <TableData>
                                            <Badge
                                                semantic={
                                                    participant.resolved ? 'success' : 'danger'
                                                }
                                            >
                                                {participant.resolved
                                                    ? 'Распознано'
                                                    : 'Не распознано'}
                                            </Badge>
                                        </TableData>
                                    </TableRow>
                                ))}
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
                                                <Badge
                                                    semantic={
                                                        operation.status === 'planned'
                                                            ? 'neutral'
                                                            : 'success'
                                                    }
                                                >
                                                    {operation.status === 'planned'
                                                        ? 'Планируется'
                                                        : 'Подтверждён'}
                                                </Badge>
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
                        {decisionOperations.map((operation) => {
                            const draft = getDraft(operation);
                            return (
                                <UnmappedPartCard
                                    key={`${operation.operationId}-${operation.status}-${
                                        operation.connectionOperation?.id ?? ''
                                    }`}
                                    disabled={disabled}
                                    draft={draft}
                                    isEditing={
                                        operation.status === 'unmapped' ||
                                        editingOperationId === operation.operationId
                                    }
                                    operation={operation}
                                    products={products}
                                    productsLoading={productsLoading}
                                    onDraftChange={(patch) => setDraft(operation, patch)}
                                    onEdit={() => setEditingOperationId(operation.operationId)}
                                    onSave={(selection) => saveResolution(operation, selection)}
                                    onTypeChange={(type) =>
                                        setDraft(operation, {
                                            ...getEmptyDraft(getParticipantProduct(operation)),
                                            type,
                                        })
                                    }
                                />
                            );
                        })}
                    </S.Section>
                </S.Content>
            </S.ScrollArea>
            <S.Footer>
                <S.FooterContent>
                    <ProgressButton
                        disabled={disabled}
                        size="medium"
                        state={cancelling ? 'loading' : 'default'}
                        type="button"
                        variant="outlined"
                        onClick={onRestart}
                    >
                        Переделать сценарий
                    </ProgressButton>
                    <ProgressButton
                        disabled={disabled}
                        size="medium"
                        state={applying ? 'loading' : 'default'}
                        type="button"
                        variant="contained"
                        onClick={onApply}
                    >
                        Применить сценарий
                    </ProgressButton>
                </S.FooterContent>
            </S.Footer>
        </>
    );
};
