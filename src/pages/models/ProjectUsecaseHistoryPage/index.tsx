import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { pipelineStatusToNameMap, pipelineStatusToSemanticMap } from 'features/staging';

import { Text } from 'components/core';
import { BreadCrumbsItem } from 'components/interaction';
import { ImageVariants, NotFoundBlock } from 'components/other';
import {
    Badge,
    Breadcrumbs,
    IconButton,
    Skeleton,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import { useGetProjectByIdQuery } from 'api/queries/projects';
import {
    useDownloadProjectUsecaseRawDataMutation,
    useGetProjectUsecaseHistoryQuery,
    useGetProjectUsecaseQuery,
} from 'api/queries/usecase';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import * as S from './units';

const HISTORY_SOURCE = 'Ручной импорт (PlantUML)';

export const ProjectUsecaseHistoryPage = () => {
    const [params] = useSearchParams();
    const usecaseId = params.get('id');
    const navigate = useNavigate();
    const { data: usecase, isLoading: isUsecaseLoading } = useGetProjectUsecaseQuery(usecaseId);
    const { data: project, isLoading: isProjectLoading } = useGetProjectByIdQuery(
        usecase?.projectId,
    );
    const { data: history = [], isLoading: isHistoryLoading } = useGetProjectUsecaseHistoryQuery(
        usecase?.code,
    );
    const { mutateAsync: downloadRawData } = useDownloadProjectUsecaseRawDataMutation();
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const navigateToProjects = () => navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}`);

    const handleDownload = async (rawDataRefId: number, fileName: string) => {
        setDownloadingId(rawDataRefId);

        try {
            const rawData = await downloadRawData(rawDataRefId);
            const file = new Blob([rawData], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');

            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 0);
        } catch {
            showSnackbar({
                message: 'Не удалось скачать PlantUML-файл',
                showCloseButton: true,
            });
        } finally {
            setDownloadingId(null);
        }
    };

    if (isUsecaseLoading || isHistoryLoading || isProjectLoading) {
        return (
            <S.PageWrapper>
                <Skeleton height={80} radius={12} />
                <Skeleton height={320} radius={12} />
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

    const projectUrl = `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${usecase.projectId}`;
    const usecaseUrl = `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${usecase.id}`;

    return (
        <S.PageWrapper>
            <S.Header>
                <Breadcrumbs>
                    <BreadCrumbsItem name="Проекты" index={0} id={0} onClick={navigateToProjects} />
                    {project && (
                        <BreadCrumbsItem
                            name={project.name}
                            index={1}
                            id={project.id}
                            onClick={() => navigate(projectUrl)}
                        />
                    )}
                    {project && (
                        <BreadCrumbsItem
                            name={usecase.name}
                            index={2}
                            id={usecase.id}
                            onClick={() => navigate(usecaseUrl)}
                        />
                    )}
                </Breadcrumbs>
                <Text variant="h4">История импорта</Text>
            </S.Header>

            {history.length === 0 ? (
                <S.EmptyState>
                    <NotFoundBlock
                        imageVariant={ImageVariants.EMPTY_BOX}
                        title="История импорта пуста"
                        text="Для этого Use Case ещё не выполнялся импорт"
                    />
                </S.EmptyState>
            ) : (
                <S.TableStyled>
                    <TableHead>
                        <TableRow>
                            <TableHeaderData>ID</TableHeaderData>
                            <TableHeaderData>Дата</TableHeaderData>
                            <TableHeaderData>Источник</TableHeaderData>
                            <TableHeaderData>Статус</TableHeaderData>
                            <S.ActionHeader />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((item) => (
                            <TableRow key={item.runId}>
                                <TableData>{item.runId}</TableData>
                                <TableData>
                                    {dayjs(item.executionStartedAt).format('DD.MM.YYYY, HH:mm')}
                                </TableData>
                                <TableData>{HISTORY_SOURCE}</TableData>
                                <TableData>
                                    <Badge semantic={pipelineStatusToSemanticMap[item.status]}>
                                        {pipelineStatusToNameMap[item.status]}
                                    </Badge>
                                </TableData>
                                <TableData horizontalAlign="right">
                                    <IconButton
                                        disabled={
                                            item.rawDataRefId === null ||
                                            downloadingId === item.rawDataRefId
                                        }
                                        aria-label={`Скачать импорт ${item.runId}`}
                                        iconName={Icons.Download}
                                        variant="plain"
                                        onClick={() => {
                                            if (item.rawDataRefId !== null) {
                                                void handleDownload(
                                                    item.rawDataRefId,
                                                    `${usecase.code}.puml`,
                                                );
                                            }
                                        }}
                                    />
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </S.TableStyled>
            )}
        </S.PageWrapper>
    );
};
