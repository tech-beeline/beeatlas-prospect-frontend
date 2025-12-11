import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon, IconButton, Label } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useSideSheetStore } from 'features/cx/store';

import { TooltipContainer } from 'components/interaction';
import { NotFoundBlock } from 'components/other';

import { IBIData } from 'api/bi/types';
import { useGetCompleteCJDataByIdQuery, usePartialUpdateCJMutation } from 'api/queries/cj';
import { useGetProductsQuery, useModal, useShowTooltip } from 'hooks';
import * as ROUTER from 'router/const';
import { Dialog } from 'widgets/Dialog';

import { BIEditScenario } from './components/BIEditScenario';
import { BIEditSLA } from './components/BIEditSLA';
import { CJImport } from './components/CJImport';
import { CJUpdateForm } from './components/CJUpdateForm';
import { CJVersion } from './components/CJVersion';
import { InfoSidesheet } from './components/InfoSidesheet';
import { Table } from './components/Table';
import { SideSheetVariants } from './const';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { modalOpened, openModal, closeModal } = useModal();
    const { data, isLoading: isLoadingCJ, refetch } = useGetCompleteCJDataByIdQuery(paramId);
    const { data: dataProducts, isLoading: isLoadingProducts } = useGetProductsQuery();
    console.log('CJ', data);
    const isLoading = isLoadingCJ || isLoadingProducts;

    const canEditCJ = (dataProducts ?? [])
        .map((product) => String(product.id))
        .includes(String(data?.productId ?? data?.idProductExt ?? data?.id_product));

    const hasDraftBIs =
        data?.steps
            .reduce((acc, step) => [...acc, ...step.bi], [] as IBIData[])
            .some((bi) => bi.draft) ?? false;

    const { mutateAsync: updateCJ, isPending: updatingCj } = usePartialUpdateCJMutation();

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

    const handleMarkAsDraft = () => {
        if (data) {
            updateCJ({
                id: String(data.id),
                data: { draft: true },
            });
        }
    };

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
                        onClick={() => toggleSideSheet(SideSheetVariants.VERSION_CJ)}
                    >
                        Показать версии
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => toggleSideSheet(SideSheetVariants.IMPORT_CJ)}
                    >
                        Импортировать CJ
                    </Button>
                </S.FlexSideContainer>

                <S.FlexSideContainer>
                    <Button onClick={() => navigate(-1)}>Закрыть</Button>

                    {data && canEditCJ && (
                        <Button
                            variant="contained"
                            onClick={data.draft ? handlePublish : handleMarkAsDraft}
                            disabled={updatingCj}
                        >
                            {data.draft ? 'Опубликовать' : 'Перевести в черновик'}
                        </Button>
                    )}
                </S.FlexSideContainer>
            </S.Header>

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
                    <BIEditScenario
                        isOpen={openSideSheet === SideSheetVariants.EDIT_SCENARIO_BI}
                        onClose={closeSideSheet}
                    />
                    <BIEditSLA
                        isOpen={openSideSheet === SideSheetVariants.EDIT_SLA_BI}
                        onClose={closeSideSheet}
                    />
                </>
            )}
            <Dialog
                opened={modalOpened}
                confirmText="Закрыть"
                onConfirm={closeModal}
                onClose={closeModal}
                showDeclineButton={false}
            >
                CJ не может быть опубликован, так как в нем содержатся неопубликованные BI. Сначала
                опубликуйте BI, а потом вы сможете опубликовать свой CJ.
            </Dialog>
        </S.PageWrapper>
    );
};
