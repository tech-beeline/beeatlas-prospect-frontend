import { FC, useState } from 'react';
import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { TargetBadge } from 'features/cx';

import { Text } from 'components/core';
import { ClampedText, DropdownMenuControlled } from 'components/interaction';
import { Link } from 'components/other';
import { Badge, Skeleton } from 'components/ui';

import { getBIEditabilityById } from 'api/bi';
import { IBIData } from 'api/bi/types';
import { useDeleteBIMutation } from 'api/queries/bi';
import { useGetCJCollectionByBIIdQuery } from 'api/queries/cj';
import { useGetAllProductsQuery } from 'api/queries/product';
import { useModal } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
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
                pathname: `${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`,
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

    const handleBiClick = (id?: number) => {
        navigate({
            pathname: `${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
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
                        <S.SpanLinkStyled onClick={() => handleBiClick(bi.id)}>
                            <ClampedText
                                text={bi.name}
                                tooltipId={`bi-name-${bi.id}`}
                                noArrow
                                place="top"
                                offset={8}
                            />
                        </S.SpanLinkStyled>
                    </S.AlignItemsCenterWrapper>
                </S.LabelTh>
                <S.TdId>{bi.uniqueIdent}</S.TdId>
                <S.TableDataStyled>
                    <ClampedText
                        text={bi.descr}
                        tooltipId={`bi-descr-${bi.id}`}
                        noArrow
                        place="top"
                        offset={8}
                    />
                </S.TableDataStyled>
                <S.TableDataStyled>
                    {isLoadingProducts || !productsData ? (
                        <Skeleton height={10} radius={4} />
                    ) : currentProduct ? (
                        <S.SpanLinkStyled
                            onClick={() =>
                                window.open(
                                    `${R.MODELS_PATH}${R.APPS_PATH}${
                                        R.VIEW_PATH
                                    }?cmdb=${encodeURIComponent(currentProduct.alias)}`,
                                )
                            }
                        >
                            <ClampedText
                                text={formatNullableString(currentProduct.name)}
                                tooltipId={`bi-product-${bi.id}`}
                                noArrow
                                place="top"
                                offset={8}
                            />
                        </S.SpanLinkStyled>
                    ) : (
                        <>{formatNullableString(null)}</>
                    )}
                </S.TableDataStyled>
                <S.TableDataStyled>
                    <ClampedText
                        text={formatNullableString(bi.channel?.map((c) => c.name).join(', '))}
                        tooltipId={`bi-channel-${bi.id}`}
                        noArrow
                        place="top"
                        offset={8}
                    />
                </S.TableDataStyled>
                {/* <S.TableDataStyled>{'—'}</S.TableDataStyled> */}
                <S.TableDataStyled>
                    <Badge type="secondary" semantic={bi.draft ? 'neutral' : 'success'}>
                        {bi.draft ? 'Черновик' : 'Опубликован'}
                    </Badge>
                </S.TableDataStyled>
                <S.TableDataStyled>
                    <TargetBadge target={bi.target} />
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
                            <Text variant="subtitle3">Связанные CJ</Text>
                            {cjs &&
                                cjs.map((cj) => (
                                    <div key={cj.id}>
                                        <Link
                                            key={cj.id}
                                            url={`/cx/cj/add?id=${cj.id}`}
                                            title={cj.name}
                                        />
                                        <Text variant="body3" inactive>
                                            {cj.uniqueIdent}
                                        </Text>
                                    </div>
                                ))}
                            {cjs && cjs.length === 0 && (
                                <Text variant="body2" inactive>
                                    Нет связанных CJ
                                </Text>
                            )}
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
