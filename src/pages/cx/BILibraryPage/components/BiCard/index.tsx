import React, { FC, useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';
import { CommunalLabel, TargetLabel } from 'features/cx';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';
import { Link, PivotArrow } from 'components/other';

import { getBIEditabilityById } from 'api/bi';
import { IBIData } from 'api/bi/types';
import { useDeleteBIMutation } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import { useGetProductsQuery, useModal } from 'hooks';
import * as ROUTER from 'router/const';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';

import { IBiCard } from './types';
import * as S from './units';

export const BiCard: FC<IBiCard> = ({ bi }) => {
    const navigate = useNavigate();

    const [showCjs, setShowCjs] = useState(false);

    const [showExpandButton, setShowExpandButton] = useState<boolean>(false);
    const [expandDescription, setExpandDescription] = useState<boolean>(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (
            (descriptionRef.current?.scrollHeight ?? 0) >
            (descriptionRef.current?.offsetHeight ?? 0)
        ) {
            setShowExpandButton(true);
        }
    }, [descriptionRef]);

    const {
        refetch,
        data: cjs,
        isLoading: isLoadingCjs,
    } = useGetCJCollectionByBIIdQuery(String(bi.id), false);

    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery();

    const {
        modalOpened: editabilityModalOpened,
        openModal: openEditabilityModal,
        closeModal: closeEditabilityModal,
    } = useModal();

    const {
        modalOpened: communalModalOpened,
        openModal: openCommunalModal,
        closeModal: closeCommunalModal,
    } = useModal();

    const { mutateAsync: deleteBi } = useDeleteBIMutation();

    const handleBiClick = (id: number) => {
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.VIEW_PATH}`,
            search: createSearchParams({ id: String(id) }).toString(),
        });
    };

    const handleEditBiClick = async (bi: IBIData) => {
        if (bi.communal && !bi.draft) {
            openCommunalModal();
            return;
        }
        const editabilityData = await getBIEditabilityById(String(bi.id));
        if (editabilityData.data.editability) {
            navigate({
                pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`,
                search: createSearchParams({ id: String(bi.id) }).toString(),
            });
        } else {
            openEditabilityModal();
        }
    };

    const handleDeleteBiClick = async (bi: IBIData) => {
        if (bi.communal && !bi.draft) {
            openCommunalModal();
            return;
        }
        try {
            await deleteBi(String(bi.id));
        } catch (error) {
            openEditabilityModal();
        }
    };

    const handleArrowClick = async () => {
        if (!showCjs) {
            await refetch();
        }
        setShowCjs(!showCjs);
    };

    return (
        <>
            <S.BICard key={bi.id}>
                <S.FlexContainer>
                    <S.LabelsContainer>
                        {bi.draft && <Label title="Черновик" type="default" variant="contained" />}
                        {!bi.draft && bi.communal && <CommunalLabel />}
                        {!bi.draft && <TargetLabel target={bi.target} />}
                    </S.LabelsContainer>
                    <DropdownMenu
                        id={String(bi.id)}
                        items={[
                            [
                                {
                                    title: 'Редактировать',
                                    icon: Icons.Edit,
                                    onClick: () => handleEditBiClick(bi),
                                },
                            ],
                            [
                                {
                                    title: 'Удалить',
                                    icon: Icons.Delete,
                                    onClick: () => handleDeleteBiClick(bi),
                                    dangerous: true,
                                },
                            ],
                        ]}
                    />
                </S.FlexContainer>
                <S.Title onClick={() => handleBiClick(bi.id)}>{bi.name}</S.Title>
                <S.Number>{bi.uniqueIdent}</S.Number>
                <S.Description ref={descriptionRef} clampLines={!expandDescription}>
                    {bi.descr}
                </S.Description>
                {showExpandButton && (
                    <Text
                        pointer
                        link
                        variant={'body2'}
                        onClick={() => setExpandDescription(!expandDescription)}
                    >
                        {expandDescription ? 'Скрыть' : 'Показать'}
                    </Text>
                )}
                <S.DateContainer>
                    <Text inactive variant="body3">
                        Приложение
                    </Text>
                    <Text variant="body2">
                        {isLoadingProducts || !productsData ? (
                            <Skeleton height={22} radius={4} />
                        ) : (
                            formatNullableString(
                                productsData.find((product) => product.id === bi.productId)?.name,
                            )
                        )}
                    </Text>
                </S.DateContainer>
                <S.DateContainer>
                    <Text inactive variant="body3">
                        Дата изменения
                    </Text>
                    <Text variant="body2">{dayjs(bi.lastModifiedDate).format('DD.MM.YYYY')}</Text>
                </S.DateContainer>
                <S.FlexContainerWithMargin>
                    <S.Text>Связанные артефакты</S.Text>
                    <PivotArrow
                        style={{ cursor: 'pointer' }}
                        position={showCjs && 'top'}
                        onClick={handleArrowClick}
                    />
                </S.FlexContainerWithMargin>
                <S.CJContainer open={showCjs}>
                    {cjs &&
                        cjs.map((cj) => (
                            <Link key={cj.id} url={`/cx/cj/add?id=${cj.id}`} title={cj.name} />
                        ))}
                    {cjs && cjs.length === 0 && (
                        <S.TextInactive>Нет связанных артефактов</S.TextInactive>
                    )}
                    {isLoadingCjs && <Skeleton height={20} />}
                </S.CJContainer>
            </S.BICard>

            <Dialog
                opened={editabilityModalOpened}
                title="BI не может быть отредактирован или удалён"
                onClose={closeEditabilityModal}
                onConfirm={closeEditabilityModal}
                confirmText="Понятно"
                showDeclineButton={false}
            >
                Он используется другими командами
            </Dialog>
            <Dialog
                opened={communalModalOpened}
                title="BI не может быть отредактирован или удалён"
                onClose={closeCommunalModal}
                onConfirm={closeCommunalModal}
                confirmText="Понятно"
                showDeclineButton={false}
            >
                Редактирование и удаление коммунального опубликованного BI недоступно
            </Dialog>
        </>
    );
};
