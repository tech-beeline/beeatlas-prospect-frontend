import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getProjectUsecaseLatestDate } from 'features/projects';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    Breadcrumbs,
    Button,
    IconButton,
    Search,
    Select,
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
import { ProjectUsecaseOperationStatus } from 'api/usecase/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatDateToUTC, formatNullableString } from 'utils/formatters';

import { ExportButton } from './components/ExportButton';
import { RelationCard, TechCapabilityCell } from './components';
import { OPERATION_STATUS_DATA, PARTICIPANT_STATUS_DATA, STATUS_FILTER_OPTIONS } from './const';
import * as S from './units';
import { filterOperations, getE2EStepUrl, renderApplication } from './utils';

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
    const [statusFilter, setStatusFilter] = useState<ProjectUsecaseOperationStatus[]>([]);
    const [search, setSearch] = useState('');
    const operations = useMemo(
        () => filterOperations(operationsData?.operations ?? [], statusFilter, search),
        [operationsData, statusFilter, search],
    );
    const handleResetButtonClick = () => {
        setSearch('');
        setStatusFilter([]);
    };

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
                        <ExportButton
                            usecase={usecase}
                            data={operationsData}
                            relations={biStepData}
                        />
                        <IconButton
                            aria-label="История импорта"
                            title="История импорта"
                            size="medium"
                            iconName={Icons.Clock}
                            variant="outlined"
                            onClick={() =>
                                navigate(
                                    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}${R.HISTORY_PATH}?id=${usecase.id}`,
                                )
                            }
                        />
                        <IconButton
                            aria-label="Редактировать"
                            title="Редактировать"
                            size="medium"
                            iconName={Icons.Edit}
                            variant="outlined"
                            onClick={() =>
                                navigate(
                                    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}${R.ADD_PATH}?id=${usecase.projectId}&usecaseId=${usecase.id}`,
                                )
                            }
                        />
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
                                type="CJ"
                                title={cj.name}
                                code={cj.uid}
                                url={`${R.CX_PATH}${R.CJ_PATH}${R.VIEW_PATH}?id=${cj.id}`}
                            />
                        ))}
                        <RelationCard
                            type="ST"
                            title={biStepData.biStep.name}
                            code={biStepData.biStep.uid}
                            url={getE2EStepUrl(biStepData.biStep.uid, usecaseId)}
                        />
                    </S.Relations>
                </S.Section>
            )}

            <S.Section>
                <Text variant="subtitle1">Сценарий</Text>
                <S.Filters>
                    <S.SearchField>
                        <Search
                            fullWidth
                            value={search}
                            placeholder="Поиск по типу или пути метода"
                            onChange={(event) => setSearch(event.target.value)}
                            onClear={() => setSearch('')}
                        />
                    </S.SearchField>
                    <S.FlexContainer>
                        <S.StatusField>
                            <Select
                                fullWidth
                                multiple
                                label="Статус вызова"
                                options={STATUS_FILTER_OPTIONS}
                                values={STATUS_FILTER_OPTIONS.filter(({ id }) =>
                                    statusFilter.includes(id),
                                )}
                                onChange={(values) => setStatusFilter(values.map(({ id }) => id))}
                            />
                        </S.StatusField>
                        <Button
                            disabled={!search && statusFilter.length === 0}
                            variant="plain"
                            size="medium"
                            onClick={handleResetButtonClick}
                        >
                            Сбросить
                        </Button>
                    </S.FlexContainer>
                </S.Filters>
                <S.ScenarioTable>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>Шаг</TableHeaderData>
                            <TableHeaderData>Вызывающий</TableHeaderData>
                            <TableHeaderData>Вызываемый</TableHeaderData>
                            <TableHeaderData>Действие</TableHeaderData>
                            <TableHeaderData>Вызов</TableHeaderData>
                            <TableHeaderData>TC</TableHeaderData>
                            <TableHeaderData>Dynamics C4</TableHeaderData>
                            <TableHeaderData>Статус вызова</TableHeaderData>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operations.length === 0 && (
                            <TableRow dense minHeight={52}>
                                <TableData colSpan={8}>
                                    <Text inactive variant="body3">
                                        {operationsData?.operations.length
                                            ? 'Ничего не найдено'
                                            : 'Вызовов нет'}
                                    </Text>
                                </TableData>
                            </TableRow>
                        )}
                        {operations.map((operation, index) => {
                            const status = OPERATION_STATUS_DATA[operation.status];

                            return (
                                <TableRow dense minHeight={52} key={`${operation.id}-${index}`}>
                                    <TableData>{operation.order}</TableData>
                                    <TableData>{renderApplication(operation.caller)}</TableData>
                                    <TableData>{renderApplication(operation.callee)}</TableData>
                                    <TableData>{formatNullableString(operation.action)}</TableData>
                                    <TableData>{formatNullableString(operation.call)}</TableData>
                                    <TableData>
                                        <TechCapabilityCell
                                            techCapability={operation.techCapability}
                                        />
                                    </TableData>
                                    <TableData>{formatNullableString(null)}</TableData>
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
                                <TableRow
                                    dense
                                    minHeight={52}
                                    key={`${participant.mnemonic}-${index}`}
                                >
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
