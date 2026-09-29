import React, { FC, useMemo, useState } from 'react';

import { Text } from 'components/core';
import { type Option, Autocomplete, Badge, Button, Icon, Radio } from 'components/ui';

import { IFullProductData } from 'api/product/types';
import { useGetProductStructurizrContainerByCmdbQuery } from 'api/queries/product';
import { IProjectUsecasePipelineOperation } from 'api/staging-service/types';
import { ProjectUsecaseResolutionType } from 'api/usecase';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IResolutionDraft, IResolutionSelection } from '../../../../types';
import * as S from '../../../../units';

interface IUnmappedPartCardProps {
    operation: IProjectUsecasePipelineOperation;
    products: IFullProductData[];
    productsLoading: boolean;
    draft: IResolutionDraft;
    isEditing: boolean;
    disabled: boolean;
    onEdit: () => void;
    onTypeChange: (type: ProjectUsecaseResolutionType) => void;
    onDraftChange: (patch: Partial<IResolutionDraft>) => void;
    onSave: (selection: IResolutionSelection) => Promise<boolean>;
}

const matchesSearch = (value: string, search: string) =>
    value.toLocaleLowerCase('ru').includes(search.trim().toLocaleLowerCase('ru'));

export const UnmappedPartCard: FC<IUnmappedPartCardProps> = ({
    operation,
    products,
    productsLoading,
    draft,
    isEditing,
    disabled,
    onEdit,
    onTypeChange,
    onDraftChange,
    onSave,
}) => {
    const [productSearch, setProductSearch] = useState('');
    const [containerSearch, setContainerSearch] = useState('');
    const [interfaceSearch, setInterfaceSearch] = useState('');
    const [operationSearch, setOperationSearch] = useState('');
    const { data: containers = [], isLoading: containersLoading } =
        useGetProductStructurizrContainerByCmdbQuery(draft.productAlias);
    const productOptions = useMemo<Option<string>[]>(
        () =>
            products
                .map((product) => ({
                    id: product.alias,
                    value: `${product.name} (${product.alias})`,
                }))
                .filter((option) => matchesSearch(option.value, productSearch)),
        [productSearch, products],
    );
    const containerOptions = useMemo<Option<string>[]>(
        () =>
            containers
                .filter(({ deletedDate }) => !deletedDate)
                .map((container) => ({ id: container.id, value: container.name }))
                .filter((option) => matchesSearch(option.value, containerSearch)),
        [containerSearch, containers],
    );
    const selectedContainer = containers.find(({ id }) => id === draft.containerId);
    const interfaceOptions = useMemo<Option<string>[]>(
        () =>
            (selectedContainer?.interfaces ?? [])
                .filter(({ deletedDate }) => !deletedDate)
                .map((item) => ({ id: item.id, value: item.name }))
                .filter((option) => matchesSearch(option.value, interfaceSearch)),
        [interfaceSearch, selectedContainer],
    );
    const selectedInterface = selectedContainer?.interfaces.find(
        ({ id }) => id === draft.interfaceId,
    );
    const operationOptions = useMemo<Option<string>[]>(
        () =>
            (selectedInterface?.operations ?? [])
                .filter(({ deletedDate }) => !deletedDate)
                .map((item) => ({ id: item.id, value: `${item.type} ${item.name}` }))
                .filter((option) => matchesSearch(option.value, operationSearch)),
        [operationSearch, selectedInterface],
    );
    const selectedOperation = selectedInterface?.operations.find(
        ({ id }) => id === draft.operationId,
    );
    const canSave =
        draft.type === ProjectUsecaseResolutionType.EXISTING
            ? Boolean(
                  draft.productAlias && selectedContainer && selectedInterface && selectedOperation,
              )
            : draft.type === ProjectUsecaseResolutionType.NEW
            ? Boolean(draft.productAlias)
            : draft.type === ProjectUsecaseResolutionType.PLANNED;
    const partIds = operation.steps.map(({ partId }) => partId).join(', ');
    const callers = [...new Set(operation.steps.map(({ fromAlias }) => fromAlias))].join(', ');
    const resolved = operation.status !== 'unmapped';

    const saveResolution = async () => {
        if (!draft.type) return;

        if (draft.type === ProjectUsecaseResolutionType.EXISTING) {
            if (
                !draft.productAlias ||
                !selectedContainer ||
                !selectedInterface ||
                !selectedOperation
            )
                return;
            await onSave({
                type: ProjectUsecaseResolutionType.EXISTING,
                productAlias: draft.productAlias,
                connectionOperation: {
                    id: selectedOperation.id,
                    interfaceId: selectedInterface.id,
                    operationType: selectedOperation.type,
                    operationName: selectedOperation.name,
                    interfaceCode: selectedInterface.code ?? '',
                    containerCode: selectedContainer.code,
                    productAlias: draft.productAlias,
                },
            });
            return;
        }

        if (draft.type === ProjectUsecaseResolutionType.NEW) {
            if (!draft.productAlias) return;
            await onSave({
                type: ProjectUsecaseResolutionType.NEW,
                productAlias: draft.productAlias,
            });
            return;
        }

        await onSave({ type: ProjectUsecaseResolutionType.PLANNED });
    };

    return (
        <S.UnmappedCard>
            <S.CardHeader>
                <div>
                    <Text variant="body2">
                        {partIds || operation.operationId} {callers} — {operation.toAlias}{' '}
                        {operation.type} {operation.path}
                    </Text>
                    <Text inactive variant="body3">
                        {operation.reason ?? 'Решение задано архитектором'}
                    </Text>
                </div>
                {resolved ? (
                    <S.ChoiceRow>
                        <Badge semantic={operation.status === 'planned' ? 'neutral' : 'success'}>
                            {operation.status === 'planned' ? 'Планируется' : 'Подтверждён'}
                        </Badge>
                        <Button
                            disabled={disabled}
                            size="small"
                            type="button"
                            variant="outlined"
                            startIcon={<Icon iconName={Icons.Edit} />}
                            onClick={onEdit}
                        />
                    </S.ChoiceRow>
                ) : (
                    <Badge semantic="warning">Требует решения</Badge>
                )}
            </S.CardHeader>
            {isEditing && (
                <>
                    <S.Option>
                        <Radio
                            checked={draft.type === ProjectUsecaseResolutionType.EXISTING}
                            disabled={disabled}
                            label={
                                <S.OptionLabel>
                                    <Text variant="body2">Указать существующие</Text>
                                    <Text inactive variant="caption">
                                        Выбрать приложение, контейнер, интерфейс и операцию
                                    </Text>
                                </S.OptionLabel>
                            }
                            name={`resolution-${operation.operationId}`}
                            onChange={() => {
                                setProductSearch('');
                                setContainerSearch('');
                                setInterfaceSearch('');
                                setOperationSearch('');
                                onTypeChange(ProjectUsecaseResolutionType.EXISTING);
                            }}
                        />
                        {draft.type === ProjectUsecaseResolutionType.EXISTING && (
                            <S.ResolutionFields>
                                <Autocomplete
                                    fullWidth
                                    disabled={disabled}
                                    label="Приложение (мнемоника)"
                                    loading={productsLoading}
                                    options={productOptions}
                                    renderValue={(option) => option.value}
                                    type="select"
                                    value={
                                        productOptions.find(
                                            ({ id }) => id === draft.productAlias,
                                        ) ?? null
                                    }
                                    onChange={(option) => {
                                        setProductSearch('');
                                        setContainerSearch('');
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            productAlias: String(option.id),
                                            containerId: null,
                                            interfaceId: null,
                                            operationId: null,
                                        });
                                    }}
                                    onInputChange={(search) => {
                                        setProductSearch(search);
                                        setContainerSearch('');
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            productAlias: null,
                                            containerId: null,
                                            interfaceId: null,
                                            operationId: null,
                                        });
                                    }}
                                    onInputClear={() => {
                                        setProductSearch('');
                                        setContainerSearch('');
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            productAlias: null,
                                            containerId: null,
                                            interfaceId: null,
                                            operationId: null,
                                        });
                                    }}
                                />
                                <Autocomplete
                                    key={draft.productAlias ?? 'no-product'}
                                    fullWidth
                                    disabled={disabled || !draft.productAlias}
                                    label="Контейнер"
                                    loading={containersLoading}
                                    options={containerOptions}
                                    renderValue={(option) => option.value}
                                    type="select"
                                    value={
                                        containerOptions.find(
                                            ({ id }) => id === draft.containerId,
                                        ) ?? null
                                    }
                                    onChange={(option) => {
                                        setContainerSearch('');
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            containerId: Number(option.id) || null,
                                            interfaceId: null,
                                            operationId: null,
                                        });
                                    }}
                                    onInputChange={(search) => {
                                        setContainerSearch(search);
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            containerId: null,
                                            interfaceId: null,
                                            operationId: null,
                                        });
                                    }}
                                    onInputClear={() => {
                                        setContainerSearch('');
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            containerId: null,
                                            interfaceId: null,
                                            operationId: null,
                                        });
                                    }}
                                />
                                <Autocomplete
                                    key={draft.containerId ?? 'no-container'}
                                    fullWidth
                                    disabled={disabled || !draft.containerId}
                                    label="Интерфейс"
                                    options={interfaceOptions}
                                    renderValue={(option) => option.value}
                                    type="select"
                                    value={
                                        interfaceOptions.find(
                                            ({ id }) => id === draft.interfaceId,
                                        ) ?? null
                                    }
                                    onChange={(option) => {
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({
                                            interfaceId: Number(option.id) || null,
                                            operationId: null,
                                        });
                                    }}
                                    onInputChange={(search) => {
                                        setInterfaceSearch(search);
                                        setOperationSearch('');
                                        onDraftChange({ interfaceId: null, operationId: null });
                                    }}
                                    onInputClear={() => {
                                        setInterfaceSearch('');
                                        setOperationSearch('');
                                        onDraftChange({ interfaceId: null, operationId: null });
                                    }}
                                />
                                <Autocomplete
                                    key={draft.interfaceId ?? 'no-interface'}
                                    fullWidth
                                    disabled={disabled || !draft.interfaceId}
                                    label="Операция"
                                    options={operationOptions}
                                    renderValue={(option) => option.value}
                                    type="select"
                                    value={
                                        operationOptions.find(
                                            ({ id }) => id === draft.operationId,
                                        ) ?? null
                                    }
                                    onChange={(option) => {
                                        setOperationSearch('');
                                        onDraftChange({
                                            operationId: Number(option.id) || null,
                                        });
                                    }}
                                    onInputChange={(search) => {
                                        setOperationSearch(search);
                                        onDraftChange({ operationId: null });
                                    }}
                                    onInputClear={() => {
                                        setOperationSearch('');
                                        onDraftChange({ operationId: null });
                                    }}
                                />
                            </S.ResolutionFields>
                        )}
                    </S.Option>
                    <S.Option>
                        <Radio
                            checked={draft.type === ProjectUsecaseResolutionType.NEW}
                            disabled={disabled}
                            label={
                                <S.OptionLabel>
                                    <Text variant="body2">Требовать новые</Text>
                                    <Text inactive variant="caption">
                                        Создать интерфейс/контейнер в результате проекта
                                    </Text>
                                </S.OptionLabel>
                            }
                            name={`resolution-${operation.operationId}`}
                            onChange={() => {
                                setProductSearch('');
                                onTypeChange(ProjectUsecaseResolutionType.NEW);
                            }}
                        />
                        {draft.type === ProjectUsecaseResolutionType.NEW && (
                            <S.ResolutionFields>
                                <Autocomplete
                                    fullWidth
                                    disabled={disabled}
                                    label="Приложение (мнемоника)"
                                    loading={productsLoading}
                                    options={productOptions}
                                    renderValue={(option) => option.value}
                                    type="select"
                                    value={
                                        productOptions.find(
                                            ({ id }) => id === draft.productAlias,
                                        ) ?? null
                                    }
                                    onChange={(option) => {
                                        setProductSearch('');
                                        onDraftChange({
                                            productAlias: String(option.id),
                                        });
                                    }}
                                    onInputChange={(search) => {
                                        setProductSearch(search);
                                        onDraftChange({ productAlias: null });
                                    }}
                                    onInputClear={() => {
                                        setProductSearch('');
                                        onDraftChange({ productAlias: null });
                                    }}
                                />
                            </S.ResolutionFields>
                        )}
                    </S.Option>
                    <S.Option>
                        <Radio
                            checked={draft.type === ProjectUsecaseResolutionType.PLANNED}
                            disabled={disabled}
                            label={
                                <S.OptionLabel>
                                    <Text variant="body2">Запланировать</Text>
                                    <Text inactive variant="caption">
                                        Операция планируется
                                    </Text>
                                </S.OptionLabel>
                            }
                            name={`resolution-${operation.operationId}`}
                            onChange={() => onTypeChange(ProjectUsecaseResolutionType.PLANNED)}
                        />
                    </S.Option>
                    {draft.type !== null && (
                        <S.ResolutionFooter>
                            <Button
                                disabled={disabled || !canSave}
                                size="small"
                                type="button"
                                variant="outlined"
                                onClick={() => void saveResolution()}
                            >
                                Сохранить решение
                            </Button>
                        </S.ResolutionFooter>
                    )}
                </>
            )}
        </S.UnmappedCard>
    );
};
