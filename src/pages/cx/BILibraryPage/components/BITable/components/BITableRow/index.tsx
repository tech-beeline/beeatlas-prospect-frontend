import { FC, useState } from 'react';
import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';
import { TargetLabel } from 'features/cx';

import { DropdownMenuControlled } from 'components/interaction';
import { Link } from 'components/other';

import { getBIEditabilityById } from 'api/bi';
import { IBIData } from 'api/bi/types';
import { useDeleteBIMutation } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import { useGetAllProductsQuery } from 'api/queries/product';
import { useModal } from 'hooks';
import { TooltipContainer } from 'pages/cx/BPMNViewPage/components/TooltipContainer';
import * as ROUTER from 'router/const';
import { formatNullableString } from 'utils/formatters';
import { Dialog } from 'widgets/Dialog';

import { IBITableRow } from './types';
import * as S from './units';

export const BITableRow: FC<IBITableRow> = ({
    bi,
    showShadow = false,
    isActive = false,
    onMenuToggle,
}) => {
    const navigate = useNavigate();
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const currentProduct = productsData?.find(
        (product) => String(product.id) === String(bi.productId),
    );

    const [isExpanded, setIsExpanded] = useState(false);

    const { data: cjs, isLoading: isLoadingCjs } = useGetCJCollectionByBIIdQuery(
        String(bi.id),
        isExpanded,
    );
    const { mutateAsync: deleteBi } = useDeleteBIMutation();

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

    const handleEditBiClick = async (bi: IBIData) => {
        if (!bi.draft) {
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
        if (!bi.draft) {
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
            <S.RowStyled expanded={isExpanded} key={bi.id} isActive={isActive}>
                <S.LabelTh expanded={isExpanded} showShadow={showShadow}>
                    <S.AlignItemsCenterWrapper>
                        <S.IconButtonStyled
                            expanded={isExpanded}
                            size="medium"
                            iconName={Icons.NavArrowDown}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                        <S.SpanLinkStyled
                            onClick={() =>
                                window.open(
                                    `${ROUTER.CX_PATH}${ROUTER.BI_PATH}${
                                        ROUTER.VIEW_PATH
                                    }?${createSearchParams({ id: String(bi.id) })}`,
                                )
                            }
                        >
                            <TooltipContainer text={bi.name} tooltipId={`bi-name-${bi.id}`} />
                        </S.SpanLinkStyled>
                    </S.AlignItemsCenterWrapper>
                </S.LabelTh>
                <S.TdId>{bi.uniqueIdent}</S.TdId>
                <S.TableDataStyled>
                    <TooltipContainer text={bi.descr} tooltipId={`bi-descr-${bi.id}`} />
                </S.TableDataStyled>
                <S.TableDataStyled>
                    {isLoadingProducts || !productsData ? (
                        <Skeleton height={10} radius={4} />
                    ) : currentProduct ? (
                        <S.SpanLinkStyled
                            onClick={() =>
                                window.open(
                                    `${ROUTER.MODELS_PATH}${ROUTER.APPS_PATH}${
                                        ROUTER.VIEW_PATH
                                    }?cmdb=${encodeURIComponent(currentProduct.alias)}`,
                                )
                            }
                        >
                            <TooltipContainer
                                text={formatNullableString(currentProduct.name)}
                                tooltipId={`bi-product-${bi.id}`}
                            />
                        </S.SpanLinkStyled>
                    ) : (
                        <>{formatNullableString(null)}</>
                    )}
                </S.TableDataStyled>
                <S.TableDataStyled>
                    <TooltipContainer
                        text={formatNullableString(bi.channel?.map((c) => c.name).join(', '))}
                        tooltipId={`bi-channel-${bi.id}`}
                    />
                </S.TableDataStyled>
                <S.TableDataStyled>{'—'}</S.TableDataStyled>
                <S.TableDataStyled>
                    {bi.draft ? (
                        <Label title="Черновик" type="default" variant="contained" />
                    ) : (
                        <Label title="Опубликован" type="success" variant="contained" />
                    )}
                </S.TableDataStyled>
                <S.TableDataStyled>
                    <TargetLabel target={bi.target} />
                </S.TableDataStyled>
                <S.TdDate>{dayjs(bi.lastModifiedDate).format('DD.MM.YYYY')}</S.TdDate>
                <S.ActionCell showShadow={showShadow} expanded={isExpanded} isActive={isActive}>
                    <DropdownMenuControlled
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
                        onOpen={() => onMenuToggle?.(bi.id)}
                        onClose={() => onMenuToggle?.(null)}
                    />
                </S.ActionCell>
            </S.RowStyled>
            {isExpanded && (
                <tr>
                    <S.ExpandedTd colSpan={9}>
                        <S.ExpandedContentWrapper>
                            {cjs &&
                                cjs.map((cj) => (
                                    <Link
                                        key={cj.id}
                                        url={`/cx/cj/add?id=${cj.id}`}
                                        title={cj.name}
                                    />
                                ))}
                            {cjs && cjs.length === 0 && <>Нет связанных артефактов</>}
                            {isLoadingCjs && <Skeleton height={20} />}
                        </S.ExpandedContentWrapper>
                    </S.ExpandedTd>
                </tr>
            )}
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
                Редактирование и удаление опубликованного BI недоступно
            </Dialog>
        </>
    );
};
