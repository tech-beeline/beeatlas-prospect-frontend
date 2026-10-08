import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getProjectStatusName, getProjectStatusSemantic } from 'features/projects';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Badge, Breadcrumbs, Chip, Skeleton, Tab, Tabs } from 'components/ui';

import { IProjectAgent } from 'api/projects/types';
import { useGetProjectAssessmentsByIdQuery, useGetProjectByIdQuery } from 'api/queries/projects';
import { useGetProjectUsecasesQuery } from 'api/queries/usecase';
import * as R from 'router/const';
import { formatDateToUTC } from 'utils/formatters';

import { draftKey } from '../ProjectAssessmentAddPage/draft';

import { AgentCard, AssessmentCard, UsecaseResults } from './components';
import { PROJECT_AGENTS, ProjectDataView, ProjectTab } from './const';
import * as S from './units';

export const ProjectPage = () => {
    const [params] = useSearchParams();
    const id = params.get('id');
    const navigate = useNavigate();

    const [tab, setTab] = useState<ProjectTab>(ProjectTab.DATA);
    const [dataView, setDataView] = useState<ProjectDataView>(ProjectDataView.BUSINESS);

    const { data: project, isLoading: isLoadingProject } = useGetProjectByIdQuery(id);
    const { data: projectAssessments, isLoading: isLoadingAssessments } =
        useGetProjectAssessmentsByIdQuery(id);
    const { data: usecases = [], isLoading: isLoadingUsecases } = useGetProjectUsecasesQuery(id);

    const isLoading = isLoadingProject || isLoadingAssessments || isLoadingUsecases;

    if (isLoading) {
        return (
            <S.PageWrapper>
                <S.SkeletonContainer>
                    <Skeleton height={180} radius={12} />
                    <Skeleton height={420} radius={12} />
                </S.SkeletonContainer>
            </S.PageWrapper>
        );
    }

    if (!project) {
        return (
            <S.NotFoundPage>
                <NotFoundBlock
                    buttonProps={{
                        onClick: () => navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}`),
                    }}
                    buttonText="К списку проектов"
                    imageVariant={ImageVariants.QUESTION_BOX}
                    text="Проверьте адрес или вернитесь в библиотеку проектов"
                    title="Проект не найден"
                />
            </S.NotFoundPage>
        );
    }

    const hasAssessment = projectAssessments && projectAssessments.length > 0;
    const currentAssessment = projectAssessments?.slice(0, 1)[0];
    const previousAssessments = projectAssessments?.slice(1);
    const visibleAgents = PROJECT_AGENTS.filter((agent) => agent.type === 'internal');
    const hasAssessmentDraft = localStorage.getItem(draftKey(String(project.id))) !== null;

    const handleRunAgent = (agent: IProjectAgent) => {
        if (agent.id === 1) {
            navigate(
                `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.ASSESSMENT_PATH}${R.ADD_PATH}?id=${project.id}`,
            );
        }
    };

    const handleCreateUsecase = () =>
        navigate(
            `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}${R.ADD_PATH}?id=${project.id}`,
        );

    return (
        <S.PageWrapper>
            <S.ProjectHeader>
                <Breadcrumbs>
                    <BreadCrumbsItem
                        name="Проекты"
                        index={0}
                        id={0}
                        onClick={() => navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}`)}
                    />
                </Breadcrumbs>

                <S.TitleRow>
                    <Text variant="h4">{project.name}</Text>
                    <Badge semantic={getProjectStatusSemantic(project.statusName)}>
                        {getProjectStatusName(project.statusName)}
                    </Badge>
                </S.TitleRow>

                <Text inactive variant="body2">
                    {project.uniqueIdent}
                </Text>

                <S.ProjectMeta>
                    <div>
                        <Text inactive variant="body3">
                            Архитектор проекта
                        </Text>
                        <Text variant="body2">{project.ownerName}</Text>
                    </div>
                    <div>
                        <Text inactive variant="body3">
                            Дата изменения
                        </Text>
                        <Text variant="body2">
                            {dayjs(formatDateToUTC(project.updatedDate ?? project.createdDate))
                                .local()
                                .format('DD.MM.YYYY, HH:mm')}
                        </Text>
                    </div>
                </S.ProjectMeta>
            </S.ProjectHeader>

            <Tabs selectedTabIndex={tab === ProjectTab.DATA ? 0 : 1}>
                <Tab label="Данные проекта" value="data" onClick={() => setTab(ProjectTab.DATA)} />
                <Tab label="Агенты" value="agents" onClick={() => setTab(ProjectTab.AGENTS)} />
            </Tabs>

            {tab === ProjectTab.DATA && (
                <S.TabContent>
                    <S.Chips>
                        <Chip
                            active={dataView === ProjectDataView.BUSINESS}
                            label="Бизнес-постановка проекта"
                            onClick={() => setDataView(ProjectDataView.BUSINESS)}
                        />
                        {hasAssessment && (
                            <Chip
                                active={dataView === ProjectDataView.ASSESSMENT}
                                label="Оценка"
                                onClick={() => setDataView(ProjectDataView.ASSESSMENT)}
                            />
                        )}
                        <Chip
                            active={dataView === ProjectDataView.USECASE}
                            label="Use Case"
                            onClick={() => setDataView(ProjectDataView.USECASE)}
                        />
                    </S.Chips>

                    {dataView === ProjectDataView.BUSINESS && hasAssessment && (
                        <S.MarkdownFileContainer>
                            <Markdown>{project.taskDescription}</Markdown>
                        </S.MarkdownFileContainer>
                    )}

                    {dataView === ProjectDataView.BUSINESS && !hasAssessment && (
                        <S.EmptyState>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                text="Бизнес-постановка отображается после загрузки и прохождения оценки в одном из агентов"
                            />
                        </S.EmptyState>
                    )}

                    {dataView === ProjectDataView.ASSESSMENT && hasAssessment && (
                        <S.Assessments>
                            <Text variant="subtitle1">Актуальная оценка</Text>
                            {currentAssessment && (
                                <S.AssessmentsContainer>
                                    <AssessmentCard current assessment={currentAssessment} />
                                </S.AssessmentsContainer>
                            )}

                            {previousAssessments && previousAssessments.length > 0 && (
                                <>
                                    <Text variant="subtitle1">Прошлые оценки</Text>
                                    <S.AssessmentsContainer>
                                        {previousAssessments.map((assessment) => (
                                            <AssessmentCard
                                                key={assessment.id}
                                                current={false}
                                                assessment={assessment}
                                            />
                                        ))}
                                    </S.AssessmentsContainer>
                                </>
                            )}
                        </S.Assessments>
                    )}

                    {dataView === ProjectDataView.USECASE && (
                        <UsecaseResults usecases={usecases} onCreate={handleCreateUsecase} />
                    )}
                </S.TabContent>
            )}

            {tab === ProjectTab.AGENTS && (
                <S.TabContent>
                    {/* <S.Chips>
                        <Chip
                            active={agentView === 'internal'}
                            label="Внутренние"
                            onClick={() => setAgentView('internal')}
                        />
                        <Chip
                            active={agentView === 'external'}
                            label="Внешние"
                            onClick={() => setAgentView('external')}
                        />
                    </S.Chips> */}
                    <S.AgentsGrid>
                        {visibleAgents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                hasDraft={agent.id === 1 && hasAssessmentDraft}
                                onRun={handleRunAgent}
                            />
                        ))}
                    </S.AgentsGrid>
                </S.TabContent>
            )}
        </S.PageWrapper>
    );
};
