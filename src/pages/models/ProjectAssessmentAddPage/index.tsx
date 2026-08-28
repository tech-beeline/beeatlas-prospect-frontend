import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Banner, IconButton, Skeleton, Stepper } from 'components/ui';

import { postTCDataDescriptionForAssessment } from 'api/projects';
import {
    useCreateAssessmentMutation,
    useGetCatalogAnalysisProgressQuery,
    useGetCatalogAnalysisResultQuery,
    useGetProjectByIdQuery,
    useGetStrucutreProgressByIdQuery,
    useGetStrucutreResultByIdQuery,
    useGetTechnicalCandidatesProgressQuery,
    useGetTechnicalCandidatesResultQuery,
    usePostImportAssessmentMutation,
    usePostStructureAssessmentMutation,
    useStartCatalogAnalysisMutation,
    useStartTechnicalCandidatesMutation,
} from 'api/queries/projects';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    AssessmentResultStep,
    BusinessStatementStep,
    RequirementsStep,
    TechnicalCapabilitiesStep,
} from './components';
import { ASSESSMENT_STEPS, AssessmentStepVariants } from './const';
import { ProcessState, readDraft, removeDraft, writeDraft } from './draft';
import { getAssessmentErrorMessage as getErrorMessage } from './errors';
import { buildImpact } from './impact';
import { buildCreateAssessmentDto } from './persistence';
import * as S from './units';

