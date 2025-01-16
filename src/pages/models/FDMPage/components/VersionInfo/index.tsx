import React, { FC } from 'react';
import { Banner } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { IBusinessCapabilityVersion, ITechCapabilityVersion } from 'api/history/types';
import {
    useGetBusinessCapabilityVersionsComparsionQuery,
    useGetTechCapabilityVersionsComparsionQuery,
} from 'api/queries/history';
import * as R from 'router/const';

import { IVersionInfo } from './types';
import * as S from './units';

export const VersionInfo: FC<IVersionInfo> = ({ capabilityId, versionId, capabilityType }) => {
    const { data: businessCapabilityData } = useGetBusinessCapabilityVersionsComparsionQuery({
        capabilityId,
        version: versionId,
        enabled: capabilityType === 'BUSINESS',
    });

    const { data: techCapabilityData } = useGetTechCapabilityVersionsComparsionQuery({
        capabilityId,
        version: versionId,
        enabled: capabilityType === 'TECH',
    });

    const capabilityVersion =
        capabilityType === 'BUSINESS'
            ? (businessCapabilityData?.[1] as IBusinessCapabilityVersion)?.capability
            : (techCapabilityData?.[1] as ITechCapabilityVersion)?.tech_capability;

    return (
        <>
            {capabilityVersion && (
                <>
                    <S.TitleContainer>
                        <Text variant="h4" data-testid="Title">
                            Версия №{capabilityVersion.version} от{' '}
                            {dayjs(capabilityVersion.modifiedDate).format('DD.MM.YYYY')}
                        </Text>
                    </S.TitleContainer>

                    <S.BannerContainer>
                        <Banner
                            iconName={Icons.InfoCircled}
                            title={
                                <>
                                    Вы просматриваете старую версию технической возможности.
                                    Посмотрите&nbsp;
                                    <Link
                                        outer={false}
                                        title="текущую версию"
                                        url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${capabilityId}&type=${capabilityType}`}
                                    />
                                </>
                            }
                            color="warning"
                        />
                    </S.BannerContainer>

                    <S.FlexContainer>
                        <div>
                            <Text variant="subtitle1">{capabilityVersion.name}</Text>
                            <Text inactive variant="body3">
                                {capabilityVersion.code}
                            </Text>
                        </div>
                        <Text variant="body2">{capabilityVersion.description}</Text>
                        {capabilityType === 'BUSINESS' && businessCapabilityData && (
                            <div>
                                <Text inactive variant="body3">
                                    Родительская возможность
                                </Text>
                                <Link
                                    title={businessCapabilityData[1].capability.parent.name}
                                    url={`/models/fdm?id=${businessCapabilityData[1].capability.parent.name}&type=BUSINESS`}
                                />
                            </div>
                        )}
                        {capabilityType === 'TECH' && techCapabilityData && (
                            <div>
                                <Text inactive variant="body3">
                                    Родительские возможности
                                </Text>
                                <>
                                    {techCapabilityData[1].tech_capability.parents?.map(
                                        (parent, i) => (
                                            <>
                                                <Link
                                                    title={
                                                        parent.name +
                                                        (i !==
                                                        techCapabilityData[1].tech_capability
                                                            .parents.length -
                                                            1
                                                            ? ','
                                                            : '')
                                                    }
                                                    url={`/models/fdm?id=${parent.id}&type=BUSINESS`}
                                                />{' '}
                                            </>
                                        ),
                                    )}
                                </>
                            </div>
                        )}
                    </S.FlexContainer>
                </>
            )}
        </>
    );
};
