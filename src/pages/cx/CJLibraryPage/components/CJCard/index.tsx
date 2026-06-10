import React, { FC, useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';
import { ClampedText } from 'components/interaction';
import { Badge, Skeleton } from 'components/ui';

import { useDeleteCJMutation } from 'api/queries/cj';
import { useGetAllProductsQuery } from 'api/queries/product';
import { useGetProductsQuery } from 'hooks';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { ICJCard } from './types';
import * as S from './units';

export const CJCard: FC<ICJCard> = ({ cj }) => {
    const navigate = useNavigate();

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
    const { data: products } = useGetProductsQuery();
    const { data: allProducts, isLoading: isLoadingAllProducts } = useGetAllProductsQuery();
    const { mutateAsync: deleteCj } = useDeleteCJMutation();
    const productIdStr = String(cj.productId ?? cj.id_product ?? cj.idProductExt);
    const userProductIds = products?.map((product) => String(product.id)) || [];
    const handleCJClick = (id?: number) => {
        navigate(
            {
                pathname: `${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}`,
                search: id ? createSearchParams({ id: String(id) }).toString() : '',
            },
            {
                state: {
                    from: window.location.pathname,
                },
            },
        );
    };
    const hasAccessToProduct = userProductIds.includes(productIdStr);
    const currentProduct = allProducts?.find((product) => String(product.id) === productIdStr);

    return (
        <S.CJCard key={cj.id}>
            <S.FlexContainer>
                <S.LabelContainer>
                    <Badge type="secondary" semantic={cj.draft ? 'neutral' : 'success'}>
                        {cj.draft ? 'Черновик' : 'Опубликован'}
                    </Badge>
                    <Badge type="secondary" semantic={cj.bpmn ? 'warning' : 'info'}>
                        {cj.bpmn ? 'BPMN' : 'BEEATLAS'}
                    </Badge>
                    {cj.dashboardLink && (
                        <Badge type="secondary" semantic="teal">
                            GRAFANA
                        </Badge>
                    )}
                </S.LabelContainer>
                <DropdownMenu
                    id={String(cj.id)}
                    items={[
                        [
                            {
                                title: 'Редактировать',
                                icon: Icons.Edit,
                                onClick: () => handleCJClick(cj.id),
                                disabled: !hasAccessToProduct,
                            },
                        ],
                        [
                            {
                                title: 'Удалить',
                                icon: Icons.Delete,
                                onClick: async () => deleteCj(String(cj.id)),
                                dangerous: true,
                                disabled: !hasAccessToProduct || !cj.draft,
                            },
                        ],
                    ]}
                />
            </S.FlexContainer>
            <S.TitleContainer>
                <S.Title onClick={() => handleCJClick(cj.id)}>
                    <ClampedText
                        text={cj.name}
                        tooltipId={`сj-${cj.name}`}
                        noArrow
                        place="top"
                        offset={8}
                    />
                </S.Title>
                <Text variant="body3" inactive>
                    {cj.uniqueIdent}
                </Text>
            </S.TitleContainer>
            <S.Description ref={descriptionRef} clampLines={!expandDescription}>
                {cj.userPortrait ?? cj.user_portrait}
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
                    {isLoadingAllProducts || !products ? (
                        <Skeleton height={22} radius={4} />
                    ) : (
                        formatNullableString(currentProduct?.name)
                    )}
                </Text>
            </S.DateContainer>
            <S.DateContainer>
                <Text inactive variant="body3">
                    Дата изменения
                </Text>
                <Text variant="body2">{dayjs(cj.lastModifiedDate).format('DD.MM.YYYY')}</Text>
            </S.DateContainer>
        </S.CJCard>
    );
};
