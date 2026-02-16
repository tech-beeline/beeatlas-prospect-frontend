import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, IconButton, Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { dataToFormValues, formValuesToData } from 'features/cx';
import { useSideSheetStore } from 'features/cx/store';

import { TooltipContainer } from 'components/interaction';
import { NotFoundBlock } from 'components/other';

import { IBIData } from 'api/bi/types';
import { useUpdateBIMutation } from 'api/queries/bi';
import {
    useCreateCJDashboardMutation,
    useGetCompleteCJDataByIdQuery,
    usePartialUpdateCJMutation,
} from 'api/queries/cj';
import { useGetProductsQuery, useModal, useShowTooltip } from 'hooks';
import * as ROUTER from 'router/const';
import * as R from 'router/const';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CJImport } from './components/CJImport';
import { CJUpdateForm } from './components/CJUpdateForm';
import { CJVersion } from './components/CJVersion';
import { InfoSidesheet } from './components/InfoSidesheet';
import { SkeletonTable } from './components/SkeletonTable';
import { Table } from './components/Table';
import { SideSheetVariants } from './const';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { modalOpened, openModal, closeModal } = useModal();
    const { data, isLoading: isLoadingCJ, refetch } = useGetCompleteCJDataByIdQuery(paramId);
    const { data: dataProducts, isLoading: isLoadingProducts } = useGetProductsQuery();
    const { mutateAsync: updateBi } = useUpdateBIMutation();
    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);
    const isLoading = isLoadingCJ || isLoadingProducts;

    const canEditCJ = (dataProducts ?? [])
        .map((product) => String(product.id))
        .includes(String(data?.productId ?? data?.idProductExt ?? data?.id_product));

    const hasDraftBIs =
        data?.steps
            .reduce((acc, step) => [...acc, ...step.bi], [] as IBIData[])
            .some((bi) => bi.draft) ?? false;

    const { mutateAsync: updateCJ, isPending: updatingCj } = usePartialUpdateCJMutation();

    const { mutateAsync: createDashboard, isPending: isCreatingDashboard } =
        useCreateCJDashboardMutation();

    const handleCreateDashboardClick = async () => {
        if (paramId) {
            await createDashboard(Number(paramId));
        }
    };

    const { openSideSheet, toggleSideSheet, closeSideSheet } = useSideSheetStore();

    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate(`${ROUTER.CX_PATH}${ROUTER.CJ_PATH}`);
    };

    const handlePublish = () => {
        if (data) {
            if (hasDraftBIs) {
                openModal();
            } else {
                updateCJ({
                    id: String(data.id),
                    data: { draft: false },
                });
            }
        }
    };

    const handlePublishAllBIs = async () => {
        if (!data) return;

        const draftBIs = data.steps.flatMap((step) => step.bi).filter((bi) => bi.draft);

        await Promise.all(
            draftBIs.map(async (bi) => {
                const formValues = dataToFormValues(bi);
                const updatedFormValues = { ...formValues, draft: false };
                const dataToUpdate = formValuesToData(updatedFormValues);

                await updateBi({
                    id: String(bi.id),
                    data: dataToUpdate,
                });
            }),
        );

        await updateCJ({
            id: String(data.id),
            data: { draft: false },
        });

        closeModal();
        showSnackbar({ message: 'CJ опубликован' });
    };

    const handleMarkAsDraft = async () => {
        if (data) {
            await updateCJ({
                id: String(data.id),
                data: { draft: true },
            });
            const allBIs = data.steps.flatMap((step) => step.bi);

            await Promise.all(
                allBIs.map(async (bi) => {
                    const formValues = dataToFormValues(bi);
                    const dataToUpdate = formValuesToData(formValues);

                    await updateBi({
                        id: String(bi.id),
                        data: {
                            ...dataToUpdate,
                            draft: true,
                        },
                    });
                }),
            );
        }
    };

    const isEmpty =
        data &&
        data.steps.length === 1 &&
        data.steps.reduce((acc, step) => [...acc, ...step.bi.map((bi) => bi.id)], [] as number[])
            .length === 0;

    const nameRef = useRef<HTMLDivElement>(null);
    const showNameTooltip = useShowTooltip<HTMLDivElement>(nameRef);

    const descriptionRef = useRef<HTMLDivElement>(null);
    const showDescriptionTooltip = useShowTooltip<HTMLDivElement>(descriptionRef);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        style={{ cursor: 'pointer' }}
                    />

                    {isLoadingCJ ? (
                        <>
                            <Skeleton variant="square" width={221} height={40} />

                            <S.InfoContainer>
                                <Skeleton variant="circle" width={24} height={24} />
                                <Skeleton variant="circle" width={24} height={24} />
                                <Skeleton variant="square" width={76} height={24} />
                            </S.InfoContainer>

                            <Skeleton variant="square" width={40} height={40} />
                            <Skeleton variant="square" width={145} height={40} />
                            <Skeleton variant="square" width={158} height={40} />
                        </>
                    ) : (
                        <>
                            <div>
                                <S.Name data-tooltip-id="name" ref={nameRef}>
                                    {data?.name}
                                </S.Name>
                                {showNameTooltip && (
                                    <TooltipContainer
                                        largePadding
                                        id="name"
                                        offset={8}
                                        place="bottom"
                                        noArrow
                                    >
                                        {data?.name}
                                    </TooltipContainer>
                                )}
                                <S.Desription data-tooltip-id="description" ref={descriptionRef}>
                                    {data?.userPortrait}
                                </S.Desription>
                                {showDescriptionTooltip && (
                                    <TooltipContainer
                                        largePadding
                                        id="description"
                                        offset={8}
                                        place="bottom"
                                        noArrow
                                    >
                                        {data?.userPortrait}
                                    </TooltipContainer>
                                )}
                            </div>

                            <S.InfoContainer>
                                <IconButton
                                    iconName={Icons.InfoCircled}
                                    data-tooltip-id="info"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsInfoTooltipOpen((prev) => !prev);
                                    }}
                                />
                                {data && (
                                    <TooltipContainer
                                        largePadding
                                        id="info"
                                        place="bottom"
                                        noArrow
                                        offset={8}
                                        infoWidth
                                        isOpen={isInfoTooltipOpen}
                                        clickable
                                        afterHide={() => setIsInfoTooltipOpen(false)}
                                    >
                                        <InfoSidesheet
                                            onClose={() => setIsInfoTooltipOpen(false)}
                                            cj={data}
                                        />
                                    </TooltipContainer>
                                )}

                                <Label
                                    variant="contained"
                                    title={data?.draft ? 'Черновик' : 'Опубликован'}
                                    type={data?.draft ? 'default' : 'success'}
                                />
                                <S.InfoTooltipContainer>
                                    <Label
                                        variant="contained"
                                        title={data?.bpmn ? 'BPMN' : 'BEEATLAS'}
                                        type={data?.bpmn ? 'warning' : 'magenta'}
                                        data-tooltip-id="bpmn-label-tooltip"
                                        iconName={Icons.InfoCircled}
                                    />
                                    <TooltipContainer
                                        id="bpmn-label-tooltip"
                                        place="bottom"
                                        offset={8}
                                        noArrow
                                        largePadding
                                    >
                                        {data?.bpmn
                                            ? 'Нельзя менять структуру CJ добавленного с помощью нотации BPMN, можно менять только распознанные атрибуты BI и этапов. Нельзя импортировать CJ из BPMN в ранее собранный CJ в формате Beetlas'
                                            : 'Нельзя импортировать CJ из BPMN в ранее собранный CJ в формате Beeatlas. Чтобы импортировать CJ в формате BPMN, нужно сначала удалить все этапы и очистить последний оставшийся этап от BI'}
                                    </TooltipContainer>
                                </S.InfoTooltipContainer>
                            </S.InfoContainer>

                            {canEditCJ && (
                                <S.ButtonStyled
                                    disabled={!data?.draft}
                                    endIcon={<Icon iconName={Icons.Edit} />}
                                    onClick={() => toggleSideSheet(SideSheetVariants.UPDATE_CJ)}
                                    id="buttonToggleId"
                                    data-tooltip-id="editButton"
                                />
                            )}
                            {data && !data.draft && (
                                <TooltipContainer
                                    largePadding
                                    id="editButton"
                                    offset={8}
                                    place="bottom"
                                    noArrow
                                >
                                    Для редактирования CJ, его нужно сделать черновиком
                                </TooltipContainer>
                            )}

                            <Button
                                variant="outlined"
                                disabled={data?.bpmn === null && !isEmpty}
                                onClick={() => toggleSideSheet(SideSheetVariants.VERSION_CJ)}
                            >
                                Показать версии
                            </Button>

                            <Button
                                variant="outlined"
                                disabled={data?.bpmn === null && !isEmpty}
                                onClick={() => toggleSideSheet(SideSheetVariants.IMPORT_CJ)}
                            >
                                Импортировать CJ
                            </Button>
                        </>
                    )}
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    {!isLoadingCJ && (
                        <>
                            <Button
                                disabled={!data?.dashboardLink}
                                startIcon={<Icon iconName={Icons.GraphUp} />}
                                onClick={() => window.open(data?.dashboardLink ?? '/')}
                            >
                                Дашборд в grafana
                            </Button>

                            <Button
                                disabled={data?.draft === false || isCreatingDashboard}
                                startIcon={<Icon iconName={Icons.GraphUp} />}
                                onClick={handleCreateDashboardClick}
                            >
                                Создать дашборд в grafana
                            </Button>
                        </>
                    )}

                    {isLoadingCJ ? (
                        <Skeleton variant="square" width={127} height={40} />
                    ) : (
                        data &&
                        canEditCJ && (
                            <Button
                                variant="contained"
                                onClick={data.draft ? handlePublish : handleMarkAsDraft}
                                disabled={updatingCj}
                            >
                                {data.draft ? 'Опубликовать' : 'Перевести в черновик'}
                            </Button>
                        )
                    )}

                    <IconButton
                        size="large"
                        iconName={Icons.Close}
                        onClick={() => navigate(`${R.CX_PATH}${R.CJ_PATH}`)}
                    />
                </S.FlexSideContainer>
            </S.Header>

            {isLoadingCJ && (
                <SkeletonTable firstColumnRows={13} columns={5} otherColumnsRows={11} />
            )}

            {data && (
                <Table
                    productId={data.productId}
                    cjId={data.id}
                    draft={data.draft}
                    tableData={data.steps}
                    bpmn={data.bpmn}
                />
            )}

            {!data && !isLoading && (
                <S.NotFoundContainer>
                    <NotFoundBlock />
                </S.NotFoundContainer>
            )}

            {data && (
                <>
                    <CJUpdateForm
                        isOpen={openSideSheet === SideSheetVariants.UPDATE_CJ}
                        cjId={data.id}
                        onClose={closeSideSheet}
                        values={{ name: data.name, userPortrait: data.userPortrait }}
                    />
                    <CJImport
                        isOpen={openSideSheet === SideSheetVariants.IMPORT_CJ}
                        onClose={closeSideSheet}
                        cjId={String(data.id)}
                        onUploaded={refetch}
                    />
                    <CJVersion
                        isOpen={openSideSheet === SideSheetVariants.VERSION_CJ}
                        onClose={closeSideSheet}
                    />
                </>
            )}
            <Dialog
                opened={modalOpened}
                title="Опубликовать CJ?"
                confirmText="Опубликовать"
                declineText="Отменить"
                onConfirm={handlePublishAllBIs}
                onClose={closeModal}
                showDeclineButton={true}
            >
                В CJ есть неопубликованые BI. После публикации CJ все BI в нем станут опубликованы
            </Dialog>
        </S.PageWrapper>
    );
};
