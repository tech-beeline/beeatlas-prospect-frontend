import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getProjectUsecaseLatestDate } from 'features/projects';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    BadgeSemantic,
    Breadcrumbs,
    Button,
    Icon,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useGetProjectByIdQuery } from 'api/queries/projects';
import { useGetStagingSequenceBiStepByCodeQuery } from 'api/queries/staging-sequence';
import {
    useGetProjectUsecaseOperationsQuery,
    useGetProjectUsecaseQuery,
} from 'api/queries/usecase';
import {
    IProjectUsecaseOperationApplication,
    ProjectUsecaseOperationStatus,
    ProjectUsecaseParticipantStatus,
} from 'api/usecase/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { RelationCard } from './components';
import * as S from './units';
import { getE2EStepUrl } from './utils';

const OPERATION_STATUS_DATA: Record<
    ProjectUsecaseOperationStatus,
    { label: string; semantic: BadgeSemantic }
> = {
    [ProjectUsecaseOperationStatus.CONFIRMED]: {
        label: 'Подтвержден',
        semantic: 'success',
    },
    [ProjectUsecaseOperationStatus.NOT_MAPPED]: {
        label: 'Не смапирован',
        semantic: 'danger',
    },
    [ProjectUsecaseOperationStatus.REVIEW]: {
        label: 'Ревью',
        semantic: 'warning',
    },
    [ProjectUsecaseOperationStatus.PLANNED]: {
        label: 'Планируется',
        semantic: 'neutral',
    },
};

const PARTICIPANT_STATUS_DATA: Record<
    ProjectUsecaseParticipantStatus,
    { label: string; semantic: BadgeSemantic }
> = {
    [ProjectUsecaseParticipantStatus.CONFIRMED]: {
        label: 'Подтвержден',
        semantic: 'success',
    },
    [ProjectUsecaseParticipantStatus.NOT_CONFIRMED]: {
        label: 'Не подтвержден',
        semantic: 'danger',
    },
};

const renderApplication = (application: IProjectUsecaseOperationApplication | null) => {
    if (!application) return formatNullableString(null);

    const mnemonic = formatNullableString(application.mnemonic);

    return application.isPlanned ? `${mnemonic} (Планируется)` : mnemonic;
};

