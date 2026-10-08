import React, { FC, useMemo, useState } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';

import { useGetDashboardVersionQuery } from 'api/queries/staging-sequence';
import { useModal } from 'hooks';

import { CreateAlertSidebar, PublishCard } from './components';
import { AlertSource, PUBLISH_TARGET_PIPELINE, PublishTarget } from './const';
import { IObservabilityContent } from './types';
import {
    findImplementation,
    getAlertImplementations,
    getAvailableAlertSources,
    getPublishCardContent,
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
    const [target, setTarget] = useState<PublishTarget>(PublishTarget.ALERTS);
    const { openModal, closeModal, modalOpened } = useModal();

    const alerts = useGetDashboardVersionQuery(
        PUBLISH_TARGET_PIPELINE[PublishTarget.ALERTS],
        biStepCode,
    );
    const dashboard = useGetDashboardVersionQuery(
        PUBLISH_TARGET_PIPELINE[PublishTarget.DASHBOARD],
        biStepCode,
    );
    const builtAlerts = findImplementation(implementations, alerts.data?.sourceUid);
    const builtDashboard = findImplementation(implementations, dashboard.data?.sourceUid);
    const targetData = target === PublishTarget.ALERTS ? alerts.data : dashboard.data;
    const targetBuilt = target === PublishTarget.ALERTS ? builtAlerts : builtDashboard;
    const defaultSource = availableSources[0] ?? AlertSource.E2E;

    const openSidebar = (nextTarget: PublishTarget) => {
        setTarget(nextTarget);
        openModal();
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
            <PublishCard
                isLoading={alerts.isLoading}
                onAction={() => openSidebar(PublishTarget.ALERTS)}
                {...getPublishCardContent({
                    target: PublishTarget.ALERTS,
                    data: alerts.data,
                    hasError: !!alerts.error,
                    built: builtAlerts,
                })}
            />
            <PublishCard
                isLoading={dashboard.isLoading}
                onAction={() => openSidebar(PublishTarget.DASHBOARD)}
                {...getPublishCardContent({
                    target: PublishTarget.DASHBOARD,
                    data: dashboard.data,
                    hasError: !!dashboard.error,
                    built: builtDashboard,
                })}
            />
            <CreateAlertSidebar
                isOpen={modalOpened}
                onClose={closeModal}
                target={target}
                data={targetData}
                source={targetBuilt?.source ?? defaultSource}
                selectedId={
                    targetBuilt?.implementation.id ??
                    implementations[defaultSource][0]?.id ??
                    null
                }
                implementations={implementations}
            />
        </>
    );
};
