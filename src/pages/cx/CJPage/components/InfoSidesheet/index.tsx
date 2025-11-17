import React, { FC } from 'react';
import { IconButton, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { useGetUserProductsQuery } from 'api/queries/product';
import { formatNullableString } from 'utils/formatters';

import { IInfoSidesheet } from './types';
import * as S from './units';

export const InfoSidesheet: FC<IInfoSidesheet> = ({ isOpen, onClose, cj }) => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetUserProductsQuery();
    const productIdStr = String(cj.productId ?? cj.id_product);

    return (
        <SideBlock isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.FlexWrapper>
                    <S.SideBlockTitle>Информация</S.SideBlockTitle>

                    <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                </S.FlexWrapper>

                <div>
                    <Text inactive variant="body3">
                        Автор CJ
                    </Text>
                    <Text variant="body2">{cj.author.fullName}</Text>
                </div>

                <div>
                    <Text inactive variant="body3">
                        Приложение
                    </Text>
                    <Text variant="body2">
                        {isLoadingProducts || !productsData ? (
                            <Skeleton height={22} radius={4} />
                        ) : (
                            formatNullableString(
                                productsData.find((product) => product.id === productIdStr)?.name,
                            )
                        )}
                    </Text>
                </div>

                <div>
                    <Text inactive variant="body3">
                        Дата изменения
                    </Text>
                    <Text variant="body2">{dayjs(cj.lastModifiedDate).format('DD.MM.YYYY')}</Text>
                </div>
            </S.Container>
        </SideBlock>
    );
};
