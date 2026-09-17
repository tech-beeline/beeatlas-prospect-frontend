import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Text } from 'components/core';
import {
    Banner,
    Button,
    IconButton,
    Progress,
    ProgressButton,
    Skeleton,
    Stepper,
    TableBody,
    TableData,
    TableHead,
    TableHeaderData,
    TableRow,
} from 'components/ui';

import {
    STAGING_SEQUENCE_PREFIX,
    useGetStagingSequenceBiStepsQuery,
} from 'api/queries/staging-sequence';
import {
    useApplyE2EPlantUmlPipelineMutation,
    useDeclineE2EPlantUmlPipelineMutation,
    useGetE2EPlantUmlPipelineStatusMutation,
    useGetPipelineRunDetailsQuery,
    useStartE2EPlantUmlPipelineMutation,
    useUploadE2EPlantUmlMutation,
} from 'api/queries/staging-service';
import {
    E2EPlantUmlPipelineWaitFor,
    IE2EPlantUmlPipelineConflictResponse,
    IE2EPlantUmlPipelineResult,
    PipelineStatuses,
} from 'api/staging-service/types';
import { E2EContentOptions, E2ETreeItemType } from 'pages/models/E2EPage/types';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { safeNavigateBack } from 'utils/helpers';

import { PlantUmlInput } from './components/ImportDataForm/types';
import { ImportDataForm, ValidationResultForm } from './components';
import * as S from './units';

enum StepVariants {
    DATA = 'DATA',
    RESULT = 'RESULT',
}

type PageState = 'form' | 'processing' | 'review' | 'applying' | 'failed' | 'poll-error';
type ReviewAction = 'apply' | 'decline';

const STEPS = [
    { id: StepVariants.DATA, label: 'Данные решения' },
    { id: StepVariants.RESULT, label: 'Результат' },
];

interface IRequestError extends Partial<IE2EPlantUmlPipelineConflictResponse> {
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

export const E2EImportPlantUmlPage = () => {
    const [searchParams] = useSearchParams();
    const runId = searchParams.get('runId');
    const [draftTargetCode] = useState(() => searchParams.get('code'));
    const isNewE2E = !draftTargetCode;

    const [name, setName] = useState('');
    const [biStepCode, setBIStepCode] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [plantUmlText, setPlantUmlText] = useState('');
    const [pageState, setPageState] = useState<PageState>(runId ? 'processing' : 'form');
    const [reviewResult, setReviewResult] = useState<IE2EPlantUmlPipelineResult | null>(null);
    const [pollError, setPollError] = useState<string | null>(null);
    const [pollTarget, setPollTarget] = useState<E2EPlantUmlPipelineWaitFor>('awaiting_review');
    const [actionError, setActionError] = useState<string | null>(null);
    const [lastReviewAction, setLastReviewAction] = useState<ReviewAction>('apply');
    const pollGenerationRef = useRef(0);

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        data: e2eSteps,
        isLoading: isE2EStepsLoading,
        isError: isE2EStepsError,
        refetch: refetchE2ESteps,
    } = useGetStagingSequenceBiStepsQuery();
    const { mutateAsync: uploadPlantUml, isPending: isUploading } = useUploadE2EPlantUmlMutation();
    const { mutateAsync: startPipeline, isPending: isStartingPipeline } =
        useStartE2EPlantUmlPipelineMutation();
    const { mutateAsync: getPipelineStatus } = useGetE2EPlantUmlPipelineStatusMutation();
    const { mutateAsync: applyPipeline, isPending: isApplying } =
        useApplyE2EPlantUmlPipelineMutation();
    const { mutateAsync: declinePipeline, isPending: isDeclining } =
        useDeclineE2EPlantUmlPipelineMutation();

    const targetE2EStep = e2eSteps?.find((step) => step.code === draftTargetCode);
    const e2ePath = `${R.MODELS_PATH}${R.E2E_PATH}`;
    const importPath = `${e2ePath}${R.IMPORT_PATH}`;

    const navigateToE2EList = useCallback(() => {
        navigate({
            pathname: e2ePath,
            search: new URLSearchParams({ tab: E2EContentOptions.E2E }).toString(),
        });
    }, [e2ePath, navigate]);

