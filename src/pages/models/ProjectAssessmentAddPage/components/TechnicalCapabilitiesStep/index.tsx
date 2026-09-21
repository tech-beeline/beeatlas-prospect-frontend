import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { AddCapabilitySideblock } from 'features/projects';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Autocomplete, Badge, Banner, Button, Chip, Icon, IconButton } from 'components/ui';

import { getTechCapabilityById } from 'api/capability';
import { CapabilitySearchVariant, ISearchResult } from 'api/capability/types';
import {
    ICatalogTechnicalCapability,
    ISystem,
    useAssessmentBcQuery,
    useAssessmentSystemsQuery,
} from 'api/queries/projects';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { buildTechnicalCapabilitiesMarkdown, downloadMarkdown } from '../../markdownExport';
import { ProcessingState } from '../ProcessingState';
import { StepFooter } from '../StepFooter';

import { CatalogMatchGroup } from './components';
import { ITechnicalCapabilitiesStepProps } from './types';
import * as S from './units';

const getDecisionBadge = (decision: string) => {
    if (decision === 'reused') return { label: 'Переиспользование', semantic: 'success' as const };
    if (decision === 'new') return { label: 'Новая', semantic: 'info' as const };
    if (decision === 'excluded') return { label: 'Исключена', semantic: 'neutral' as const };

    return null;
};

