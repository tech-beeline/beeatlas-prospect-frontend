import React, { FC } from 'react';
import dayjs from 'dayjs';
import { useSideSheetStore } from 'features/cx/store';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Button, Skeleton } from 'components/ui';

import { useGetAllProductsQuery } from 'api/queries/product';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { SideSheetVariants } from '../../const';

import { ICJData } from './types';
import * as S from './units';

export const CJData: FC<ICJData> = ({ onClose, cj, isOpen }) => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const productIdStr = String(cj.productId ?? cj.id_product ?? cj.idProductExt);
    const { toggleSideSheet } = useSideSheetStore();
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true} hasBackdrop>
            <S.Container>
                <S.Content hasButtons>
                    <S.FlexWrapper>
                        <Text variant="h5">Данные CJ</Text>

                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.FlexWrapper>

                    <S.TextFieldContainer>
                        <div>
                            <Text variant="body3" inactive>
                                Название
                            </Text>
                            <Text variant="body2">{cj.name}</Text>
                        </div>
                        <div>
                            <Text variant="body3" inactive>
                                Портрет пользователя
                            </Text>
                            <Text variant="body2">{formatNullableString(cj.userPortrait)}</Text>
                        </div>

                        {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                            <div>
                                <Text variant="body3" inactive>
                                    Владелец сценария
                                </Text>
                                {!cj.businessOwner && (
                                    <Text variant="body2">{formatNullableString(null)}</Text>
                                )}
                                {cj.businessOwner && (
                                    <>
                                        <Text variant="body2">
                                            {formatNullableString(cj.businessOwner.fullName)}
                                        </Text>
                                        <Text inactive variant="body3">
                                            {formatNullableString(cj.businessOwner.email)}
                                        </Text>
                                    </>
                                )}
                            </div>
                        )}

                        <div>
                            <Text variant="body3" inactive>
                                Приложение
                            </Text>
                            <Text variant="body2">
                                {isLoadingProducts || !productsData ? (
                                    <Skeleton height={22} radius={4} />
                                ) : (
                                    formatNullableString(
                                        productsData.find(
                                            (product) => String(product.id) === productIdStr,
                                        )?.name,
                                    )
                                )}
                            </Text>
                        </div>

                        {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                            <>
                                {cj.techOwners.length === 0 && (
                                    <div>
                                        <Text variant="body3" inactive>
                                            Технический ответственный
                                        </Text>
                                        <Text variant="body2">{formatNullableString(null)}</Text>
                                    </div>
                                )}

                                {cj.techOwners.length > 0 &&
                                    cj.techOwners.map((techOwner) => (
                                        <div key={techOwner.id}>
                                            <Text variant="body3" inactive>
                                                Технический ответственный
                                            </Text>
                                            <Text variant="body2">{techOwner.fullName}</Text>
                                            <Text inactive variant="body3">
                                                {techOwner.email}
                                            </Text>
                                        </div>
                                    ))}
                            </>
                        )}

                        <div>
                            <Text variant="body3" inactive>
                                Автор CJ
                            </Text>
                            <Text variant="body2">{formatNullableString(cj.author?.fullName)}</Text>
                        </div>

                        <div>
                            <Text variant="body3" inactive>
                                Дата изменения
                            </Text>
                            <Text variant="body2">
                                {dayjs(cj.lastModifiedDate).format('DD.MM.YYYY')}
                            </Text>
                        </div>
                    </S.TextFieldContainer>
                </S.Content>
                <S.ButtonContainer>
                    <Button type="button" onClick={onClose}>
                        Закрыть
                    </Button>
                    {cj.draft && (
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={() => toggleSideSheet(SideSheetVariants.UPDATE_CJ)}
                        >
                            Редактировать
                        </Button>
                    )}
                </S.ButtonContainer>
            </S.Container>
        </SideBlock>
    );
};