    const navigateToCompletedE2E = useCallback(
        async (artifactUid: string) => {
            await queryClient.invalidateQueries({ queryKey: [STAGING_SEQUENCE_PREFIX] });
            navigate({
                pathname: e2ePath,
                search: new URLSearchParams({
                    tab: E2EContentOptions.E2E,
                    id: artifactUid,
                    type: E2ETreeItemType.BI_STEP,
                }).toString(),
            });
        },
        [e2ePath, navigate, queryClient],
    );

    const pollPipeline = useCallback(
        async (waitFor: E2EPlantUmlPipelineWaitFor) => {
            if (!runId) return;

            const generation = ++pollGenerationRef.current;
            setPollTarget(waitFor);
            setPollError(null);
            setPageState(waitFor === 'terminal' ? 'applying' : 'processing');

            try {
                while (pollGenerationRef.current === generation) {
                    const status = await getPipelineStatus({ runId, waitFor, timeoutMs: 30000 });

                    if (pollGenerationRef.current !== generation) return;

                    if (status.status === PipelineStatuses.COMPLETED) {
                        await navigateToCompletedE2E(status.artifactUid);
                        return;
                    }

                    if (status.status === PipelineStatuses.FAILED) {
                        setActionError(null);
                        setPageState('failed');
                        return;
                    }

                    if (
                        waitFor === 'awaiting_review' &&
                        status.status === PipelineStatuses.AWAITING_REVIEW
                    ) {
                        if (!status.result) {
                            throw new Error('Pipeline не вернул результат для проверки.');
                        }
                        setReviewResult(status.result);
                        setPageState('review');
                        return;
                    }

                    if (waitFor === 'awaiting_review' && !status.more) {
                        throw new Error(
                            `Pipeline вернул неожиданный статус «${status.status}». Повторите запрос.`,
                        );
                    }
                }
            } catch (error) {
                if (pollGenerationRef.current !== generation) return;
                setPollError(
                    getRequestErrorMessage(
                        error,
                        'Не удалось получить актуальный статус обработки PlantUML.',
                    ),
                );
                setPageState('poll-error');
            }
        },
        [getPipelineStatus, navigateToCompletedE2E, runId],
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

    const {
        data: pipelineDetails,
        isLoading: isPipelineDetailsLoading,
        isError: isPipelineDetailsError,
        refetch: refetchPipelineDetails,
    } = useGetPipelineRunDetailsQuery(runId, pageState === 'failed');

    const handleStart = async (input: PlantUmlInput) => {
        const e2eName = isNewE2E ? name.trim() : targetE2EStep?.name;
        const targetBIStepCode = isNewE2E ? biStepCode : targetE2EStep?.biStepCode;

        if (!e2eName || !targetBIStepCode) {
            return { message: 'Не удалось определить название или BI step для запуска импорта.' };
        }

        try {
            const artifactUid = draftTargetCode ?? `{${crypto.randomUUID()}}`;
            const source = input.file
                ? { docId: (await uploadPlantUml({ file: input.file })).docId }
                : { plantUml: input.plantUml };
            const pipeline = await startPipeline({
                artifactType: 'e2e-plantuml',
                artifactUid,
                source: 'manual',
                payload: {
                    name: e2eName,
                    biStepCode: targetBIStepCode,
                    ...source,
                },
            });

            if (pipeline.runId === undefined || pipeline.runId === null) {
                throw new Error('Pipeline не вернул runId.');
            }

            navigate(
                {
                    pathname: importPath,
                    search: new URLSearchParams({ runId: String(pipeline.runId) }).toString(),
                },
                { replace: true },
            );
            return null;
        } catch (error) {
            const requestError = error as AxiosError<IRequestError>;
            const activeRunId = requestError.response?.data?.activeRunId;
            const conflictMessage = requestError.response?.data?.error;

            return {
                message:
                    requestError.response?.status === 409 && conflictMessage
                        ? conflictMessage
                        : getRequestErrorMessage(
                              error,
                              'Не удалось запустить обработку PlantUML. Попробуйте снова.',
                          ),
                activeRunId:
                    requestError.response?.status === 409 &&
                    typeof activeRunId === 'number' &&
                    Number.isFinite(activeRunId)
                        ? activeRunId
                        : undefined,
            };
        }
    };

    const handleOpenActiveRun = (activeRunId: number) => {
        navigate(
            {
                pathname: importPath,
                search: new URLSearchParams({ runId: String(activeRunId) }).toString(),
            },
            { replace: true },
        );
    };

    const handleApply = async () => {
        if (!runId) return;
        setActionError(null);
        setLastReviewAction('apply');

        try {
            await applyPipeline(runId);
            await pollPipeline('terminal');
        } catch (error) {
            setActionError(
                getRequestErrorMessage(error, 'Не удалось сохранить результат. Попробуйте снова.'),
            );
            setPageState('review');
        }
    };

    const handleDecline = async () => {
        if (!runId) return;
        setActionError(null);
        setLastReviewAction('decline');

        try {
            await declinePipeline(runId);
            navigateToE2EList();
        } catch (error) {
            setActionError(
                getRequestErrorMessage(error, 'Не удалось отменить результат. Попробуйте снова.'),
            );
            setPageState('review');
        }
    };

    const handleBackToForm = async () => {
        if (!runId) return;
        setActionError(null);

        try {
            setReviewResult(null);
            setPollError(null);
            setPageState('form');
            navigate(
                {
                    pathname: importPath,
                    search: draftTargetCode
                        ? new URLSearchParams({ code: draftTargetCode }).toString()
                        : '',
                },
                { replace: true },
            );
        } catch (error) {
            setActionError(
                getRequestErrorMessage(
                    error,
                    'Не удалось вернуться к редактированию. Попробуйте снова.',
                ),
            );
            setPageState('failed');
        }
    };

    const closePage = () => {
        if (pageState === 'processing' || pageState === 'applying') return;
        if (pageState === 'review') {
            void handleDecline();
            return;
        }
        if (runId) {
            navigateToE2EList();
            return;
        }

        const targetSearch = draftTargetCode
            ? new URLSearchParams({
                  tab: E2EContentOptions.E2E,
                  id: draftTargetCode,
                  type: E2ETreeItemType.BI_STEP,
              }).toString()
            : new URLSearchParams({ tab: E2EContentOptions.E2E }).toString();
        safeNavigateBack(navigate, `${e2ePath}?${targetSearch}`);
    };

    const isResultStep = Boolean(runId);
    const activeStep = isResultStep ? StepVariants.RESULT : StepVariants.DATA;
    const isCloseDisabled = pageState === 'processing' || pageState === 'applying';
    const failedStages = pipelineDetails?.stages.filter((stage) => stage.failureReason);
    const existingE2ELoadFailed =
        Boolean(draftTargetCode) &&
        !isE2EStepsLoading &&
        (isE2EStepsError || (e2eSteps && !targetE2EStep));

    return (
        <S.PageWrapper>
            <S.Header>
                <Text variant="subtitle2">
                    {runId
                        ? 'Обработка PlantUML'
                        : isNewE2E
                        ? 'Создание шага E2E-сценария'
                        : 'Импортирование PlantUML'}
                </Text>
                <IconButton
                    size="large"
                    iconName={Icons.Close}
                    disabled={isCloseDisabled || isDeclining}
                    onClick={closePage}
                    aria-label="Закрыть импорт"
                />
            </S.Header>
            <S.Subheader>
                <Stepper
                    direction="horizontal"
                    activeStepId={activeStep}
                    steps={STEPS.map((step) => ({
                        ...step,
                        state:
                            step.id === activeStep
                                ? 'active'
                                : step.id === StepVariants.DATA && isResultStep
                                ? 'success'
                                : 'non-visited',
                    }))}
                />
            </S.Subheader>

            {pageState === 'form' && existingE2ELoadFailed && (
                <S.StateContainer>
                    <Banner
                        color="error"
                        iconName={Icons.WarningCircled}
                        title="Не удалось загрузить данные существующего шага E2E-сценария"
                        actions={[{ label: 'Повторить', onClick: () => void refetchE2ESteps() }]}
                    />
                </S.StateContainer>
            )}

            {pageState === 'form' && !existingE2ELoadFailed && (
                <ImportDataForm
                    isNewE2E={isNewE2E}
                    name={name}
                    biStepCode={biStepCode}
                    file={file}
                    plantUmlText={plantUmlText}
                    onNameChange={setName}
                    onBIStepCodeChange={setBIStepCode}
                    onFileChange={setFile}
                    onPlantUmlTextChange={setPlantUmlText}
                    onOpenActiveRun={handleOpenActiveRun}
                    isSubmitting={
                        isUploading ||
                        isStartingPipeline ||
                        (Boolean(draftTargetCode) && isE2EStepsLoading)
                    }
                    onSubmit={handleStart}
                />
            )}

            {(pageState === 'processing' || pageState === 'applying') && (
                <S.LoadingContainer>
                    <Progress cycled shape="circle" />
                    <Text variant="subtitle1">
                        {pageState === 'applying' ? 'Сохраняем результат' : 'Обрабатываем PlantUML'}
                    </Text>
                    <Text inactive variant="body2">
                        Пожалуйста, не закрывайте страницу до завершения обработки
                    </Text>
                </S.LoadingContainer>
            )}

            {pageState === 'poll-error' && (
                <S.StateContainer>
                    <Banner
                        color="error"
                        iconName={Icons.WarningCircled}
                        title={pollError ?? 'Не удалось получить статус pipeline'}
                    />
                    <Button variant="contained" onClick={() => void pollPipeline(pollTarget)}>
                        Повторить
                    </Button>
                </S.StateContainer>
            )}

            {pageState === 'review' && reviewResult && (
                <ValidationResultForm
                    result={reviewResult}
                    isSaving={isApplying}
                    isDeclining={isDeclining}
                    actionError={actionError}
                    onCancel={handleDecline}
                    onSave={handleApply}
                    onRetryAction={lastReviewAction === 'decline' ? handleDecline : handleApply}
                />
            )}

            {pageState === 'failed' && (
                <>
                    <S.FailureScrollArea>
                        <S.FailureContent>
                            <Banner
                                color="error"
                                iconName={Icons.WarningCircled}
                                title="Не удалось обработать PlantUML"
                            />
                            {actionError && (
                                <Banner
                                    color="error"
                                    iconName={Icons.WarningCircled}
                                    title={actionError}
                                />
                            )}
                            {isPipelineDetailsLoading && <Skeleton height={240} radius={12} />}
                            {!isPipelineDetailsLoading && isPipelineDetailsError && (
                                <Banner
                                    color="error"
                                    iconName={Icons.WarningCircled}
                                    title="Не удалось загрузить причины ошибки"
                                    actions={[
                                        {
                                            label: 'Повторить',
                                            onClick: () => void refetchPipelineDetails(),
                                        },
                                    ]}
                                />
                            )}
                            {!isPipelineDetailsLoading && !isPipelineDetailsError && (
                                <S.FailureSection>
                                    <Text variant="subtitle1">Причина падения по стадиям</Text>
                                    <S.Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderData>Стадия</TableHeaderData>
                                                <TableHeaderData>Ошибка</TableHeaderData>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {failedStages?.map((stage) => (
                                                <TableRow key={stage.id}>
                                                    <TableData>{stage.stageName}</TableData>
                                                    <TableData>{stage.failureReason}</TableData>
                                                </TableRow>
                                            ))}
                                            {!failedStages?.length && (
                                                <TableRow>
                                                    <TableData colSpan={2}>
                                                        Причина ошибки не указана
                                                    </TableData>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </S.Table>
                                </S.FailureSection>
                            )}
                        </S.FailureContent>
                    </S.FailureScrollArea>
                    <S.FailureFooter>
                        <S.FailureButtonsContainer>
                            <ProgressButton
                                variant="outlined"
                                size="medium"
                                state={isDeclining ? 'loading' : 'default'}
                                disabled={isDeclining}
                                onClick={handleBackToForm}
                            >
                                Назад
                            </ProgressButton>
                        </S.FailureButtonsContainer>
                    </S.FailureFooter>
                </>
            )}
        </S.PageWrapper>
    );
};
