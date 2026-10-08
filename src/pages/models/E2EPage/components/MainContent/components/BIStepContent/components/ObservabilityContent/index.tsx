import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { ButtonGroup } from 'components/ui';

import {
    useGetDashboardVersionQuery,
    useGetSequenceAlertByIdQuery,
} from 'api/queries/staging-sequence';
import { useModal } from 'hooks';

import { ImplementationChips } from '../ImplementationChips';

import { CreateAlertSidebar, PublishCard } from './components';
import { ALERT_SOURCE_OPTIONS, AlertSource, E2E_DASHBOARD_PIPELINE, PublishTarget } from './const';
import { IObservabilityContent } from './types';
import {
    findImplementation,
    getAlertCardContent,
    getAlertImplementations,
    getAvailableAlertSources,
    getDashboardCardContent,
} from './utils';

export const ObservabilityContent: FC<IObservabilityContent> = ({
    biStepCode,
    e2eCodes,
    usecases,
}) => {
    const implementations = useMemo(
        () => getAlertImplementations(e2eCodes, usecases),
        [e2eCodes, usecases],
    );
    const availableSources = getAvailableAlertSources(implementations);
    const sourcesKey = availableSources.join('|');
    const [source, setSource] = useState<AlertSource>(availableSources[0] ?? AlertSource.E2E);
    const sourceImplementations = implementations[source];
    const implementationsKey = sourceImplementations.map(({ id }) => id).join('|');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [target, setTarget] = useState<PublishTarget>(PublishTarget.ALERTS);
    const preferredIdRef = useRef<string | null>(null);
    const selected = sourceImplementations.find(({ id }) => id === selectedId) ?? null;

    useEffect(() => {
        if (!availableSources.includes(source)) setSource(availableSources[0] ?? AlertSource.E2E);
    }, [sourcesKey]);

    useEffect(() => {
        const preferredId = preferredIdRef.current;
        preferredIdRef.current = null;
        setSelectedId(
            sourceImplementations.some(({ id }) => id === preferredId)
                ? preferredId
                : sourceImplementations[0]?.id ?? null,
        );
    }, [source, implementationsKey]);

    const { openModal, closeModal, modalOpened } = useModal();

    const isE2E = source === AlertSource.E2E;
    const alert = useGetSequenceAlertByIdQuery(isE2E ? selectedId : null);
    const dashboard = useGetDashboardVersionQuery(E2E_DASHBOARD_PIPELINE, biStepCode);
    const built = findImplementation(implementations, dashboard.data?.sourceUid);
    const alertData = isE2E ? alert.data : undefined;

    const openSidebar = (nextTarget: PublishTarget) => {
        setTarget(nextTarget);
        openModal();
    };

    const handleSaved = (savedSource: AlertSource, implementationId: string) => {
        if (savedSource !== source) preferredIdRef.current = implementationId;
        setSource(savedSource);
        setSelectedId(implementationId);
    };

    if (availableSources.length === 0) {
        return (
            <NotFoundBlock
                imageVariant={ImageVariants.EMPTY_BOX}
                title="Нет реализаций"
                text="Алерты строятся по вызовам шага E2E-сценария или Use Case, а у шага BI их нет"
            />
        );
    }

    return (
        <>
            {availableSources.length > 1 && (
                <ButtonGroup
                    alwaysSelected
                    size="small"
                    type="secondary"
                    selectedOption={{ id: source }}
                    options={ALERT_SOURCE_OPTIONS}
                    onChange={(option) => setSource(option.id as AlertSource)}
                />
            )}
            <ImplementationChips
                implementations={sourceImplementations}
                selectedId={selectedId}
                onSelect={setSelectedId}
            />
            <PublishCard
                isLoading={isE2E && alert.isLoading}
                onAction={() => openSidebar(PublishTarget.ALERTS)}
                {...getAlertCardContent({
                    source,
                    selected,
                    data: alertData,
                    hasError: !!alert.error,
                })}
            />
            <PublishCard
                isLoading={dashboard.isLoading}
                onAction={() => openSidebar(PublishTarget.DASHBOARD)}
                {...getDashboardCardContent({
                    data: dashboard.data,
                    hasError: !!dashboard.error,
                    built,
                })}
            />
            <CreateAlertSidebar
                isOpen={modalOpened}
                onClose={closeModal}
                target={target}
                data={target === PublishTarget.ALERTS ? alertData : dashboard.data}
                source={source}
                selectedId={selectedId}
                implementations={implementations}
                onSaved={handleSaved}
            />
        </>
    );
};
