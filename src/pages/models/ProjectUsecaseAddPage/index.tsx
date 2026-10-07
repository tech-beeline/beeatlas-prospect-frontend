import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Banner, Button, IconButton, Progress, Skeleton, Stepper } from 'components/ui';

import { useGetBusinessInteractionsQuery } from 'api/queries/bi';
import { useGetProjectByIdQuery } from 'api/queries/projects';
import {
    useApplyProjectUsecasePipelineMutation,
    useCancelProjectUsecasePipelineMutation,
    useGetPipelineRunDetailsMutation,
    useGetProjectUsecasePipelineStatusMutation,
    useSaveProjectUsecaseMappingMutation,
    useStartProjectUsecasePipelineMutation,
} from 'api/queries/staging-service';
import { PROJECT_USECASE_PREFIX, useGetProjectUsecasesQuery } from 'api/queries/usecase';
import {
    IProjectUsecaseMappingDecision,
    IProjectUsecasePipelineResult,
    PipelineStatuses,
} from 'api/staging-service/types';
import { getProjectUsecases, ProjectUsecaseImportMode } from 'api/usecase';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { DataStep } from './components/DataStep';
import { ResultStep } from './components/ResultStep';
import { UsecaseImportFormValues, validationSchema } from './form';
import { UsecaseImportStep } from './types';
import * as S from './units';
import { getPipelineFailureReason } from './utils';

type PageState = 'form' | 'processing' | 'review' | 'applying' | 'failed' | 'poll-error';
type PollTarget = 'awaiting_review' | 'terminal';

const STEPS = [
    { id: UsecaseImportStep.DATA, label: 'Данные Use Case' },
    { id: UsecaseImportStep.RESULT, label: 'Результат' },
];

interface IRequestError {
    activeRunId?: number;
    error?: string;
    errorMessage?: string;
    message?: string;
}

const getRequestErrorMessage = (error: unknown, fallback: string) => {
    const requestError = error as AxiosError<IRequestError>;

    return (
        requestError.response?.data?.errorMessage ??
        requestError.response?.data?.message ??
        requestError.response?.data?.error ??
        (error instanceof Error ? error.message : fallback)
    );
};

