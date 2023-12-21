import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button, Label, Skeleton } from '@beeline/design-system-react';
import { CommunalLabel, TargetLabel } from 'features/cx';

import { getBIEditabilityById } from 'api/bi';
import { useDeleteBIMutation, useGetBICollectionQuery } from 'api/queries/bi';
import { useModal } from 'hooks';
import * as ROUTER from 'router/const';
import * as STYLES from 'styles/units';
import { Dialog } from 'widgets/Dialog';

import { BiMenu } from './components';
import * as S from './units';

export const BILibraryPage = () => {
    const { modalOpened, openModal, closeModal } = useModal();

    const { data: bis, isLoading } = useGetBICollectionQuery('');
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

    const handleEditBiClick = async (id: number) => {
        const editabilityData = await getBIEditabilityById(String(id));
        if (editabilityData.data.editability) {
            navigate({
                pathname: `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${ROUTER.ADD_PATH}`,
                search: createSearchParams({ id: String(id) }).toString(),
            });
        } else {
            openModal();
        }
    };

    const handleDeleteBiClick = async (id: number) => {
        try {
            await deleteBi(String(id));
        } catch (error) {
            openModal();
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
                                            onEditClick={() => handleEditBiClick(bi.id)}
                                            onDeleteClick={() => handleDeleteBiClick(bi.id)}
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
                </S.ContentWrapper>
                <Dialog
                    opened={modalOpened}
                    title="BI не может быть отредактирован или удалён"
                    onClose={closeModal}
                    onConfirm={closeModal}
                    confirmText="Понятно"
                    showDeclineButton={false}
                >
                    Он используется другими командами
                </Dialog>
            </S.PageWrapper>
        </>
    );
};
