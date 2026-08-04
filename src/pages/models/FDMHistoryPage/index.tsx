import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';
import { Divider } from 'components/ui';

import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { IBusinessCapabilityVersion, ITechCapabilityVersion } from '../../../api/history/types';
import {
    useGetBusinessCapabilityVersionsComparsionQuery,
    useGetTechCapabilityVersionsComparsionQuery,
} from '../../../api/queries/history';
import { formatNullableString } from '../../../utils/formatters';

import * as S from './units';

export const FDMHistoryPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const capabilityId = params.get('id');
    const capabilityType = params.get('type');
    const versions = params.get('v');

    const { data: businessCapabilityData } = useGetBusinessCapabilityVersionsComparsionQuery({
        capabilityId: String(capabilityId),
        version: Number(versions?.split(',')[0]),
        otherVersion: Number(versions?.split(',')[1]),
        enabled: capabilityType === 'BUSINESS',
    });

    const { data: techCapabilityData } = useGetTechCapabilityVersionsComparsionQuery({
        capabilityId: String(capabilityId),
        version: Number(versions?.split(',')[0]),
        otherVersion: Number(versions?.split(',')[1]),
        enabled: capabilityType === 'TECH',
    });

    const oldVersion =
        capabilityType === 'BUSINESS'
            ? (businessCapabilityData?.[1] as IBusinessCapabilityVersion)?.capability
            : (techCapabilityData?.[1] as ITechCapabilityVersion)?.tech_capability;

    const newVersion =
        capabilityType === 'BUSINESS'
            ? (businessCapabilityData?.[0] as IBusinessCapabilityVersion)?.capability
            : (techCapabilityData?.[0] as ITechCapabilityVersion)?.tech_capability;

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
                {oldVersion && newVersion && (
                    <S.Content>
                        <S.VersionContainer>
                            <Text variant="body2">Версия №{newVersion.version}</Text>
                            <Text inactive variant="body3">
                                от {dayjs(newVersion.modifiedDate).format('DD.MM.YYYY, HH:mm')}
                            </Text>
                            <S.DividerContainer>
                                <Divider />
                            </S.DividerContainer>
                            <S.FlexContainer>
                                <S.TextStyled
                                    highlighted={newVersion.name !== oldVersion.name}
                                    variant="subtitle1"
                                >
                                    {newVersion.name}
                                </S.TextStyled>
                                <div>
                                    <Text inactive variant="body3">
                                        Описание
                                    </Text>
                                    <S.TextStyled
                                        highlighted={
                                            newVersion.description !== oldVersion.description
                                        }
                                        variant="body2"
                                    >
                                        {newVersion.description}
                                    </S.TextStyled>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        {capabilityType === 'BUSINESS'
                                            ? 'Родительская возможность'
                                            : 'Родительские возможности'}
                                    </Text>
                                    <S.TextStyled
                                        highlighted={
                                            capabilityType === 'BUSINESS'
                                                ? businessCapabilityData?.[0]?.capability.parent
                                                      .name !==
                                                  businessCapabilityData?.[1]?.capability.parent
                                                      .name
                                                : techCapabilityData?.[0]?.tech_capability.parents
                                                      .map((parent) => parent.name)
                                                      .join(', ') !==
                                                  techCapabilityData?.[1]?.tech_capability.parents
                                                      .map((parent) => parent.name)
                                                      .join(', ')
                                        }
                                        variant="body2"
                                    >
                                        {capabilityType === 'BUSINESS'
                                            ? businessCapabilityData?.[0]?.capability.parent.name
                                            : techCapabilityData?.[0]?.tech_capability.parents
                                                  .map((parent) => parent.name)
                                                  .join(', ')}
                                    </S.TextStyled>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Владелец
                                    </Text>
                                    <S.TextStyled
                                        highlighted={newVersion.owner !== oldVersion.owner}
                                        variant="body2"
                                    >
                                        {formatNullableString(newVersion.owner)}
                                    </S.TextStyled>
                                </div>
                            </S.FlexContainer>
                        </S.VersionContainer>
                        <S.VerticalDivider />
                        <S.VersionContainer>
                            <Text variant="body2">Версия №{oldVersion.version}</Text>
                            <Text inactive variant="body3">
                                от {dayjs(oldVersion.modifiedDate).format('DD.MM.YYYY, HH:mm')}
                            </Text>
                            <S.DividerContainer>
                                <Divider />
                            </S.DividerContainer>
                            <S.FlexContainer>
                                <S.TextStyled variant="subtitle1">{oldVersion.name}</S.TextStyled>
                                <div>
                                    <Text inactive variant="body3">
                                        Описание
                                    </Text>
                                    <S.TextStyled variant="body2">
                                        {oldVersion.description}
                                    </S.TextStyled>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        {capabilityType === 'BUSINESS'
                                            ? 'Родительская возможность'
                                            : 'Родительские возможности'}
                                    </Text>
                                    <S.TextStyled variant="body2">
                                        {capabilityType === 'BUSINESS'
                                            ? businessCapabilityData?.[1]?.capability.parent.name
                                            : techCapabilityData?.[1]?.tech_capability.parents
                                                  .map((parent) => parent.name)
                                                  .join(', ')}
                                    </S.TextStyled>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Владелец
                                    </Text>
                                    <S.TextStyled variant="body2">
                                        {formatNullableString(oldVersion.owner)}
                                    </S.TextStyled>
                                </div>
                            </S.FlexContainer>
                        </S.VersionContainer>
                    </S.Content>
                )}
            </S.Wrapper>
        </S.PageWrapper>
    );
};