export const TechnicalCapabilitiesStep: FC<ITechnicalCapabilitiesStepProps> = ({
    savedData,
    setSavedData,
    discoveryState,
    discoveryProgress,
    discoveryStartedAt,
    catalogState,
    catalogProgress,
    catalogStartedAt,
    onAnalyze,
    onNext,
    nextLoading,
    onBack,
    onRestart,
}) => {
    useEffect(() => {
        if (discoveryState === 'done' && catalogState === 'idle') onAnalyze();
    }, [catalogState, discoveryState, onAnalyze]);

    const currentIndex = Math.min(
        savedData.candidateIndex,
        Math.max(0, savedData.technicalCapabilities.length - 1),
    );
    const setCurrentIndex = (update: (index: number) => number) =>
        setSavedData((data) => ({ ...data, candidateIndex: update(data.candidateIndex) }));
    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    const systemsQuery = useAssessmentSystemsQuery();
    const [bcSearch, setBcSearch] = useState('');
    const [bcQuery, setBcQuery] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => setBcQuery(bcSearch.trim()), 300);
        return () => clearTimeout(timer);
    }, [bcSearch]);
    const bcResults = useAssessmentBcQuery(bcQuery);
    const [systemSearch, setSystemSearch] = useState('');
    const [newTcSystem, setNewTcSystem] = useState<ISystem>();
    const [newTcParentBc, setNewTcParentBc] = useState<{
        code: string;
        name: string;
        description?: string;
    }>();
    const [manualError, setManualError] = useState(false);
    const [manualLoading, setManualLoading] = useState(false);
    const {
        modalOpened: isAddCapabilitySideblockOpened,
        openModal: openAddCapabilitySideblock,
        closeModal: closeAddCapabilitySideblock,
    } = useModal();
    const {
        modalOpened: isNewTcSideblockOpened,
        openModal: openNewTcSideblock,
        closeModal: closeNewTcSideblock,
    } = useModal();

    const candidates = savedData.technicalCapabilities;
    const selectedRequirementIds = new Set(savedData.selectedRequirementIds);
    const functionalRequirementsForAnalysis = savedData.requirements.filter(
        ({ id, type }) => type === 'FR' && selectedRequirementIds.has(id),
    ).length;
    const currentCandidate = candidates[currentIndex];
    const reviewedCount = candidates.filter(({ decision }) => decision !== 'pending').length;
    const reusedCount = candidates.filter(({ decision }) => decision === 'reused').length;
    const newCount = candidates.filter(({ decision }) => decision === 'new').length;
    const excludedCount = candidates.filter(({ decision }) => decision === 'excluded').length;
    const catalogDone = catalogState === 'done';
    const currentDecisionBadge = currentCandidate
        ? getDecisionBadge(currentCandidate.decision)
        : null;
    const isManualCandidate = Boolean(
        currentCandidate &&
            (currentCandidate.origin === 'manual' || currentCandidate.id.startsWith('manual-')),
    );
    const showCatalogMatches = Boolean(
        currentCandidate &&
            !isManualCandidate &&
            ['pending', 'reused'].includes(currentCandidate.decision),
    );
    const [systemFilter, setSystemFilter] = useState<{
        candidateId: string | null;
        systems: string[];
    }>({ candidateId: null, systems: [] });
    const selectedSystems =
        systemFilter.candidateId === currentCandidate?.id ? systemFilter.systems : [];
    const manuallyAddedCapabilities = (currentCandidate?.selectedCapabilities || []).filter(
        ({ origin }) => origin === 'manual',
    );
    const matchGroups = [
        ...(manuallyAddedCapabilities.length
            ? [
                  {
                      id: `manual-${currentCandidate?.id}`,
                      code: 'Выбраны из текущего ландшафта',
                      name: 'Добавленные ТС',
                      relevance: 100,
                      technicalCapabilities: manuallyAddedCapabilities,
                  },
              ]
            : []),
        ...(currentCandidate?.matches.filter(
            ({ technicalCapabilities }) => technicalCapabilities.length,
        ) || []),
    ];
    const candidateSystems = Array.from(
        new Set(
            matchGroups.flatMap(({ technicalCapabilities }) =>
                technicalCapabilities.flatMap(({ systems }) => systems),
            ),
        ),
    );
    const filteredMatchGroups = selectedSystems.length
        ? matchGroups
              .map((businessCapability) => ({
                  ...businessCapability,
                  technicalCapabilities: businessCapability.technicalCapabilities.filter(
                      ({ systems }) => systems.some((system) => selectedSystems.includes(system)),
                  ),
              }))
              .filter(({ technicalCapabilities }) => technicalCapabilities.length)
        : matchGroups;

    const toggleSystemFilter = (system: string) => {
        if (!currentCandidate) return;

        setSystemFilter((filter) => {
            const systems = filter.candidateId === currentCandidate.id ? filter.systems : [];
            return {
                candidateId: currentCandidate.id,
                systems: systems.includes(system)
                    ? systems.filter((selectedSystem) => selectedSystem !== system)
                    : [...systems, system],
            };
        });
    };

    const excludedCapabilityCodes = useMemo(
        () =>
            candidates
                .flatMap(
                    ({ selectedCapabilities, selectedCapability }) =>
                        selectedCapabilities?.map((tc) => tc.code) || [selectedCapability?.code],
                )
                .filter((code): code is string => Boolean(code)),
        [candidates],
    );

    const updateCandidate = (
        candidateId: string,
        update: Partial<typeof savedData.technicalCapabilities[number]>,
    ) => {
        setSavedData((data) => ({
            ...data,
            technicalCapabilities: data.technicalCapabilities.map((candidate) =>
                candidate.id === candidateId ? { ...candidate, ...update } : candidate,
            ),
        }));
    };

    const selectCatalogCapability = (capability: ICatalogTechnicalCapability) => {
        if (!currentCandidate) return;

        const previous = currentCandidate.selectedCapabilities || [];
        const selected = previous.some((tc) => tc.code === capability.code)
            ? previous.filter((tc) => tc.code !== capability.code)
            : [...previous, capability];
        updateCandidate(currentCandidate.id, {
            decision: selected.length ? 'reused' : 'pending',
            selectedCapability: selected[0],
            selectedCapabilities: selected,
            system: undefined,
            parentBc: undefined,
            systems: Array.from(new Set(selected.flatMap((tc) => tc.systems))),
        });
    };

    const excludeCurrentCandidate = () => {
        if (!currentCandidate) return;

        updateCandidate(currentCandidate.id, {
            decision: 'excluded',
        });

        if (currentIndex < candidates.length - 1) {
            setCurrentIndex((index) => index + 1);
        }
    };

    const restoreCurrentCandidate = () => {
        if (!currentCandidate) return;

        const hasSelectedCapabilities = Boolean(
            currentCandidate.selectedCapabilities?.length || currentCandidate.selectedCapability,
        );
        updateCandidate(currentCandidate.id, {
            decision: isManualCandidate || hasSelectedCapabilities ? 'reused' : 'pending',
        });
    };

    const cancelNewCurrentCandidate = () => {
        if (!currentCandidate) return;

        updateCandidate(currentCandidate.id, {
            decision: 'pending',
            selectedCapability: undefined,
            selectedCapabilities: [],
            systems: [],
            system: undefined,
            parentBc: undefined,
        });
    };

    const openSaveAsNew = () => {
        if (!currentCandidate) return;
        const selectedSystem = currentCandidate.system || newTcSystem;
        setNewTcSystem(selectedSystem);
        setSystemSearch(selectedSystem ? `${selectedSystem.code} — ${selectedSystem.name}` : '');
        setNewTcParentBc(currentCandidate.parentBc);
        setBcSearch(
            currentCandidate.parentBc
                ? `${currentCandidate.parentBc.code} — ${currentCandidate.parentBc.name}`
                : '',
        );
        openNewTcSideblock();
    };

    const saveAsNew = () => {
        if (!currentCandidate || !newTcSystem) return;
        updateCandidate(currentCandidate.id, {
            decision: 'new',
            selectedCapability: undefined,
            selectedCapabilities: [],
            systems: [newTcSystem.code],
            system: newTcSystem,
            parentBc: newTcParentBc,
        });
        closeNewTcSideblock();
    };

    const addCapabilities = async (capabilities: ISearchResult[]) => {
        if (!currentCandidate || !capabilities.length || manualLoading) return;
        const candidateId = currentCandidate.id;
        setManualLoading(true);
        setManualError(false);
        try {
            const selected = await Promise.all(
                capabilities.map(async (capability) => {
                    const { data } = await getTechCapabilityById(capability.id);
                    return {
                        id: `manual-${data.id}`,
                        code: data.code,
                        name: data.name,
                        description: data.description,
                        relevance: 100,
                        origin: 'manual' as const,
                        system: data.system?.alias
                            ? { code: data.system.alias, name: data.system.name }
                            : undefined,
                        systems: data.system?.alias ? [data.system.alias] : [],
                        parentBc: data.parents?.[0]
                            ? {
                                  code: data.parents[0].code,
                                  name: data.parents[0].name,
                                  description: data.parents[0].description,
                              }
                            : undefined,
                    };
                }),
            );
            if (!mounted.current) return;
            setSavedData((data) => ({
                ...data,
                technicalCapabilities: data.technicalCapabilities.map((candidate) => {
                    if (candidate.id !== candidateId) return candidate;

                    const selectedCapabilities = [
                        ...(candidate.selectedCapabilities ||
                            (candidate.selectedCapability ? [candidate.selectedCapability] : [])),
                        ...selected.filter(
                            (tc) =>
                                !(
                                    candidate.selectedCapabilities ||
                                    (candidate.selectedCapability
                                        ? [candidate.selectedCapability]
                                        : [])
                                ).some(({ code }) => code === tc.code),
                        ),
                    ];

                    return {
                        ...candidate,
                        decision: 'reused' as const,
                        selectedCapability: selectedCapabilities[0],
                        selectedCapabilities,
                        systems: Array.from(
                            new Set(selectedCapabilities.flatMap((tc) => tc.systems)),
                        ),
                        system: undefined,
                        parentBc: undefined,
                    };
                }),
            }));
        } catch {
            setManualError(true);
        } finally {
            setManualLoading(false);
        }
    };

    if (discoveryState === 'error') {
        return (
            <S.StepLayout>
                <S.StepScroll>
                    <S.WideContent>
                        <Text variant="body2">
                            Обработка остановлена. Повторите запрос или вернитесь к предыдущему
                            шагу.
                        </Text>
                    </S.WideContent>
                </S.StepScroll>
                <StepFooter restartText="Перезапустить TC" onBack={onBack} onRestart={onRestart} />
            </S.StepLayout>
        );
    }

    if (discoveryState !== 'done') {
        return (
            <S.StepLayout>
                <S.StepScroll>
                    <ProcessingState
                        title="Выявление Technical Capability"
                        description="Анализ функциональных требований и формирование кандидатов TC"
                        progress={discoveryProgress}
                        startedAt={discoveryStartedAt}
                        metrics={[
                            {
                                label: 'FR для анализа',
                                value: functionalRequirementsForAnalysis,
                            },
                            { label: 'Прогресс', value: `${discoveryProgress}%` },
                        ]}
                    />
                </S.StepScroll>
                <StepFooter restartText="Перезапустить TC" onBack={onBack} onRestart={onRestart} />
            </S.StepLayout>
        );
    }

    if (catalogState === 'idle' || catalogState === 'starting' || catalogState === 'processing') {
        return (
            <S.StepLayout>
                <S.StepScroll>
                    <ProcessingState
                        title="Поиск TC"
                        description="Сопоставление выявленных TC с возможностями в каталоге"
                        progress={catalogProgress}
                        startedAt={catalogStartedAt}
                        metrics={[
                            { label: 'Выявленные TC', value: candidates.length },
                            { label: 'Прогресс', value: `${catalogProgress}%` },
                        ]}
                    />
                </S.StepScroll>
                <StepFooter restartText="Перезапустить TC" onBack={onBack} onRestart={onRestart} />
            </S.StepLayout>
        );
    }

    if (catalogState === 'error') {
        return (
            <S.StepLayout>
                <S.StepScroll>
                    <S.WideContent>
                        <Text variant="body2">
                            Анализ по каталогу остановлен. Перезапустите TC или вернитесь к
                            предыдущему шагу.
                        </Text>
                    </S.WideContent>
                </S.StepScroll>
                <StepFooter restartText="Перезапустить TC" onBack={onBack} onRestart={onRestart} />
            </S.StepLayout>
        );
    }

    return (
        <S.StepLayout>
            <S.StepScroll>
                <S.WideContent>
                    {manualError && (
                        <Banner
                            color="error"
                            title="Не удалось загрузить данные выбранной TC. Повторите добавление."
                        />
                    )}
                    <S.ContentHeader>
                        <S.TitleContainer>
                            <Text variant="subtitle1">Кандидаты TC на основании требований</Text>
                            <S.HeaderActions>
                                <Button
                                    size="small"
                                    startIcon={<Icon iconName={Icons.Add} />}
                                    variant="outlined"
                                    disabled={manualLoading || !currentCandidate}
                                    onClick={openAddCapabilitySideblock}
                                >
                                    Добавить недостающую TC
                                </Button>
                            </S.HeaderActions>
                        </S.TitleContainer>
                        <Text inactive variant="body3">
                            Для каждого кандидата каталог выдаёт подходящие ВС и входящие в них ТС.
                            Нажмите на ТС — и она будет переиспользована. Если ничего не подошло,
                            сохраните кандидата как новую ТС или исключите его
                        </Text>
                    </S.ContentHeader>

                    {catalogDone && currentCandidate && (
                        <>
                            <S.ReviewSummary>
                                <S.Pagination>
                                    <Button
                                        aria-label="Предыдущий кандидат"
                                        disabled={currentIndex === 0}
                                        startIcon={<Icon iconName={Icons.NavArrowLeft} />}
                                        size="small"
                                        onClick={() => setCurrentIndex((index) => index - 1)}
                                    />
                                    <Text variant="h6">
                                        {currentIndex + 1}/{candidates.length}
                                    </Text>
                                    <Button
                                        aria-label="Следующий кандидат"
                                        disabled={currentIndex === candidates.length - 1}
                                        startIcon={<Icon iconName={Icons.NavArrowRight} />}
                                        size="small"
                                        onClick={() => setCurrentIndex((index) => index + 1)}
                                    />
                                    <Text variant="body2">
                                        Маппинг: {reviewedCount} из {candidates.length} —{' '}
                                        {candidates.length
                                            ? Math.round((reviewedCount / candidates.length) * 100)
                                            : 0}
                                        %
                                    </Text>
                                </S.Pagination>
                                <S.Metrics>
                                    <Text inactive variant="body2">
                                        Переиспользовано: {reusedCount}
                                    </Text>
                                    <Text inactive variant="body2">
                                        Новые: {newCount}
                                    </Text>
                                    <Text inactive variant="body2">
                                        Исключено: {excludedCount}
                                    </Text>
                                </S.Metrics>
                            </S.ReviewSummary>

                            <S.ReviewCard border="default">
                                {currentCandidate.decision === 'excluded' && (
                                    <S.CandidateNotice $tone="neutral">
                                        <S.CandidateNoticeTitle>
                                            <Icon size="medium" iconName={Icons.InfoCircled} />
                                            <Text variant="body3">
                                                ТС пропущена и не участвует в оценке. Нажмите
                                                «Вернуть», чтобы снова учитывать её при расчёте
                                            </Text>
                                        </S.CandidateNoticeTitle>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={restoreCurrentCandidate}
                                        >
                                            Вернуть
                                        </Button>
                                    </S.CandidateNotice>
                                )}
                                {isManualCandidate && currentCandidate.decision !== 'excluded' && (
                                    <S.CandidateNotice $tone="success">
                                        <Text variant="body3">
                                            TC добавлена из текущего ландшафта
                                        </Text>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={excludeCurrentCandidate}
                                        >
                                            Исключить
                                        </Button>
                                    </S.CandidateNotice>
                                )}
                                {!isManualCandidate && currentCandidate.decision === 'new' && (
                                    <S.CandidateNotice $tone="info">
                                        <Text variant="body3">
                                            TC не существует на ландшафте. Она будет учитываться в
                                            оценке, но будет требовать создания на ландшафте в
                                            системе {currentCandidate.system?.name} (
                                            {currentCandidate.system?.code})
                                        </Text>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={cancelNewCurrentCandidate}
                                        >
                                            Отменить
                                        </Button>
                                    </S.CandidateNotice>
                                )}
                                <S.ReviewHeader $compactBottom={!showCatalogMatches}>
                                    <S.ReviewHeaderTitle>
                                        <S.TitleWithBadge>
                                            <Text variant="subtitle2">{currentCandidate.name}</Text>
                                            {currentDecisionBadge && (
                                                <Badge
                                                    semantic={currentDecisionBadge.semantic}
                                                    type="secondary"
                                                >
                                                    {currentDecisionBadge.label}
                                                </Badge>
                                            )}
                                        </S.TitleWithBadge>
                                        {showCatalogMatches && (
                                            <S.HeaderActions>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={excludeCurrentCandidate}
                                                >
                                                    Исключить
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={openSaveAsNew}
                                                >
                                                    Отметить TC как новую
                                                </Button>
                                            </S.HeaderActions>
                                        )}
                                    </S.ReviewHeaderTitle>
                                    {currentCandidate.description && (
                                        <Text inactive variant="body3">
                                            {currentCandidate.description}
                                        </Text>
                                    )}
                                    {showCatalogMatches && candidateSystems.length > 0 && (
                                        <S.SystemChips>
                                            {candidateSystems.map((system) => (
                                                <Chip
                                                    key={system}
                                                    active={selectedSystems.includes(system)}
                                                    label={system}
                                                    onClick={() => toggleSystemFilter(system)}
                                                />
                                            ))}
                                        </S.SystemChips>
                                    )}
                                </S.ReviewHeader>

                                {showCatalogMatches && (
                                    <>
                                        {matchGroups.length === 0 && (
                                            <Text inactive variant="body2">
                                                Совпадения не найдены. Сохраните кандидата как новую
                                                TC или исключите его.
                                            </Text>
                                        )}
                                        <S.MatchGroups>
                                            {filteredMatchGroups.map((businessCapability) => (
                                                <CatalogMatchGroup
                                                    key={`${currentCandidate.id}-${businessCapability.id}`}
                                                    businessCapability={businessCapability}
                                                    candidateId={currentCandidate.id}
                                                    manuallyAdded={
                                                        businessCapability.id ===
                                                        `manual-${currentCandidate.id}`
                                                    }
                                                    selectedCapabilities={
                                                        currentCandidate.selectedCapabilities || []
                                                    }
                                                    onSelect={selectCatalogCapability}
                                                />
                                            ))}
                                        </S.MatchGroups>
                                    </>
                                )}
                            </S.ReviewCard>
                        </>
                    )}
                </S.WideContent>
            </S.StepScroll>
            <StepFooter
                restartText="Перезапустить TC"
                extraAction={
                    <Button
                        size="medium"
                        startIcon={<Icon iconName={Icons.Download} />}
                        type="button"
                        variant="outlined"
                        onClick={() =>
                            downloadMarkdown(
                                buildTechnicalCapabilitiesMarkdown(candidates),
                                'technical-capabilities.md',
                            )
                        }
                    >
                        Экспорт TC
                    </Button>
                }
                nextDisabled={
                    manualLoading ||
                    !catalogDone ||
                    reviewedCount !== candidates.length ||
                    candidates.some((tc) => tc.decision === 'new' && !tc.system?.code)
                }
                nextText="Провести оценку"
                nextTooltip="Проанализируйте всех кандидатов"
                nextLoading={nextLoading}
                onBack={onBack}
                onNext={onNext}
                onRestart={onRestart}
            />
            <AddCapabilitySideblock
                capabilityType={CapabilitySearchVariant.TECH_CAPABILITY}
                excludedCapabilityCodes={excludedCapabilityCodes}
                isOpen={isAddCapabilitySideblockOpened}
                onAdd={addCapabilities}
                onClose={closeAddCapabilitySideblock}
            />
            <SideBlock
                large
                hasBackdrop
                isOpen={isNewTcSideblockOpened}
                onClose={closeNewTcSideblock}
            >
                <S.SideblockLayout>
                    <S.SideblockContent>
                        <S.SideblockHeader>
                            <div>
                                <Text variant="h5">Отметить TC как новую</Text>
                                <Text inactive variant="body3">
                                    {currentCandidate?.name}
                                </Text>
                            </div>
                            <IconButton
                                aria-label="Закрыть форму"
                                iconName={Icons.Close}
                                size="large"
                                onClick={closeNewTcSideblock}
                            />
                        </S.SideblockHeader>
                        <Autocomplete
                            key={`system-${currentCandidate?.id}`}
                            fullWidth
                            enableKeyboardNavigation
                            label="Система для новой TC*"
                            type="select"
                            options={(systemsQuery.data || [])
                                .filter((system) =>
                                    newTcSystem
                                        ? true
                                        : `${system.code} ${system.name}`
                                              .toLowerCase()
                                              .includes(systemSearch.toLowerCase()),
                                )
                                .map((system) => ({ id: system.code, value: system }))}
                            value={
                                newTcSystem ? { id: newTcSystem.code, value: newTcSystem } : null
                            }
                            loading={systemsQuery.isLoading}
                            makeOption={(option) => (
                                <div>
                                    <Text variant="body2">{option.value.name}</Text>
                                    <Text inactive variant="body3">
                                        {option.value.code}
                                    </Text>
                                </div>
                            )}
                            renderValue={(option) => option.value.name}
                            onChange={(option) => {
                                setNewTcSystem(option.value);
                                setSystemSearch(option.value.name);
                            }}
                            onInputChange={(value) => {
                                setSystemSearch(value);
                                setNewTcSystem(undefined);
                            }}
                            onInputClear={() => {
                                setSystemSearch('');
                                setNewTcSystem(undefined);
                            }}
                        />
                        {systemsQuery.isError && (
                            <Banner color="error" title="Не удалось загрузить системы" />
                        )}
                        <Autocomplete
                            key={`parent-bc-${currentCandidate?.id}`}
                            fullWidth
                            enableKeyboardNavigation
                            label="Родительская BC"
                            type="select"
                            options={(bcResults.data || []).map((bc) => ({
                                id: bc.code,
                                value: bc,
                            }))}
                            value={
                                newTcParentBc
                                    ? { id: newTcParentBc.code, value: newTcParentBc }
                                    : null
                            }
                            loading={bcResults.isFetching}
                            makeOption={(option) => (
                                <span>
                                    {option.value.code} — {option.value.name}
                                </span>
                            )}
                            renderValue={(option) => `${option.value.code} — ${option.value.name}`}
                            onChange={(option) => {
                                setNewTcParentBc(option.value);
                                setBcSearch(`${option.value.code} — ${option.value.name}`);
                            }}
                            onInputChange={(value) => {
                                setBcSearch(value);
                                setNewTcParentBc(undefined);
                            }}
                            onInputClear={() => {
                                setBcSearch('');
                                setNewTcParentBc(undefined);
                            }}
                        />
                        {bcResults.isError && <Banner color="error" title="Не удалось найти BC" />}
                    </S.SideblockContent>
                    <S.SideblockFooter>
                        <Button
                            fullWidth
                            size="medium"
                            variant="outlined"
                            onClick={closeNewTcSideblock}
                        >
                            Отмена
                        </Button>
                        <Button
                            fullWidth
                            disabled={!newTcSystem}
                            size="medium"
                            variant="contained"
                            onClick={saveAsNew}
                        >
                            Сохранить
                        </Button>
                    </S.SideblockFooter>
                </S.SideblockLayout>
            </SideBlock>
        </S.StepLayout>
    );
};
