import React, { FC, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { CommunalLabel, TargetLabel } from 'features/cx';

import { DropdownMenu } from 'components/interaction';
import { Link, PivotArrow } from 'components/other';

import { getBIEditabilityById } from 'api/bi';
import { IBIData } from 'api/bi/types';
import { useDeleteBIMutation } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';
import { Dialog } from 'widgets/Dialog';

import { IBiCard } from './types';
import * as S from './units';

export const BiCard: FC<IBiCard> = ({ bi }) => {
    const navigate = useNavigate();

    const [showCjs, setShowCjs] = useState(false);

    const {
        refetch,
        data: cjs,
        isLoading: isLoadingCjs,
    } = useGetCJCollectionByBIIdQuery(String(bi.id), false);

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
                        {bi.draft && <Label title="Черновик" type="default" />}
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
                <S.Description>{bi.descr}</S.Description>
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
