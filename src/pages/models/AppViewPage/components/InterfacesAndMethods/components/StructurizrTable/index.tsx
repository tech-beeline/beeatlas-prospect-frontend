import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { has } from 'lodash';

import { AutocompleteControlled } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Button,
    ButtonGroup,
    Icon,
    Select,
    Skeleton,
    Table,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { IStructurizrContainerInterfaceData, IStructurizrOperation } from 'api/product/types';
import { useGetProductStructurizrContainerByCmdbQuery } from 'api/queries/product';
import {
    useGetSubscribedInerfacesIdsQuery,
    useMultipleCreateSubscriptionMutation,
    useMultipleDeleteSubscriptionMutation,
} from 'api/queries/subscriptions';
import { SubscriptionEntityVariants } from 'api/subscriptions/types';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FILTER_OPTIONS, FilterOptions, InterfaceOptions } from '../../const';
import { containerFilterFunction } from '../../utils';

import { StructurizrTableRow } from './components';
import { EntityTypes, ISelectedEntity, IStructurizrTable } from './types';
import * as S from './units';

export const StructurizrTable: FC<IStructurizrTable> = ({ interfaceOption, cmdb }) => {
    const [params, setSearchParams] = useSearchParams();
    const [hideEmpty, setHideEmpty] = useState(true);
    const [hideDeleted, setHideDeleted] = useState(true);
    const hideEmptyParam = params.get('hideEmpty');
    const hideDeletedParam = params.get('hideDeleted');

    useEffect(() => {
        if (hideEmptyParam === 'false') {
            setHideEmpty(false);
        } else {
            setHideEmpty(true);
        }
        if (hideDeletedParam === 'false') {
            setHideDeleted(false);
        } else {
            setHideDeleted(true);
        }
    }, [hideEmptyParam, hideDeletedParam]);

    const { data: containerData, isLoading: isLoadingContainerData } =
        useGetProductStructurizrContainerByCmdbQuery(cmdb);

    const containerDataFiltered = useMemo(
        () => containerFilterFunction(containerData, hideEmpty, hideDeleted),
        [containerData, hideEmpty, hideDeleted],
    );

    const [searchText, setSearchText] = useState('');
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const { modalOpened, openModal, closeModal } = useModal();

    const structurizrInterfaces = useMemo(
        () =>
            containerDataFiltered.reduce(
                (acc, v) => [...acc, ...v.interfaces.map((v) => ({ ...v, containerId: v.id }))],
                [] as IStructurizrContainerInterfaceData[],
            ),
        [containerDataFiltered],
    );

    const structurizrSearchVariants = useMemo(
        () =>
            structurizrInterfaces
                .reduce(
                    (acc, v) => [...acc, ...v.operations.map((o) => ({ ...o, interfaceId: v.id }))],
                    [...structurizrInterfaces] as (
                        | IStructurizrContainerInterfaceData
                        | IStructurizrOperation
                    )[],
                )
                .filter((v) =>
                    (has(v, 'type') ? `${(v as { type: string }).type} ${v.name}` : v.name)
                        .toLowerCase()
                        .includes(searchText.toLowerCase()),
                )
                .map((o) => ({
                    id: o.id,
                    value: has(o, 'type') ? `${(o as { type: string }).type} ${o.name}` : o.name,
                    type: has(o, 'protocol') ? EntityTypes.INTERFACE : EntityTypes.OPERATION,
                    interfaceId: has(o, 'protocol')
                        ? null
                        : (o as unknown as { interfaceId: number }).interfaceId,
                })),
        [structurizrInterfaces, searchText],
    );

    const [selectedEntity, setSelectedEntity] = useState<ISelectedEntity | null>(null);

    const paramId = params.get('id');
    const paramType = params.get('type');

    useEffect(() => {
        if (structurizrSearchVariants && paramId && paramType) {
            const entity =
                (structurizrSearchVariants.find(
                    (v) => v.id === Number(paramId),
                ) as unknown as ISelectedEntity) ?? null;
            if (
                entity?.id !== selectedEntity?.id &&
                ((entity?.type === EntityTypes.INTERFACE && paramType === 'arch_interface') ||
                    (entity?.type === EntityTypes.OPERATION && paramType === 'arch_operation'))
            ) {
                setSelectedEntity(entity);
                setSearchText(entity.value);
            }
        } else {
            setSelectedEntity(null);
        }
    }, [paramId, paramType, structurizrSearchVariants]);

    const { data: subscribedInterfaceIds, isLoading: isLoadingSubscribedInterfaces } =
        useGetSubscribedInerfacesIdsQuery();

    const allInterfaces = containerData?.reduce(
        (acc, v) => [...acc, ...v.interfaces.map((i) => i)],
        [] as IStructurizrContainerInterfaceData[],
    );

    const interfaceIds = allInterfaces?.map((i) => i.id);

    const isAllSubscribed =
        interfaceIds?.length !== 0 &&
        interfaceIds?.every((id) => subscribedInterfaceIds?.includes(id));

    const { mutateAsync: deleteSubscriptions, isPending: isDeletingSubscriptions } =
        useMultipleDeleteSubscriptionMutation();

    const { mutateAsync: createSubscriptions, isPending: isCreatingSubscriptions } =
        useMultipleCreateSubscriptionMutation();

    const handleSubscribeButtonClick = async () => {
        if (isAllSubscribed) {
            openModal();
        } else {
            if (allInterfaces && subscribedInterfaceIds) {
                await createSubscriptions(
                    allInterfaces
                        .filter((i) => !subscribedInterfaceIds.includes(i.id))
                        .map((i) => ({
                            entityType: SubscriptionEntityVariants.ARCH_INTERFACE,
                            id: i.id,
                            name: i.code ?? '',
                        })),
                );
            }
            showSnackbar({
                message:
                    'Вы подписаны на изменения интерфейсов и их дочерних элементов. Уведомления будут отображаться на витрине ФДМ',
            });
        }
    };

    const handleUnsubscribe = async () => {
        if (interfaceIds) {
            await deleteSubscriptions({
                entityType: SubscriptionEntityVariants.ARCH_INTERFACE,
                ids: interfaceIds,
            });
        }
        closeModal();
        showSnackbar({
            message: 'Вы отписаны от уведомлений',
        });
    };

    return (
        <>
            <S.ActionsContainer>
                <S.SearchContainer>
                    <AutocompleteControlled
                        options={structurizrSearchVariants}
                        searchText={searchText}
                        setSearchText={(v) => {
                            const newParams = new URLSearchParams(params);
                            newParams.delete('id');
                            newParams.delete('type');
                            setSearchParams(newParams);
                            setSearchText(v);
                        }}
                        placeholder="Название интерфейса или метода"
                        onChange={(value) => {
                            setSearchParams({
                                ...Object.fromEntries(params),
                                id: String(value.id),
                                type:
                                    (value as unknown as ISelectedEntity).type ===
                                    EntityTypes.INTERFACE
                                        ? 'arch_interface'
                                        : 'arch_operation',
                            });
                            setSearchText(value.value);
                        }}
                        onClear={() => {
                            const newParams = new URLSearchParams(params);
                            newParams.delete('id');
                            newParams.delete('type');
                            setSearchParams(newParams);
                            setSearchText('');
                        }}
                    />
                </S.SearchContainer>
                <S.SelectContainer>
                    <Select
                        multiple
                        fullWidth
                        label="Скрыть"
                        options={FILTER_OPTIONS}
                        makeOption={(o) => <S.SelectOption>{o.value}</S.SelectOption>}
                        values={FILTER_OPTIONS.filter(
                            (o) =>
                                (o.id === FilterOptions.DELETED && hideDeleted) ||
                                (o.id === FilterOptions.EMPTY && hideEmpty),
                        )}
                        onChange={(values) => {
                            const newParams = new URLSearchParams(Object.fromEntries(params));
                            newParams.delete('hideEmpty');
                            newParams.delete('hideDeleted');
                            const valueIds = values.map((v) => v.id);
                            if (valueIds.includes(FilterOptions.EMPTY)) {
                                newParams.append('hideEmpty', 'true');
                            } else {
                                newParams.append('hideEmpty', 'false');
                            }
                            if (valueIds.includes(FilterOptions.DELETED)) {
                                newParams.append('hideDeleted', 'true');
                            } else {
                                newParams.append('hideDeleted', 'false');
                            }
                            setSearchParams(newParams);
                        }}
                    />
                </S.SelectContainer>
                <Button
                    variant="plain"
                    disabled={!selectedEntity && hideEmpty && hideDeleted}
                    size="medium"
                    onClick={() => {
                        const newParams = new URLSearchParams(Object.fromEntries(params));
                        newParams.set('hideEmpty', 'true');
                        newParams.set('hideDeleted', 'true');
                        newParams.delete('id');
                        newParams.delete('type');
                        setSearchParams(newParams);
                        setSearchText('');
                    }}
                >
                    Сбросить
                </Button>
            </S.ActionsContainer>

            {!window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND && (
                <ButtonGroup
                    alwaysSelected
                    selectedOption={{ id: interfaceOption }}
                    size="small"
                    options={[
                        {
                            id: InterfaceOptions.STRUCTURIZR,
                            label: 'Structurizr',
                        },
                        {
                            id: InterfaceOptions.MAPIC,
                            label: 'Mapic',
                        },
                    ]}
                    onChange={(option) => {
                        setSearchText('');
                        setSearchParams(
                            new URLSearchParams({
                                ...Object.fromEntries(params),
                                subtab: option.id ?? '',
                            }),
                        );
                    }}
                />
            )}

            {isLoadingContainerData && <Skeleton height={300} />}
            {containerDataFiltered && containerDataFiltered.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <S.TableDataContainer colSpan={6} alignRight>
                                <Button
                                    startIcon={
                                        <Icon
                                            iconName={
                                                isAllSubscribed
                                                    ? Icons.NotificationOff
                                                    : Icons.Notification
                                            }
                                        />
                                    }
                                    disabled={
                                        isLoadingSubscribedInterfaces ||
                                        isLoadingContainerData ||
                                        isCreatingSubscriptions
                                    }
                                    onClick={handleSubscribeButtonClick}
                                    variant="plain"
                                >
                                    {isAllSubscribed
                                        ? 'Отписаться от всех интерфейсов'
                                        : 'Подписаться на все интерфейсы'}
                                </Button>
                            </S.TableDataContainer>
                        </TableRow>
                        <TableRow>
                            <S.TableHeaderDataMaxWidth>Контейнер</S.TableHeaderDataMaxWidth>
                            <TableHeaderData>Код</TableHeaderData>
                            <TableHeaderData>Дата&#8209;изменения</TableHeaderData>
                            <TableHeaderData>Кол&#8209;во&nbsp;интерфейсов</TableHeaderData>
                            <TableHeaderData>
                                Кол&#8209;во&nbsp;методов&nbsp;в&nbsp;интерфейсах
                            </TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    {containerDataFiltered.map((container) => (
                        <StructurizrTableRow
                            key={container.id}
                            container={container}
                            selectedEntity={selectedEntity}
                        />
                    ))}
                </Table>
            )}
            {!isLoadingContainerData && containerDataFiltered.length === 0 && (
                <S.EmptyContainer>
                    <NotFoundBlock
                        title="Интерфейсы, методы и SLA нет"
                        imageVariant={ImageVariants.EMPTY_BOX}
                        text=""
                    />
                </S.EmptyContainer>
            )}
            <Dialog
                opened={modalOpened}
                onClose={closeModal}
                onConfirm={handleUnsubscribe}
                title="Отписаться от всех интерфейсов?"
                confirmText="Отписаться"
                isPending={isDeletingSubscriptions}
            >
                Вы&nbsp;отписываетесь от&nbsp;всех интерфейсов
            </Dialog>
        </>
    );
};
