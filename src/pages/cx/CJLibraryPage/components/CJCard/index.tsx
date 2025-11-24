import React, { FC, useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Label, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { DropdownMenu } from 'components/interaction';

import { useDeleteCJMutation } from 'api/queries/cj';
import { useGetAllProductsQuery } from 'api/queries/product';
import { useGetProductsQuery } from 'hooks';
import * as ROUTER from 'router/const';
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
        navigate({
            pathname: `${ROUTER.CX_PATH}${ROUTER.CJ_PATH}${ROUTER.ADD_PATH}`,
            search: id ? createSearchParams({ id: String(id) }).toString() : '',
        });
    };
    const hasAccessToProduct = userProductIds.includes(productIdStr);
    const currentProduct = allProducts?.find((product) => String(product.id) === productIdStr);
    return (
        <S.CJCard key={cj.id}>
            <S.FlexContainer>
                <Label
                    variant="contained"
                    title={cj.draft ? 'Черновик' : 'Опубликован'}
                    type={cj.draft ? 'default' : 'success'}
                />
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
            <S.Title onClick={() => handleCJClick(cj.id)}>{cj.name}</S.Title>
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
