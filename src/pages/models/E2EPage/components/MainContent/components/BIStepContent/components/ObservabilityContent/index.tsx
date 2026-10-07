import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Text } from 'components/core';
import { Button, Icon, Skeleton } from 'components/ui';

import { useGetSequenceAlertByIdQuery } from 'api/queries/staging-sequence';
import { useModal } from 'hooks';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { ImplementationChips } from '../ImplementationChips';

import { CreateAlertSidebar } from './components';
import { E2E_ALERT_SOURCE_LABEL } from './const';
import { IObservabilityContent } from './types';
import * as S from './units';

export const ObservabilityContent: FC<IObservabilityContent> = ({ e2eCodes }) => {
    const [selectedCode, setSelectedCode] = useState<null | string>(null);

    useEffect(() => {
        setSelectedCode(e2eCodes[0]);
    }, [e2eCodes]);

    const { openModal, closeModal, modalOpened } = useModal();

    const { data, error, isLoading } = useGetSequenceAlertByIdQuery(selectedCode);

    return (
        <>
            <ImplementationChips
                implementations={e2eCodes.map((code) => ({ id: code, label: code }))}
                selectedId={selectedCode}
                onSelect={setSelectedCode}
            />
            {isLoading && <Skeleton radius={12} height={100} />}
            {(data || error) && !isLoading && (
                <S.AlertContainer>
                    <S.TitleContainer>
                        <div>
                            <Text variant="subtitle3">Alerts</Text>
                            {error && (
                                <Text inactive variant="body3">
                                    Для этого процесса алерты еще не создавались
                                </Text>
                            )}
                            {data && (
                                <Text inactive variant="body3">
                                    {data.id}
                                </Text>
                            )}
                        </div>
                        {data && (
                            <S.Badge success={data.status === 'success'}>
                                <Text variant="body3">
                                    {data.status === 'success' ? 'Успешно' : 'Ошибка'}
                                </Text>
                            </S.Badge>
                        )}
                    </S.TitleContainer>
                    {data && (
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
                                    <Text variant="body2">{E2E_ALERT_SOURCE_LABEL}</Text>
                                </div>
                                <div>
                                    <Text inactive variant="body3">
                                        Реализация
                                    </Text>
                                    <Text variant="body2">{selectedCode}</Text>
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
                            {data ? 'Обновить alerts' : 'Создать alerts'}
                        </Button>
                    </S.ButtonContainer>
                </S.AlertContainer>
            )}
            <CreateAlertSidebar
                isOpen={modalOpened}
                onClose={closeModal}
                data={data}
                selectedE2ECode={selectedCode}
                e2eCodes={e2eCodes}
                onSaved={setSelectedCode}
            />
        </>
    );
};
