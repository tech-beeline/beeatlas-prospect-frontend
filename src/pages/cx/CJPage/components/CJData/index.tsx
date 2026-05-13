import React, { FC } from 'react';
import { Button, IconButton, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';
import { useSideSheetStore } from 'features/cx/store';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';

import { useGetAllProductsQuery } from 'api/queries/product';
import {
    formatNullableNumber,
    formatNullableNumberArray,
    formatNullableString,
} from 'utils/formatters';

import { SideSheetVariants } from '../../const';

import { ICJData } from './types';
import * as S from './units';

export const CJData: FC<ICJData> = ({ onClose, cj, isOpen }) => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const productIdStr = String(cj.productId ?? cj.id_product ?? cj.idProductExt);
    const { toggleSideSheet } = useSideSheetStore();
    return (
        <SideBlock isOpen={isOpen} onClose={onClose} large={true}>
            <S.Container>
                <S.Content hasButtons>
                    <S.FlexWrapper>
                        <Text variant="h5">Данные CJ</Text>

                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.FlexWrapper>

                    <S.TextFieldContainer>
                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Название
                            </Text>
                            <Text variant="body2">{cj.name}</Text>
                        </S.FlexContainer>
                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Портрет пользователя
                            </Text>
                            <Text variant="body2">{formatNullableString(cj.userPortrait)}</Text>
                        </S.FlexContainer>
                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Владелец сценария
                            </Text>
                            <Text variant="body2">{formatNullableNumber(cj.businessOwner)}</Text>
                        </S.FlexContainer>

                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Приложение CJ
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
                        </S.FlexContainer>
                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Технический ответственный
                            </Text>
                            <Text variant="body2">{formatNullableNumberArray(cj.techOwner)}</Text>
                        </S.FlexContainer>

                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Автор CJ
                            </Text>
                            <Text variant="body2">{cj.author.fullName}</Text>
                        </S.FlexContainer>

                        <S.FlexContainer>
                            <Text variant="body3" inactive>
                                Дата изменения
                            </Text>
                            <Text variant="body2">
                                {dayjs(cj.lastModifiedDate).format('DD.MM.YYYY')}
                            </Text>
                        </S.FlexContainer>
                    </S.TextFieldContainer>
                </S.Content>
                <S.ButtonContainer>
                    <Button type="button" onClick={onClose}>
                        Отменить
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={() => toggleSideSheet(SideSheetVariants.UPDATE_CJ)}
                    >
                        Редактировать
                    </Button>
                </S.ButtonContainer>
            </S.Container>
        </SideBlock>
    );
};
