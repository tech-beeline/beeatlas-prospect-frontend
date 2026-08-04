import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { dataToFormValues, formValuesToData } from 'features/cx';
import { useSideSheetStore } from 'features/cx/store';

import { DropdownMenu, TooltipContainer } from 'components/interaction';
import { NotFoundBlock } from 'components/other';
import { IconButton } from 'components/ui';
import { Badge, Button, Icon, ProgressButton, Skeleton } from 'components/ui';

import { IBIData } from 'api/bi/types';
import { useUpdateBIMutation } from 'api/queries/bi';
import {
    useCreateCJDashboardMutation,
    useGetCJFileVersionByIdQuery,
    useGetCompleteCJDataByIdQuery,
    usePartialUpdateCJMutation,
} from 'api/queries/cj';
import { useGetProductsQuery, useModal, useShowTooltip } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { Dialog } from 'widgets/Dialog';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CJData, CJImport, CJUpdateForm, CJVersion, SkeletonTable, Table } from './components';
import { ButtonState, mapCJToFormValues, SideSheetVariants } from './const';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');
    const [buttonState, setButtonState] = useState<ButtonState>('default');
    const { modalOpened, openModal, closeModal } = useModal();
    const {
        data,
        isLoading: isLoadingCJ,
        refetch,
        isFetching: isRefreshingCJ,
    } = useGetCompleteCJDataByIdQuery(paramId);
    const { data: dataProducts, isLoading: isLoadingProducts } = useGetProductsQuery();
    const { data: versions, isLoading: isLoadingVersions } = useGetCJFileVersionByIdQuery(paramId);

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

    const { mutateAsync: updateCJ } = usePartialUpdateCJMutation();

    const { mutateAsync: createDashboard, isPending: isCreatingDashboard } =
        useCreateCJDashboardMutation();

    const handleCreateDashboardClick = async () => {
        if (paramId) {
            await createDashboard(Number(paramId));
            showSnackbar({ message: 'Дашборд в grafana создан' });
        }
    };

    const { openSideSheet, toggleSideSheet, closeSideSheet } = useSideSheetStore();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        return () => {
            closeSideSheet();
        };
    }, [closeSideSheet]);

    const handleBackIconClick = () => {
        const from = (location.state as { from?: string } | null)?.from;

        if (from === `${R.CX_PATH}${R.CJ_PATH}`) {
            navigate(-1);
        } else {
            navigate(`${R.CX_PATH}${R.CJ_PATH}`);
        }
    };

    const handleToggleDraft = async () => {
        if (!data) return;

        try {
            setButtonState('loading');

            if (data.draft) {
                if (hasDraftBIs) {
                    openModal();
                    return;
                }

                await updateCJ({
                    id: String(data.id),
                    data: { draft: false },
                });
                await refetch();
                showSnackbar({ message: 'CJ опубликован' });
            } else {
                await updateCJ({
                    id: String(data.id),
                    data: { draft: true },
                });
                await refetch();
                showSnackbar({ message: 'CJ переведен в статус черновика' });
            }
            setButtonState('default');
        } finally {
            setButtonState('default');
        }
    };

    const handlePublishAllBIs = async () => {
        if (!data) return;

        try {
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

            showSnackbar({ message: 'CJ опубликован' });
        } finally {
            closeModal();
        }
    };

    const isEmpty = !!(
        data &&
        data.steps.length === 1 &&
        data.steps.reduce((acc, step) => [...acc, ...step.bi.map((bi) => bi.id)], [] as number[])
            .length === 0
    );

    const hasVersions = Array.isArray(versions) && versions.length > 0;
    const isVersionsDisabled =
        (data?.bpmn === null && !isEmpty) || isLoadingVersions || !hasVersions;

    const nameRef = useRef<HTMLDivElement>(null);
    const showNameTooltip = useShowTooltip<HTMLDivElement>(nameRef);

    const descriptionRef = useRef<HTMLDivElement>(null);
    const showDescriptionTooltip = useShowTooltip<HTMLDivElement>(descriptionRef);

    const handleOpenBPMN = () => {
        if (!data) return;
        navigate(
            `${R.CX_PATH}${R.CJ_PATH}${R.BPMN_PATH}?cjId=${data.id}&versionId=${versions?.[0]?.id}`,
        );
    };

    return (
        <S.PageWrapper>
            <S.Header data-testid="CjTopPanel">
                <S.FlexSideContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        size="medium"
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
                                <Badge
                                    type="secondary"
                                    semantic={data?.draft ? 'neutral' : 'success'}
                                >
                                    {data?.draft ? 'Черновик' : 'Опубликован'}
                                </Badge>
                                <S.InfoTooltipContainer>
                                    <Badge
                                        type="secondary"
                                        data-tooltip-id="bpmn-label-tooltip"
                                        semantic={data?.bpmn ? 'warning' : 'info'}
                                        icon={Icons.InfoCircled}
                                    >
                                        {data?.bpmn ? 'BPMN' : 'BEEATLAS'}
                                    </Badge>
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

                            <DropdownMenu
                                id="dropdown-contols"
                                position="left"
                                items={[
                                    [
                                        {
                                            title: 'Данные CJ',
                                            icon: Icons.InfoCircled,
                                            onClick: () =>
                                                toggleSideSheet(SideSheetVariants.DATA_CJ),
                                        },
                                        ...(data?.draft && canEditCJ
                                            ? [
                                                  {
                                                      title: 'Редактировать данные CJ',
                                                      icon: Icons.Edit,
                                                      onClick: () =>
                                                          toggleSideSheet(
                                                              SideSheetVariants.UPDATE_CJ,
                                                          ),
                                                      disabled: !data?.draft,
                                                  },
                                                  {
                                                      title: 'Импортировать CJ',
                                                      icon: Icons.Import,
                                                      onClick: () =>
                                                          toggleSideSheet(
                                                              SideSheetVariants.IMPORT_CJ,
                                                          ),
                                                      disabled: data?.bpmn === null && !isEmpty,
                                                  },
                                              ]
                                            : []),
                                        {
                                            title: 'Показать версии',
                                            icon: Icons.PagesMultipleEmpty,
                                            onClick: () =>
                                                toggleSideSheet(SideSheetVariants.VERSION_CJ),
                                            disabled: isVersionsDisabled,
                                        },
                                    ],
                                ]}
                            >
                                <S.ButtonStyled
                                    endIcon={<Icon iconName={Icons.MoreVert} />}
                                    id="buttonToggleId"
                                    data-tooltip-id="editButton"
                                />
                            </DropdownMenu>

                            {data?.bpmn && (
                                <Button variant="outlined" color="primary" onClick={handleOpenBPMN}>
                                    CJ в BPMN
                                </Button>
                            )}
                        </>
                    )}
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    {!isLoadingCJ && data?.bpmn && window.FEATURE_FLAGS.FLAG_IS_PROD === false && (
                        <>
                            <Button
                                disabled={!data?.dashboardLink}
                                startIcon={<Icon iconName={Icons.GraphUp} />}
                                onClick={() => window.open(data?.dashboardLink ?? '/')}
                            >
                                Дашборд в grafana
                            </Button>

                            {canEditCJ && (
                                <Button
                                    disabled={!data || data.draft === true || isCreatingDashboard}
                                    startIcon={<Icon iconName={Icons.GraphUp} />}
                                    onClick={handleCreateDashboardClick}
                                >
                                    Создать дашборд в grafana
                                </Button>
                            )}
                        </>
                    )}

                    {isLoadingCJ ? (
                        <Skeleton variant="square" width={127} height={40} />
                    ) : (
                        data &&
                        canEditCJ && (
                            <ProgressButton
                                key={data.draft ? 'draft' : 'published'}
                                variant="contained"
                                onClick={handleToggleDraft}
                                disabled={buttonState === 'loading'}
                                size="small"
                                state={buttonState}
                            >
                                {data.draft ? 'Опубликовать' : 'Перевести в черновик'}
                            </ProgressButton>
                        )
                    )}

                    <IconButton size="large" iconName={Icons.Close} onClick={handleBackIconClick} />
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
                    canEditCJ={canEditCJ}
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
                        values={mapCJToFormValues(data)}
                    />
                    <CJImport
                        isOpen={openSideSheet === SideSheetVariants.IMPORT_CJ}
                        onClose={closeSideSheet}
                        cjId={String(data.id)}
                        isRefreshing={isRefreshingCJ}
                        isEmptyCJ={isEmpty}
                    />
                    <CJVersion
                        isOpen={openSideSheet === SideSheetVariants.VERSION_CJ}
                        onClose={closeSideSheet}
                        versions={versions}
                        cjId={paramId}
                    />
                    <CJData
                        isOpen={openSideSheet === SideSheetVariants.DATA_CJ}
                        onClose={closeSideSheet}
                        cj={data}
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
