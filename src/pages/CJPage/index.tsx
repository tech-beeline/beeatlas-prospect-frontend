import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { NotFoundBlock } from 'components/other';

import { IBIData } from 'api/bi/types';
import { useGetCompleteCJDataByIdQuery, usePartialUpdateCJMutation } from 'api/queries/cj';
import { useGetUserProductsQuery } from 'api/queries/product';
import { useModal, useShowTooltip } from 'hooks';
import * as ROUTER from 'router/const';
import { Dialog } from 'widgets/Dialog';

import { CJUpdateForm } from './components/CJUpdateForm';
import { Table } from './components/Table';
import * as S from './units';

export const CJPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { modalOpened, openModal, closeModal } = useModal();

    const { data, isLoading: isLoadingCJ } = useGetCompleteCJDataByIdQuery(paramId);
    const { data: dataProducts, isLoading: isLoadingProducts } = useGetUserProductsQuery();

    const isLoading = isLoadingCJ || isLoadingProducts;

    const canEditCJ = (dataProducts ?? [])
        .map((product) => String(product.id))
        .includes(String(data?.id_product));

    const hasDraftBIs =
        data?.steps
            .reduce((acc, step) => [...acc, ...step.bi], [] as IBIData[])
            .some((bi) => bi.draft) ?? false;

    const { mutateAsync: updateCJ, isPending: updatingCj } = usePartialUpdateCJMutation();

    const [isOpenSettingsCJ, setOpenSettingsCJ] = useState(false);

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

    const [nameRef, showNameTooltip] = useShowTooltip<HTMLDivElement>();
    const [descriptionRef, showDescriptionTooltip] = useShowTooltip<HTMLDivElement>();

    return (
        <S.PageWrapper>
            <S.Header>
                <S.FlexSideContainer>
                    <Icon
                        iconName={Icons.ArrowLeft}
                        onClick={handleBackIconClick}
                        style={{ cursor: 'pointer' }}
                    />

                    {data && (
                        <div>
                            <S.Name key={data.name} data-tooltip-id="name" ref={nameRef}>
                                {data.name}
                            </S.Name>
                            {showNameTooltip && (
                                <S.TooltipContainer id="name" offset={8} place="bottom" noArrow>
                                    {data.name}
                                </S.TooltipContainer>
                            )}
                            <S.Desription
                                key={data.user_portrait}
                                data-tooltip-id="description"
                                ref={descriptionRef}
                            >
                                {data.user_portrait}
                            </S.Desription>
                            {showDescriptionTooltip && (
                                <S.TooltipContainer
                                    id="description"
                                    offset={8}
                                    place="bottom"
                                    noArrow
                                >
                                    {data.user_portrait}
                                </S.TooltipContainer>
                            )}
                        </div>
                    )}

                    {canEditCJ && (
                        <S.ButtonStyled
                            disabled={!data?.draft}
                            endIcon={<Icon iconName={Icons.Edit} />}
                            onClick={() => setOpenSettingsCJ(!isOpenSettingsCJ)}
                            id="buttonToggleId"
                            data-tooltip-id="editButton"
                        />
                    )}
                    {data && !data.draft && (
                        <S.TooltipContainer id="editButton" offset={8} place="bottom" noArrow>
                            Для редактирования CJ, его нужно сделать черновиком
                        </S.TooltipContainer>
                    )}
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
                    productId={data.id_product}
                    cjId={data.id}
                    draft={data.draft}
                    tableData={data.steps}
                />
            )}

            {!data && !isLoading && (
                <S.NotFoundContainer>
                    <NotFoundBlock />
                </S.NotFoundContainer>
            )}

            {data && (
                <CJUpdateForm
                    isOpen={isOpenSettingsCJ}
                    cjId={data.id}
                    onClose={() => setOpenSettingsCJ(false)}
                    values={{ name: data.name, userPortrait: data.user_portrait }}
                />
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
