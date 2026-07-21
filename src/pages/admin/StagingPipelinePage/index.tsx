import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    ChronologyTable,
    pipelineStatusToIconMap,
    pipelineStatusToNameMap,
    pipelineStatusToSemanticMap,
} from 'features/staging';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Badge, Breadcrumbs } from 'components/ui';

import { useGetPipelineRunDetailsQuery } from 'api/queries/staging-service';
import * as R from 'router/const';

import { DetailsTable, InfoTable } from './components';
import * as S from './units';

export const StagingPipilinePage = () => {
    const [params] = useSearchParams();
    const pipelineId = params.get('id');
    const preAdapterRunId = params.get('preAdapterRunId');

    const navigate = useNavigate();

    const { data: pipelineDetails, isLoading: isLoadingPipelineDetails } =
        useGetPipelineRunDetailsQuery(pipelineId);

    return (
        <S.PageWrapper>
            <S.HeaderContainer>
                {!preAdapterRunId && (
                    <Breadcrumbs>
                        <BreadCrumbsItem
                            name="Наблюдаемость запусков pipeline"
                            index={0}
                            id={0}
                            onClick={() => navigate(`${R.ADMIN_PATH}${R.STAGING_PATH}`)}
                        />
                    </Breadcrumbs>
                )}
                {preAdapterRunId && (
                    <Breadcrumbs>
                        <BreadCrumbsItem
                            name="Наблюдаемость запусков pipeline"
                            index={0}
                            id={0}
                            onClick={() => navigate(`${R.ADMIN_PATH}${R.STAGING_PATH}`)}
                        />
                        <BreadCrumbsItem
                            name={String(preAdapterRunId)}
                            index={1}
                            id={1}
                            onClick={() =>
                                navigate(
                                    `${R.ADMIN_PATH}${R.STAGING_PATH}${R.PRE_ADAPTER_PATH}?id=${preAdapterRunId}`,
                                )
                            }
                        />
                    </Breadcrumbs>
                )}
                <S.TitleContainer>
                    <Text variant="h4">{pipelineId}</Text>
                    {pipelineDetails && (
                        <Badge
                            type="secondary"
                            semantic={pipelineStatusToSemanticMap[pipelineDetails.status]}
                            icon={pipelineStatusToIconMap[pipelineDetails.status]}
                        >
                            {pipelineStatusToNameMap[pipelineDetails.status]}
                        </Badge>
                    )}
                </S.TitleContainer>
            </S.HeaderContainer>

            {pipelineDetails && (
                <>
                    <InfoTable pipelineDetails={pipelineDetails} />

                    <ChronologyTable pipelineDetails={pipelineDetails} />

                    <DetailsTable pipelineDetails={pipelineDetails} />
                </>
            )}

            {!isLoadingPipelineDetails && !pipelineDetails && (
                <NotFoundBlock
                    imageVariant={ImageVariants.EMPTY_BOX}
                    title="Pipeline не найден"
                    text="Проверьте корректность ссылки"
                />
            )}
        </S.PageWrapper>
    );
};
