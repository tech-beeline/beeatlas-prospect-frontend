import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label, Skeleton } from '@beeline/design-system-react';
import { CommunalLabel, TargetLabel } from 'features/cx';

import { NotFoundBlock } from 'components/other';

import { getBIEditabilityById } from 'api/bi';
import { IBIData } from 'api/bi/types';
import { useDeleteBIMutation, useGetBICollectionQuery } from 'api/queries/bi';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';
import { Dialog } from 'widgets/Dialog';

import {
    BILibraryFilters,
    BiMenu,
    DraftVariants,
    IFilterOptions,
    ProductVariant,
    StatusVariant,
} from './components';
import * as S from './units';

export const BILibraryPage = () => {
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

    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
        search: '',
        product: ProductVariant.ALL,
        status: StatusVariant.ALL,
        draft: DraftVariants.ALL,
    });

    const { data: bis, isLoading } = useGetBICollectionQuery({
        search: filterOptions.search,
        productId: filterOptions.product === ProductVariant.ALL ? undefined : filterOptions.product,
        status: filterOptions.status === StatusVariant.ALL ? undefined : filterOptions.status,
        draft:
            filterOptions.draft === DraftVariants.ALL
                ? undefined
                : filterOptions.draft === DraftVariants.DRAFT
                ? true
                : false,
    });

    const { mutateAsync: deleteBi } = useDeleteBIMutation();

    const navigate = useNavigate();

    const handleCreateBiClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`);
    };

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

    return (
        <>
            <S.MarginBlock />
            <S.PageWrapper>
                <S.ContentWrapper>
                    <S.TitleWrapper>
                        <STYLES.H4>Библиотека BI</STYLES.H4>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => handleCreateBiClick()}
                        >
                            Создать BI
                        </Button>
                    </S.TitleWrapper>

                    <BILibraryFilters
                        filterOptions={filterOptions}
                        setFilterOptions={setFilterOptions}
                    />

                    <S.CardContainer>
                        {bis &&
                            bis.map((bi) => (
                                <S.BICard key={bi.id}>
                                    <S.FlexContainer>
                                        <S.LabelsContainer>
                                            {bi.draft && <Label title="Черновик" type="default" />}
                                            {!bi.draft && bi.communal && <CommunalLabel />}
                                            {!bi.draft && <TargetLabel target={bi.target} />}
                                        </S.LabelsContainer>
                                        <BiMenu
                                            biId={bi.id}
                                            onEditClick={() => handleEditBiClick(bi)}
                                            onDeleteClick={() => handleDeleteBiClick(bi)}
                                        />
                                    </S.FlexContainer>
                                    <S.Title onClick={() => handleBiClick(bi.id)}>
                                        {bi.name}
                                    </S.Title>
                                    <S.Number>{bi.uniqueIdent}</S.Number>
                                    <S.Description>{bi.descr}</S.Description>
                                </S.BICard>
                            ))}
                        {isLoading &&
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} height={150} />
                            ))}
                    </S.CardContainer>
                    {bis && bis.length === 0 && (
                        <S.NotFoundContainer>
                            <NotFoundBlock
                                imageVariant="emptyBox"
                                title="Нет результатов, подходящих под параметры поиска"
                                text="Попробуйте изменить поисковой запрос"
                            />
                        </S.NotFoundContainer>
                    )}
                </S.ContentWrapper>
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
            </S.PageWrapper>
        </>
    );
};
