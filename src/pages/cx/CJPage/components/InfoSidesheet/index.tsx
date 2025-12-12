import React, { FC } from 'react';
import { Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Text } from 'components/core';

import { useGetAllProductsQuery } from 'api/queries/product';
import { formatNullableString } from 'utils/formatters';

import { IInfoSidesheet } from './types';
import * as S from './units';

export const InfoSidesheet: FC<IInfoSidesheet> = ({ onClose, cj }) => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const productIdStr = String(cj.productId ?? cj.id_product ?? cj.idProductExt);

    return (
        <S.Container>
            <S.FlexWrapper>
                <S.SideBlockTitle>Информация</S.SideBlockTitle>

                <S.IconButtonWrappet iconName={Icons.Close} onClick={onClose} size="large" />
            </S.FlexWrapper>

            <S.FlexContainer>
                <Text variant="subtitle3">Автор CJ</Text>
                <Text variant="caption">{cj.author.fullName}</Text>
            </S.FlexContainer>

            <S.FlexContainer>
                <Text variant="subtitle3">Приложение</Text>
                <Text variant="caption">
                    {isLoadingProducts || !productsData ? (
                        <Skeleton height={22} radius={4} />
                    ) : (
                        formatNullableString(
                            productsData.find((product) => String(product.id) === productIdStr)
                                ?.name,
                        )
                    )}
                </Text>
            </S.FlexContainer>

            <S.FlexContainer>
                <Text variant="subtitle3">Дата изменения</Text>
                <Text variant="caption">{dayjs(cj.lastModifiedDate).format('DD.MM.YYYY')}</Text>
            </S.FlexContainer>
        </S.Container>
    );
};