const ProjectAssessmentForm = ({ projectId }: { projectId: string | null }) => {
    const [draft] = useState(() => readDraft(projectId || ''));
    const navigate = useNavigate();
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
    const projectQuery = useGetProjectByIdQuery(projectId);
    const [stepVariant, setStepVariant] = useState(draft.stepVariant);
    const [savedData, setSavedData] = useState(draft.savedData);
    const [requestError, setRequestError] = useState<unknown>(() =>
        [draft.requirementsState, draft.technicalState, draft.catalogState].includes('error')
            ? new Error('Предыдущая обработка была прервана. Запустите её повторно.')
            : null,
    );

    const [requirementsState, setRequirementsState] = useState<ProcessState>(
        draft.requirementsState,
    );
    const [requirementsTaskId, setRequirementsTaskId] = useState<string | null>(
        draft.requirementsTaskId,
    );
    const [technicalState, setTechnicalState] = useState<ProcessState>(draft.technicalState);
    const [technicalTaskId, setTechnicalTaskId] = useState<string | null>(draft.technicalTaskId);
    const [catalogState, setCatalogState] = useState<ProcessState>(draft.catalogState);
    const [catalogTaskId, setCatalogTaskId] = useState<string | null>(draft.catalogTaskId);
    const [assessmentState, setAssessmentState] = useState<ProcessState>(draft.assessmentState);
    const [impactLevel, setImpactLevel] = useState(draft.impactLevel);

    const importMutation = usePostImportAssessmentMutation();
    const structureMutation = usePostStructureAssessmentMutation();
    const technicalMutation = useStartTechnicalCandidatesMutation();
    const catalogMutation = useStartCatalogAnalysisMutation();
    const createAssessmentMutation = useCreateAssessmentMutation();

    const requirementsProgressQuery = useGetStrucutreProgressByIdQuery(
        requirementsTaskId,
        requirementsState === 'processing',
    );
    const requirementsResultQuery = useGetStrucutreResultByIdQuery(
        requirementsTaskId,
        requirementsState === 'processing' && Boolean(requirementsProgressQuery.data?.done),
    );
    const technicalProgressQuery = useGetTechnicalCandidatesProgressQuery(
        technicalTaskId,
        technicalState === 'processing',
    );
    const technicalResultQuery = useGetTechnicalCandidatesResultQuery(
        technicalTaskId,
        technicalState === 'processing' && Boolean(technicalProgressQuery.data?.done),
    );
    const catalogProgressQuery = useGetCatalogAnalysisProgressQuery(
        catalogTaskId,
        catalogState === 'processing',
    );
    const catalogResultQuery = useGetCatalogAnalysisResultQuery(
        catalogTaskId,
        catalogState === 'processing' && Boolean(catalogProgressQuery.data?.done),
    );
    useEffect(() => {
        if (requirementsResultQuery.data && requirementsState === 'processing') {
            setSavedData((data) => ({
                ...data,
                requirements: requirementsResultQuery.data.requirements,
            }));
            setRequirementsState('done');
        }
    }, [requirementsResultQuery.data, requirementsState]);

    useEffect(() => {
        if (technicalResultQuery.data && technicalState === 'processing') {
            setSavedData((data) => ({
                ...data,
                technicalCapabilities: technicalResultQuery.data.candidates.map((candidate) => ({
                    ...candidate,
                    systems: [],
                    matches: [],
                    decision: 'pending',
                    origin: 'discovered',
                })),
            }));
            setTechnicalState('done');
        }
    }, [technicalResultQuery.data, technicalState]);

    useEffect(() => {
        if (catalogResultQuery.data && catalogState === 'processing') {
            setSavedData((data) => ({
                ...data,
                technicalCapabilities: data.technicalCapabilities.map((candidate, index) => {
                    const result = catalogResultQuery.data.candidates[index];
                    const analyzed =
                        result?.name === candidate.name
                            ? result
                            : catalogResultQuery.data.candidates.find(
                                  ({ name }) => name === candidate.name,
                              );

                    return analyzed
                        ? {
                              ...candidate,
                              systems: candidate.systems,
                              matches: analyzed.matches,
                          }
                        : candidate;
                }),
            }));
            setCatalogState('done');
        }
    }, [catalogResultQuery.data, catalogState]);

    useEffect(() => {
        const failures = [
            {
                error: requirementsProgressQuery.error || requirementsResultQuery.error,
                state: requirementsState,
                stop: setRequirementsState,
            },
            {
                error: technicalProgressQuery.error || technicalResultQuery.error,
                state: technicalState,
                stop: setTechnicalState,
            },
            {
                error: catalogProgressQuery.error || catalogResultQuery.error,
                state: catalogState,
                stop: setCatalogState,
            },
        ];
        failures.forEach(({ error, state, stop }) => {
            if (error && state === 'processing') {
                stop('error');
                setRequestError(error);
            }
        });
    }, [
        requirementsProgressQuery.error,
        requirementsResultQuery.error,
        technicalProgressQuery.error,
        technicalResultQuery.error,
        catalogProgressQuery.error,
        catalogResultQuery.error,
        requirementsState,
        technicalState,
        catalogState,
    ]);

    const storageWarningShown = useRef(false);
    const assessmentSaved = useRef(false);
    const assessmentSaving = useRef(false);
    useEffect(() => {
        if (!projectId || assessmentSaved.current) return;
        try {
            writeDraft(projectId, {
                version: 1,
                stepVariant,
                savedData,
                requirementsState,
                requirementsTaskId,
                technicalState,
                technicalTaskId,
                catalogState,
                catalogTaskId,
                assessmentState,
                impactLevel,
            });
        } catch {
            if (!storageWarningShown.current) {
                storageWarningShown.current = true;
                showSnackbar({
                    message:
                        'Не удалось сохранить черновик в браузере. Хранилище недоступно или переполнено.',
                });
            }
        }
    }, [
        projectId,
        stepVariant,
        savedData,
        requirementsState,
        requirementsTaskId,
        technicalState,
        technicalTaskId,
        catalogState,
        catalogTaskId,
        assessmentState,
        impactLevel,
        showSnackbar,
    ]);

    const currentStepIndex = ASSESSMENT_STEPS.findIndex(({ id }) => id === stepVariant);

    const goToStep = (stepIndex: number) => {
        const step = ASSESSMENT_STEPS[stepIndex];
        if (step) setStepVariant(step.id);
    };

    const handleClose = () => {
        if (projectQuery.data) {
            navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}${R.VIEW_PATH}?id=${projectQuery.data.id}`);
            return;
        }
        navigate(`${R.MODELS_PATH}${R.PROJECTS_PATH}`);
    };

    const operation = useRef(0);
    const catalogStarting = useRef(false);
    useEffect(
        () => () => {
            operation.current += 1;
        },
        [],
    );
    const sourceSignature = JSON.stringify([
        savedData.confluenceUrl,
        savedData.businessDescription,
    ]);
    const startRequirements = async (force = false) => {
        if (
            !force &&
            sourceSignature === savedData.sourceSignature &&
            ['done', 'processing', 'starting'].includes(requirementsState)
        ) {
            setStepVariant(AssessmentStepVariants.REQUIREMENTS);
            return;
        }
        const run = ++operation.current;
        catalogStarting.current = false;
        setRequestError(null);
        setRequirementsTaskId(null);
        setTechnicalTaskId(null);
        setCatalogTaskId(null);
        setTechnicalState('idle');
        setCatalogState('idle');
        setAssessmentState('idle');
        setRequirementsState('starting');
        setStepVariant(AssessmentStepVariants.REQUIREMENTS);
        setSavedData((data) => ({ ...data, requirements: [], technicalCapabilities: [] }));

        try {
            const importResult =
                !force && savedData.rawText && sourceSignature === savedData.sourceSignature
                    ? { raw_text: savedData.rawText }
                    : savedData.confluenceUrl
                    ? await importMutation.mutateAsync({
                          confluence_pat: savedData.confluencePat,
                          confluence_url: savedData.confluenceUrl,
                      })
                    : await importMutation.mutateAsync({
                          text: savedData.businessDescription,
                      });
            if (run !== operation.current) return;
            setSavedData((data) => ({ ...data, rawText: importResult.raw_text, sourceSignature }));
            const structureResult = await structureMutation.mutateAsync({
                raw_text: importResult.raw_text,
            });
            if (run !== operation.current) return;
            setRequirementsTaskId(structureResult.task_id);
            setRequirementsState('processing');
        } catch (error) {
            if (run !== operation.current) return;
            setRequirementsState('error');
            setRequestError(error);
        }
    };

    const startTechnicalCandidates = async (force = false) => {
        if (!force && ['done', 'processing', 'starting'].includes(technicalState)) {
            setStepVariant(AssessmentStepVariants.TECHNICAL_CAPABILITIES);
            return;
        }
        const run = ++operation.current;
        setRequestError(null);
        setTechnicalTaskId(null);
        setCatalogTaskId(null);
        setAssessmentState('idle');
        setTechnicalState('starting');
        setCatalogState('idle');
        setStepVariant(AssessmentStepVariants.TECHNICAL_CAPABILITIES);
        setSavedData((data) => ({ ...data, technicalCapabilities: [] }));

        try {
            const taskDescription = savedData.rawText
                ? (await postTCDataDescriptionForAssessment({ raw_content: savedData.rawText }))
                      .data.task_description
                : '';
            if (run !== operation.current) return;
            setSavedData((data) => ({ ...data, taskDescription, candidateIndex: 0 }));
            const result = await technicalMutation.mutateAsync({
                requirements: savedData.requirements,
                taskDescription,
            });
            if (run !== operation.current) return;
            setTechnicalTaskId(result.taskId);
            setTechnicalState('processing');
        } catch (error) {
            if (run !== operation.current) return;
            setTechnicalState('error');
            setRequestError(error);
        }
    };

    const startCatalogAnalysis = async () => {
        if (catalogStarting.current || catalogState === 'processing') return;
        if (savedData.technicalCapabilities.length === 0) {
            setCatalogState('done');
            return;
        }
        catalogStarting.current = true;
        const run = operation.current;
        setRequestError(null);
        setCatalogTaskId(null);
        setCatalogState('starting');

        try {
            const result = await catalogMutation.mutateAsync({
                candidates: savedData.technicalCapabilities.map((candidate) => ({
                    id: candidate.id,
                    name: candidate.name,
                    description: candidate.description,
                    rationale: candidate.rationale,
                    score: candidate.score,
                    frIds: candidate.frIds,
                })),
            });
            if (run !== operation.current) return;
            setCatalogTaskId(result.taskId);
            setCatalogState('processing');
        } catch (error) {
            if (run !== operation.current) return;
            setCatalogState('error');
            setRequestError(error);
        } finally {
            catalogStarting.current = false;
        }
    };

    const startAssessment = async () => {
        if (!projectQuery.data || assessmentSaving.current) return;

        assessmentSaving.current = true;
        const nextImpactLevel = buildImpact(savedData.technicalCapabilities).impactLevel;
        setRequestError(null);

        try {
            await createAssessmentMutation.mutateAsync(
                buildCreateAssessmentDto(projectQuery.data.id, savedData, nextImpactLevel),
            );
            assessmentSaved.current = true;
            try {
                if (projectId) removeDraft(projectId);
            } catch {
                // Сохранённую оценку всё равно показываем: ошибка очистки браузерного
                // хранилища не должна приводить к повторному POST оценки.
            }
            setImpactLevel(nextImpactLevel);
            setAssessmentState('done');
            setStepVariant(AssessmentStepVariants.ASSESSMENT);
            showSnackbar({
                message:
                    'Оценка завершена и сохранена в проекте. Теперь её можно опубликовать или скачать по клику на кнопку «Публикация»',
            });
        } catch (error) {
            setRequestError(error);
        } finally {
            assessmentSaving.current = false;
        }
    };

    if (projectQuery.isLoading) {
        return (
            <S.PageWrapper>
                <S.LoadingWrapper>
                    <Skeleton height={56} radius={12} />
                    <Skeleton height={420} radius={12} />
                </S.LoadingWrapper>
            </S.PageWrapper>
        );
    }

    if (projectQuery.isError) {
        return (
            <S.PageWrapper>
                <S.StandaloneBanner>
                    <Banner
                        color="error"
                        iconName={Icons.WarningCircled}
                        title={getErrorMessage(projectQuery.error)}
                    />
                </S.StandaloneBanner>
            </S.PageWrapper>
        );
    }

    if (!projectQuery.data) {
        return (
            <S.PageWrapper>
                <S.NotFoundPage>
                    <NotFoundBlock
                        buttonProps={{ onClick: handleClose }}
                        buttonText="К списку проектов"
                        imageVariant={ImageVariants.QUESTION_BOX}
                        text="Откройте форму из карточки существующего проекта"
                        title="Проект не найден"
                    />
                </S.NotFoundPage>
            </S.PageWrapper>
        );
    }

    const requirementsProgress = requirementsProgressQuery.data?.done
        ? 100
        : requirementsProgressQuery.data
        ? Math.max(
              10,
              Math.round(
                  (requirementsProgressQuery.data.current_chunk /
                      Math.max(1, requirementsProgressQuery.data.total_chunks)) *
                      100,
              ),
          )
        : 10;

    return (
        <S.PageWrapper>
            <S.Header>
                <Text variant="subtitle2">Проведение оценки</Text>
                <IconButton
                    aria-label="Закрыть форму"
                    iconName={Icons.Close}
                    size="large"
                    onClick={handleClose}
                />
            </S.Header>
            <S.Subheader>
                <Stepper
                    enableAutoScroll
                    activeStepId={stepVariant}
                    direction="horizontal"
                    steps={ASSESSMENT_STEPS.map((step) => ({
                        id: step.id,
                        label: step.label,
                        state:
                            step.index === currentStepIndex
                                ? 'active'
                                : step.index < currentStepIndex
                                ? 'success'
                                : 'non-visited',
                    }))}
                />
            </S.Subheader>
            <S.StepContent>
                {requestError ? (
                    <S.ErrorBannerWrapper>
                        <Banner
                            color="error"
                            iconName={Icons.WarningCircled}
                            title={getErrorMessage(requestError)}
                            onClose={() => setRequestError(null)}
                        />
                    </S.ErrorBannerWrapper>
                ) : null}
                <S.StepBody>
                    {stepVariant === AssessmentStepVariants.BUSINESS_STATEMENT && (
                        <BusinessStatementStep
                            savedData={savedData}
                            setSavedData={setSavedData}
                            onNext={() => void startRequirements()}
                        />
                    )}
                    {stepVariant === AssessmentStepVariants.REQUIREMENTS && (
                        <RequirementsStep
                            savedData={savedData}
                            processState={
                                requirementsState === 'idle' ? 'starting' : requirementsState
                            }
                            progress={requirementsProgress}
                            onBack={() => goToStep(0)}
                            onNext={() => void startTechnicalCandidates()}
                            onRestart={() => void startRequirements(true)}
                        />
                    )}
                    {stepVariant === AssessmentStepVariants.TECHNICAL_CAPABILITIES && (
                        <TechnicalCapabilitiesStep
                            savedData={savedData}
                            setSavedData={setSavedData}
                            discoveryState={technicalState === 'idle' ? 'starting' : technicalState}
                            discoveryProgress={technicalProgressQuery.data?.progress ?? 10}
                            catalogState={catalogState}
                            catalogProgress={catalogProgressQuery.data?.progress ?? 10}
                            onAnalyze={startCatalogAnalysis}
                            onBack={() => goToStep(1)}
                            onNext={() => void startAssessment()}
                            nextLoading={createAssessmentMutation.isPending}
                            onRestart={() => void startTechnicalCandidates(true)}
                        />
                    )}
                    {stepVariant === AssessmentStepVariants.ASSESSMENT && (
                        <AssessmentResultStep
                            savedData={savedData}
                            processState={assessmentState === 'idle' ? 'starting' : assessmentState}
                            progress={100}
                            impactLevel={impactLevel}
                            onBack={() => goToStep(2)}
                            setSavedData={setSavedData}
                            project={projectQuery.data}
                        />
                    )}
                </S.StepBody>
            </S.StepContent>
        </S.PageWrapper>
    );
};

export const ProjectAssessmentAddPage = () => {
    const [params] = useSearchParams();
    const projectId = params.get('id');
    return <ProjectAssessmentForm key={projectId || 'missing'} projectId={projectId} />;
};
