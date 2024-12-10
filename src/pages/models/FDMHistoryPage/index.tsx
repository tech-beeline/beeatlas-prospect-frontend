import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Divider, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import * as R from 'router/const';

import * as S from './units';

export const FDMHistoryPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const capabilityId = params.get('id');
    const capabilityType = params.get('type');

    return (
        <S.PageWrapper>
            <S.Wrapper>
                <S.TitleContainer>
                    <IconButton
                        onClick={() =>
                            navigate(
                                `${R.MODELS_PATH}${R.FDM_PATH}?id=${capabilityId}&type=${capabilityType}`,
                            )
                        }
                        size="large"
                        iconName={Icons.ArrowLeft}
                    />
                    <Text variant="h4">Сравнение версий</Text>
                </S.TitleContainer>
                <S.LegendContainer>
                    <S.LegendColor />
                    <Text inactive variant="body3">
                        Внесены изменения
                    </Text>
                </S.LegendContainer>
                <S.Content>
                    <S.VersionContainer>
                        <Text variant="body2">Текущая версия №10</Text>
                        <Text inactive variant="body3">
                            от 23.09.2024, 00:00
                        </Text>
                        <S.DividerContainer>
                            <Divider />
                        </S.DividerContainer>
                        <S.FlexContainer>
                            <S.TextStyled highlighted variant="subtitle1">
                                Управление исходящими коммуникациями
                            </S.TextStyled>
                            <div>
                                <Text inactive variant="body3">
                                    Описание
                                </Text>
                                <S.TextStyled highlighted variant="body2">
                                    Возможность управлять временем и каналом исходящих коммуникаций
                                    с клиентом для обеспечения доставки информации клиенту в рамках
                                    взаимодействия
                                </S.TextStyled>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Домен
                                </Text>
                                <S.TextStyled variant="body2">
                                    Омниканальное управление взаимодействиями; Реализация
                                    возможностей Communication Platform
                                </S.TextStyled>
                            </div>
                        </S.FlexContainer>
                    </S.VersionContainer>
                    <S.VerticalDivider />
                    <S.VersionContainer>
                        <Text variant="body2">Текущая версия №10</Text>
                        <Text inactive variant="body3">
                            от 23.09.2024, 00:00
                        </Text>
                        <S.DividerContainer>
                            <Divider />
                        </S.DividerContainer>
                        <S.FlexContainer>
                            <S.TextStyled variant="subtitle1">
                                Управление коммуникациями
                            </S.TextStyled>
                            <div>
                                <Text inactive variant="body3">
                                    Описание
                                </Text>
                                <S.TextStyled variant="body2">
                                    Возможность управлять временем и каналом исходящих коммуникаций
                                    с клиентом для обеспечения доставки информации клиенту в рамках
                                    взаимодействия потребления ресурсов компании на основании
                                    договора
                                </S.TextStyled>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Домен
                                </Text>
                                <S.TextStyled variant="body2">
                                    Омниканальное управление взаимодействиями; Реализация
                                    возможностей Communication Platform
                                </S.TextStyled>
                            </div>
                        </S.FlexContainer>
                    </S.VersionContainer>
                </S.Content>
            </S.Wrapper>
        </S.PageWrapper>
    );
};
