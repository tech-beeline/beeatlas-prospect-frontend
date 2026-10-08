import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { ImageVariants, NotFoundBlock } from 'components/other';
import { Button, ButtonGroup, Icon, Skeleton } from 'components/ui';

import { useGetDashboardVersionQuery } from 'api/queries/staging-sequence';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ImplementationChips } from '../ImplementationChips';

import { CreateAlertSidebar } from './components';
import {
    ALERT_SOURCE_LABEL,
    ALERT_SOURCE_OPTIONS,
    AlertSource,
    E2E_DASHBOARD_PIPELINE,
    USECASE_ALERTS_UNAVAILABLE,
} from './const';
import { IObservabilityContent } from './types';
import * as S from './units';
import { getAlertImplementations, getAvailableAlertSources } from './utils';

export const ObservabilityContent: FC<IObservabilityContent> = ({ e2eCodes, usecases }) => {
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
    const { data, error, isLoading } = useGetDashboardVersionQuery(
        E2E_DASHBOARD_PIPELINE,
        isE2E ? selectedId : null,
    );

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
            {isE2E && isLoading && <Skeleton radius={12} height={100} />}
            {(!isE2E || ((data || error) && !isLoading)) && (
                <S.AlertContainer>
                    <S.TitleContainer>
                        <div>
                            <Text variant="subtitle3">Alerts</Text>
                            {!isE2E && (
                                <Text inactive variant="body3">
                                    {USECASE_ALERTS_UNAVAILABLE}
                                </Text>
                            )}
                            {isE2E && error && (
                                <Text inactive variant="body3">
                                    Для этого процесса алерты еще не создавались
                                </Text>
                            )}
                            {isE2E && data && (
                                <Text inactive variant="body3">
                                    {data.id}
                                </Text>
                            )}
                        </div>
                        {isE2E && data && (
                            <S.Badge success={data.status === 'success'}>
                                <Text variant="body3">
                                    {data.status === 'success' ? 'Успешно' : 'Ошибка'}
                                </Text>
                            </S.Badge>
                        )}
                    </S.TitleContainer>
                    {!isE2E && (
                        <S.MetadataContainer>
                            <div>
                                <Text inactive variant="body3">
                                    Тип реализации
                                </Text>
                                <Text variant="body2">{ALERT_SOURCE_LABEL[source]}</Text>
                            </div>
                            <div>
                                <Text inactive variant="body3">
                                    Реализация
                                </Text>
                                <Text variant="body2">{selected?.name}</Text>
                            </div>
                        </S.MetadataContainer>
                    )}
                    {isE2E && data && (
                        <>
                            <S.MetadataContainer>
                                <div>
                                    <Text inactive variant="body3">
                                        Версия
                                    </Text>
                                    <Text variant="body2">{data.version}</Text>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Дата генерации
                                    </Text>
                                    <Text variant="body2">
                                        {dayjs(data.created).local().format('DD.MM.YYYY, HH:mm:ss')}
                                    </Text>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Инициатор
                                    </Text>
                                    <Text variant="body2">{data.creator}</Text>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Тип реализации
                                    </Text>
                                    <Text variant="body2">{ALERT_SOURCE_LABEL[source]}</Text>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Реализация
                                    </Text>
                                    <Text variant="body2">{selectedId}</Text>
                                </div>
                            </S.MetadataContainer>
                            <div>
                                <Text inactive variant="body3">
                                    Комментарий
                                </Text>
                                <Text variant="body2">{data.note}</Text>
                            </div>
                        </>
                    )}
                    <S.ButtonContainer>
                        <Button
                            variant="outlined"
                            size="medium"
                            startIcon={<Icon iconName={Icons.Refresh} />}
                            onClick={openModal}
                        >
                            {isE2E && data ? 'Обновить alerts' : 'Создать alerts'}
                        </Button>
                    </S.ButtonContainer>
                </S.AlertContainer>
            )}
            <CreateAlertSidebar
                isOpen={modalOpened}
                onClose={closeModal}
                data={isE2E ? data : undefined}
                source={source}
                selectedId={selectedId}
                implementations={implementations}
                onSaved={handleSaved}
            />
        </>
    );
};