export const ProjectUsecaseAddPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const projectId = Number(params.get('id')) || null;
    const runId = params.get('runId');
    const importPath = `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}${R.ADD_PATH}`;
    const projectQuery = useGetProjectByIdQuery(projectId ? String(projectId) : null);
    const usecasesQuery = useGetProjectUsecasesQuery(projectId);
    const businessInteractionsQuery = useGetBusinessInteractionsQuery();
    const { mutateAsync: startPipeline, isPending: isStartingPipeline } =
        useStartProjectUsecasePipelineMutation();
    const { mutateAsync: getPipelineStatus } = useGetProjectUsecasePipelineStatusMutation();
    const { mutateAsync: getPipelineRunDetails } = useGetPipelineRunDetailsMutation();
    const { mutateAsync: saveMapping, isPending: isSavingMapping } =
        useSaveProjectUsecaseMappingMutation();
    const { mutateAsync: applyPipeline, isPending: isApplying } =
        useApplyProjectUsecasePipelineMutation();
    const { mutateAsync: cancelPipeline, isPending: isCancelling } =
        useCancelProjectUsecasePipelineMutation();
    const [pageState, setPageState] = useState<PageState>(runId ? 'processing' : 'form');
    const [result, setResult] = useState<IProjectUsecasePipelineResult | null>(null);
    const [pipelineError, setPipelineError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [pollTarget, setPollTarget] = useState<PollTarget>('awaiting_review');
    const [startError, setStartError] = useState<{
        message: string;
        activeRunId?: number;
    } | null>(null);
    const pollGenerationRef = useRef(0);
    const form = useForm<UsecaseImportFormValues>({
        resolver: yupResolver(validationSchema) as Resolver<UsecaseImportFormValues>,
        defaultValues: {
            mode: ProjectUsecaseImportMode.NEW,
            name: '',
            usecaseId: null,
            biStepCode: null,
            plantUml: '',
            file: null,
        },
    });
    const { handleSubmit, setError, setValue, watch } = form;
    const mode = watch('mode');
    const name = watch('name');
    const usecaseId = watch('usecaseId');
    const plantUml = watch('plantUml');
    const file = watch('file');
    const hasScenario =
        mode === ProjectUsecaseImportMode.NEW ? Boolean(name.trim()) : Boolean(usecaseId);
    const canSubmit = hasScenario && Boolean(plantUml.trim() || file);

    useEffect(() => {
        if (mode === ProjectUsecaseImportMode.NEW) setValue('usecaseId', null);
        else setValue('name', '');
    }, [mode, setValue]);

    const navigateToCompletedUsecase = useCallback(
        async (artifactUid: string, usecaseCode?: string) => {
            if (!projectId) return;

            await queryClient.invalidateQueries({
                queryKey: [PROJECT_USECASE_PREFIX, 'LIST', projectId],
            });

            try {
                const usecases = await getProjectUsecases(projectId).then(({ data }) => data);
                const usecase = usecases.find(
                    ({ code }) => code === usecaseCode || code === artifactUid,
                );
                if (usecase) {
                    navigate(
                        `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${usecase.id}`,
                    );
                    return;
                }
            } catch {
                // После успешного pipeline остаётся безопасный переход на страницу проекта.
            }

            navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${projectId}`);
        },
        [navigate, projectId, queryClient],
    );

    const pollPipeline = useCallback(
        async (waitFor: PollTarget) => {
            if (!runId) return;

            const generation = ++pollGenerationRef.current;
            setPollTarget(waitFor);
            setPipelineError(null);
            setPageState(waitFor === 'terminal' ? 'applying' : 'processing');

            try {
                while (pollGenerationRef.current === generation) {
                    const status = await getPipelineStatus({
                        runId,
                        waitFor,
                        timeoutMs: 30000,
                    });

                    if (pollGenerationRef.current !== generation) return;

                    if (status.status === PipelineStatuses.FAILED) {
                        const failureReason = await getPipelineRunDetails(runId)
                            .then(getPipelineFailureReason)
                            .catch(() => null);

                        if (pollGenerationRef.current !== generation) return;

                        setPipelineError(failureReason ?? 'Не удалось обработать PlantUML');
                        setPageState('failed');
                        return;
                    }

                    if (status.status === 'cancelled') {
                        setPipelineError('Обработка PlantUML была отменена');
                        setPageState('failed');
                        return;
                    }

                    if (status.status === PipelineStatuses.COMPLETED) {
                        await navigateToCompletedUsecase(
                            status.artifactUid,
                            status.result?.usecase.code,
                        );
                        return;
                    }

                    if (
                        waitFor === 'awaiting_review' &&
                        (status.status === PipelineStatuses.AWAITING_REVIEW ||
                            status.status === 'reviewing')
                    ) {
                        if (!status.result) {
                            throw new Error('Pipeline не вернул результат для проверки.');
                        }
                        setResult(status.result);
                        setPageState('review');
                        return;
                    }

                    if (!status.more) {
                        throw new Error(
                            `Pipeline вернул неожиданный статус «${status.status}». Повторите запрос.`,
                        );
                    }
                }
            } catch (error) {
                if (pollGenerationRef.current !== generation) return;
                setPipelineError(
                    getRequestErrorMessage(
                        error,
                        'Не удалось получить актуальный статус обработки PlantUML.',
                    ),
                );
                setPageState('poll-error');
            }
        },
        [getPipelineRunDetails, getPipelineStatus, navigateToCompletedUsecase, runId],
    );

    useEffect(() => {
        if (runId) {
            void pollPipeline('awaiting_review');
        } else {
            setPageState('form');
        }

        return () => {
            pollGenerationRef.current += 1;
        };
    }, [pollPipeline, runId]);

    const navigateToProject = useCallback(() => {
        navigate(
            projectId
                ? `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${projectId}`
                : `${R.MODELS_PATH}${R.PROJECTS_PATH}`,
        );
    }, [navigate, projectId]);

    const submitImport = handleSubmit(async (values) => {
        if (!projectId || !projectQuery.data) return;
        setStartError(null);

        const selectedUsecase = usecasesQuery.data?.find(({ id }) => id === values.usecaseId);
        if (values.mode === ProjectUsecaseImportMode.EXISTING && !selectedUsecase) {
            setError('usecaseId', { message: 'Выберите существующий Use Case' });
            return;
        }

        try {
            const fileContents = values.file ? await values.file.text() : null;
            const sourcePlantUml = fileContents ?? values.plantUml;
            if (!sourcePlantUml.trim()) {
                setError('plantUml', { message: 'Добавьте PlantUML текстом или файлом' });
                return;
            }

            const pipeline = await startPipeline({
                artifactType: 'usecase',
                artifactUid: selectedUsecase?.code ?? `${projectId}.${crypto.randomUUID()}`,
                source: 'manual',
                payload: {
                    projectCode: projectQuery.data.uniqueIdent,
                    name: selectedUsecase?.name ?? values.name.trim(),
                    plantUml: sourcePlantUml,
                    ...(values.biStepCode ? { biStepCode: values.biStepCode } : {}),
                },
            });

            if (pipeline.runId === undefined || pipeline.runId === null) {
                throw new Error('Pipeline не вернул runId.');
            }

            navigate(
                {
                    pathname: importPath,
                    search: new URLSearchParams({
                        id: String(projectId),
                        runId: String(pipeline.runId),
                    }).toString(),
                },
                { replace: true },
            );
        } catch (error) {
            const requestError = error as AxiosError<IRequestError>;
            const activeRunId = requestError.response?.data?.activeRunId;
            setStartError({
                message: getRequestErrorMessage(
                    error,
                    'Не удалось запустить обработку PlantUML. Попробуйте снова.',
                ),
                activeRunId:
                    requestError.response?.status === 409 &&
                    typeof activeRunId === 'number' &&
                    Number.isFinite(activeRunId)
                        ? activeRunId
                        : undefined,
            });
        }
    });

    const openPipelineRun = (targetRunId: number) => {
        if (!projectId) return;
        navigate(
            {
                pathname: importPath,
                search: new URLSearchParams({
                    id: String(projectId),
                    runId: String(targetRunId),
                }).toString(),
            },
            { replace: true },
        );
    };

    const returnToForm = () => {
        pollGenerationRef.current += 1;
        setResult(null);
        setPipelineError(null);
        setStartError(null);
        setActionError(null);
        setPageState('form');
        navigate(
            {
                pathname: importPath,
                search: projectId ? new URLSearchParams({ id: String(projectId) }).toString() : '',
            },
            { replace: true },
        );
    };

    const saveDecisions = async (decisions: IProjectUsecaseMappingDecision[]) => {
        if (!runId) return false;

        try {
            for (const decision of decisions) {
                const response = await saveMapping({ runId, decision });
                setResult(response.result);
            }
            return true;
        } catch (error) {
            setActionError(
                getRequestErrorMessage(error, 'Не удалось сохранить решение. Попробуйте снова.'),
            );
            return false;
        }
    };

    const applyResult = async (decisions: IProjectUsecaseMappingDecision[]) => {
        if (!runId) return;
        setActionError(null);

        if (!(await saveDecisions(decisions))) return;

        try {
            await applyPipeline({ runId });
            await pollPipeline('terminal');
        } catch (error) {
            setActionError(
                getRequestErrorMessage(error, 'Не удалось применить Use Case. Попробуйте снова.'),
            );
            setPageState('review');
        }
    };

    const cancelCurrentRun = async (reason: string) => {
        if (!runId) return true;
        setActionError(null);

        try {
            await cancelPipeline({ runId, reason });
            return true;
        } catch (error) {
            setActionError(
                getRequestErrorMessage(error, 'Не удалось отменить импорт. Попробуйте снова.'),
            );
            return false;
        }
    };

    const restartImport = async () => {
        if (!(await cancelCurrentRun('Пользователь вернулся к редактированию Use Case'))) return;
        returnToForm();
    };

    const closePage = () => {
        if (
            isStartingPipeline ||
            isSavingMapping ||
            isApplying ||
            isCancelling ||
            pageState === 'processing' ||
            pageState === 'applying'
        ) {
            return;
        }
        if (pageState === 'review' && runId) {
            void cancelCurrentRun('Пользователь закрыл импорт').then((cancelled) => {
                if (cancelled) navigateToProject();
            });
            return;
        }
        navigateToProject();
    };

    const currentStep = runId ? UsecaseImportStep.RESULT : UsecaseImportStep.DATA;

    if (projectQuery.isLoading) {
        return (
            <S.PageWrapper>
                <S.Content>
                    <Skeleton height={56} radius={12} />
                    <Skeleton height={480} radius={12} />
                </S.Content>
            </S.PageWrapper>
        );
    }

    if (!projectQuery.data) {
        return (
            <S.PageWrapper>
                <S.NotFound>
                    <NotFoundBlock
                        buttonProps={{ onClick: closePage }}
                        buttonText="К списку проектов"
                        imageVariant={ImageVariants.QUESTION_BOX}
                        text="Откройте форму из карточки существующего проекта"
                        title="Проект не найден"
                    />
                </S.NotFound>
            </S.PageWrapper>
        );
    }

    return (
        <S.PageWrapper>
            <S.Header>
                <Text variant="subtitle2">Создание Use Case</Text>
                <IconButton
                    aria-label="Закрыть создание Use Case"
                    disabled={
                        isStartingPipeline ||
                        isSavingMapping ||
                        isApplying ||
                        isCancelling ||
                        pageState === 'processing' ||
                        pageState === 'applying'
                    }
                    iconName={Icons.Close}
                    size="large"
                    onClick={closePage}
                />
            </S.Header>
            <S.Subheader>
                <Stepper
                    activeStepId={currentStep}
                    direction="horizontal"
                    steps={STEPS.map((step) => ({
                        ...step,
                        state:
                            step.id === currentStep
                                ? 'active'
                                : step.id === UsecaseImportStep.DATA &&
                                  currentStep === UsecaseImportStep.RESULT
                                ? 'success'
                                : 'non-visited',
                    }))}
                />
            </S.Subheader>
            {pageState === 'form' && (
                <DataStep
                    form={form}
                    usecases={usecasesQuery.data ?? []}
                    businessInteractions={businessInteractionsQuery.data ?? []}
                    isUsecasesLoading={usecasesQuery.isLoading}
                    isBusinessInteractionsLoading={businessInteractionsQuery.isLoading}
                    isUsecasesError={usecasesQuery.isError}
                    isBusinessInteractionsError={businessInteractionsQuery.isError}
                    isFormDisabled={!projectId || isStartingPipeline}
                    isSubmitting={isStartingPipeline}
                    canSubmit={canSubmit}
                    submitError={startError}
                    onOpenActiveRun={openPipelineRun}
                    onSubmit={submitImport}
                />
            )}
            {(pageState === 'processing' || pageState === 'applying') && (
                <S.Processing>
                    <Progress cycled shape="circle" />
                    <Text variant="subtitle1">
                        {pageState === 'applying' ? 'Применяем Use Case' : 'Обрабатываем PlantUML'}
                    </Text>
                    <Text inactive variant="body2">
                        Пожалуйста, не закрывайте страницу до завершения обработки
                    </Text>
                </S.Processing>
            )}
            {pageState === 'poll-error' && (
                <S.Processing>
                    <Banner
                        color="error"
                        iconName={Icons.WarningCircled}
                        title={pipelineError ?? 'Не удалось получить статус pipeline'}
                    />
                    <Button variant="contained" onClick={() => void pollPipeline(pollTarget)}>
                        Повторить
                    </Button>
                </S.Processing>
            )}
            {pageState === 'failed' && (
                <S.Processing>
                    <Banner
                        color="error"
                        iconName={Icons.WarningCircled}
                        title={pipelineError ?? 'Не удалось обработать PlantUML'}
                    />
                    <Button variant="outlined" onClick={returnToForm}>
                        Вернуться к форме
                    </Button>
                </S.Processing>
            )}
            {pageState === 'review' && result && (
                <ResultStep
                    key={runId}
                    actionError={actionError}
                    applying={isApplying}
                    cancelling={isCancelling}
                    result={result}
                    savingDecision={isSavingMapping}
                    onApply={(decisions) => void applyResult(decisions)}
                    onRestart={() => void restartImport()}
                />
            )}
        </S.PageWrapper>
    );
};