export const ProjectUsecasePage = () => {
    const [params] = useSearchParams();
    const usecaseId = params.get('id');
    const navigate = useNavigate();
    const { data: usecase, isLoading: isLoadingUsecase } = useGetProjectUsecaseQuery(usecaseId);
    const { data: project, isLoading: isLoadingProject } = useGetProjectByIdQuery(
        usecase?.projectId,
    );
    const isLoading = isLoadingUsecase || isLoadingProject;
    const { data: operationsData, isLoading: isOperationsLoading } =
        useGetProjectUsecaseOperationsQuery(usecase?.projectId, usecase?.id);
    const { data: biStepData, isLoading: isBiStepLoading } = useGetStagingSequenceBiStepByCodeQuery(
        usecase?.biStepCode,
    );

    const navigateToProjects = () => navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}`);
    const navigateToProject = () => {
        if (usecase) {
            navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${usecase.projectId}`);
        }
    };

    if (isLoading || isBiStepLoading || isOperationsLoading) {
        return (
            <S.PageWrapper>
                <Skeleton height={160} radius={12} />
                <Skeleton height={420} radius={12} />
            </S.PageWrapper>
        );
    }

    if (!usecase) {
        return (
            <S.NotFoundPage>
                <NotFoundBlock
                    buttonProps={{ onClick: navigateToProjects }}
                    buttonText="К списку проектов"
                    imageVariant={ImageVariants.QUESTION_BOX}
                    text="Проверьте адрес или вернитесь в библиотеку проектов"
                    title="Use Case не найден"
                />
            </S.NotFoundPage>
        );
    }

    return (
        <S.PageWrapper>
            <S.PageHeader>
                <Breadcrumbs>
                    <BreadCrumbsItem name="Проекты" index={0} id={0} onClick={navigateToProjects} />
                    {project && (
                        <BreadCrumbsItem
                            name={project.name}
                            index={1}
                            id={project.id}
                            onClick={navigateToProject}
                        />
                    )}
                </Breadcrumbs>

                <S.HeaderRow>
                    <S.TitleGroup>
                        <div>
                            <S.TitleContainer>
                                <Text variant="h4">{usecase.name}</Text>
                            </S.TitleContainer>
                            <Text inactive variant="body3">
                                {usecase.code}
                            </Text>
                        </div>
                    </S.TitleGroup>
                    <S.Actions>
                        <Button
                            size="medium"
                            startIcon={<Icon iconName={Icons.Clock} />}
                            variant="outlined"
                            onClick={() =>
                                navigate(
                                    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}${R.HISTORY_PATH}?id=${usecase.id}`,
                                )
                            }
                        >
                            История импорта
                        </Button>
                    </S.Actions>
                </S.HeaderRow>

                <S.Meta>
                    <S.MetaItem>
                        <Text inactive variant="body3">
                            Дата изменения
                        </Text>
                        <Text variant="body2">
                            {dayjs(formatDateToUTC(getProjectUsecaseLatestDate(usecase)))
                                .local()
                                .format('DD.MM.YYYY, HH:mm')}
                        </Text>
                    </S.MetaItem>
                </S.Meta>
            </S.PageHeader>

            {usecase.biStepCode && biStepData && (
                <S.Section>
                    <Text variant="subtitle1">Связи</Text>
                    <S.Relations>
                        {biStepData.cj.map((cj) => (
                            <RelationCard
                                key={cj.id}
                                label="Связанный CJ"
                                title={cj.name}
                                code={cj.uid}
                                url={`${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}?id=${cj.id}`}
                            />
                        ))}
                        <RelationCard
                            label="Связанный шаг E2E-сценария"
                            title={biStepData.biStep.name}
                            code={biStepData.biStep.uid}
                            url={getE2EStepUrl(biStepData.biStep.uid)}
                        />
                    </S.Relations>
                </S.Section>
            )}

            <S.Section>
                <Text variant="subtitle1">Сценарий</Text>
                <S.ScenarioTable>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Шаг</TableHeaderData>
                            <TableHeaderData>Вызывающий</TableHeaderData>
                            <TableHeaderData>Вызываемый</TableHeaderData>
                            <TableHeaderData>Действие</TableHeaderData>
                            <TableHeaderData>Вызов</TableHeaderData>
                            <TableHeaderData>TC</TableHeaderData>
                            {/* <TableHeaderData>Dynamic</TableHeaderData> */}
                            <TableHeaderData>Статус вызова</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operationsData?.operations.map((operation, index) => {
                            const status = OPERATION_STATUS_DATA[operation.status];

                            return (
                                <TableRow dense key={`${operation.id}-${index}`}>
                                    <TableData>{operation.order}</TableData>
                                    <TableData>{renderApplication(operation.caller)}</TableData>
                                    <TableData>{renderApplication(operation.callee)}</TableData>
                                    <TableData>{formatNullableString(operation.action)}</TableData>
                                    <TableData>{formatNullableString(operation.call)}</TableData>
                                    <TableData>
                                        {formatNullableString(operation.technicalCapability)}
                                    </TableData>
                                    <TableData>
                                        <Badge semantic={status.semantic}>{status.label}</Badge>
                                    </TableData>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </S.ScenarioTable>
            </S.Section>

            <S.Section>
                <Text variant="subtitle1">Список приложений</Text>
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Мнемоника</TableHeaderData>
                            <TableHeaderData>Название</TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operationsData?.participants.map((participant, index) => {
                            const status = PARTICIPANT_STATUS_DATA[participant.status];

                            return (
                                <TableRow dense key={`${participant.mnemonic}-${index}`}>
                                    <TableData>
                                        {formatNullableString(participant.mnemonic)}
                                    </TableData>
                                    <TableData>{formatNullableString(participant.name)}</TableData>
                                    <TableData>
                                        <Badge semantic={status.semantic}>{status.label}</Badge>
                                    </TableData>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </S.TableStyled>
            </S.Section>
        </S.PageWrapper>
    );
};
