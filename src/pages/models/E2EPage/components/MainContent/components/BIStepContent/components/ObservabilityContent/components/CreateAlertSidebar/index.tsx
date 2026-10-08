import React, { FC, useEffect, useState } from 'react';
import { useAuthStore } from 'features/auth';

import { SideBlock } from 'components/containers';
import { Text } from 'components/core';
import { Banner, IconButton, Select } from 'components/ui';
import { Button, TextArea } from 'components/ui';

import {
    usePostPipelineRunMutation,
    usePostSequenceAlertByIdMutation,
} from 'api/queries/staging-sequence';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { useSnackbarStore } from 'widgets/Snackbar';

import {
    ALERT_SOURCE_OPTIONS,
    AlertSource,
    E2E_DASHBOARD_PIPELINE,
    PUBLISH_TARGET_NAME,
    PUBLISH_TARGET_TITLE,
    PUBLISH_TARGET_USECASE_UNAVAILABLE,
    PublishTarget,
} from '../../const';

import { ICreateAlertSidebar } from './types';
import * as S from './units';

export const CreateAlertSidebar: FC<ICreateAlertSidebar> = ({
    isOpen,
    onClose,
    target,
    data,
    source: initialSource,
    selectedId,
    implementations,
}) => {
    const [comment, setComment] = useState('');
    const [source, setSource] = useState<AlertSource>(initialSource);
    const [implementation, setImplementation] = useState<string | null>(selectedId);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const sourceOptions = ALERT_SOURCE_OPTIONS.map(({ id, label }) => ({
        id,
        value: label,
        disabled: implementations[id].length === 0,
    }));
    const implementationOptions = implementations[source].map(({ id, name }) => ({
        id,
        value: name,
    }));
    const isUsecaseSource = source === AlertSource.USE_CASE;

    useEffect(() => {
        if (!isOpen) return;
        setSource(initialSource);
        setImplementation(selectedId);
    }, [isOpen, initialSource, selectedId]);

    useEffect(() => setErrorMessage(null), [comment]);

    const userInfo = useAuthStore((store) => store.userInfo);

    const showSnackbar = useSnackbarStore((store) => store.showSnackbar);

    const { mutateAsync: createSequenceAlert, isPending: isAlertPending } =
        usePostSequenceAlertByIdMutation();
    const { mutateAsync: runPipeline, isPending: isRunPending } = usePostPipelineRunMutation();
    const isPending = isAlertPending || isRunPending;

    const changeSource = (nextSource: AlertSource) => {
        setSource(nextSource);
        setImplementation(implementations[nextSource][0]?.id ?? null);
    };

    const handleSave = async () => {
        if (!implementation || isUsecaseSource) return;
        setErrorMessage(null);
        try {
            const creator = `${userInfo?.family_name} ${userInfo?.given_name}`;
            if (target === PublishTarget.ALERTS) {
                await createSequenceAlert({
                    uid: encodeURI(implementation),
                    data: { creator, note: comment },
                });
            } else {
                await runPipeline({
                    code: E2E_DASHBOARD_PIPELINE,
                    data: { uid: implementation, message: comment || undefined, creator },
                });
            }
            showSnackbar({
                message: `${PUBLISH_TARGET_TITLE[target]} ${data ? 'обновлен' : 'создан'}`,
            });
            onClose();
        } catch (e) {
            const message =
                (e as any).response?.data?.errorMessage || (e as any).response?.data?.errorMesssage;
            setErrorMessage(message);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setComment(data?.note ?? '');
        }
    }, [isOpen, data]);

    useEffect(() => {
        if (data && data.note) {
            setComment(data.note);
        }
    }, [data]);

    return (
        <SideBlock hasBackdrop large isOpen={isOpen} onClose={onClose}>
            <S.Container>
                <S.Content>
                    <S.TitleContainer>
                        <Text variant="h5">
                            {`${data ? 'Обновление' : 'Создание'} ${PUBLISH_TARGET_NAME[target]}`}
                        </Text>
                        <IconButton iconName={Icons.Close} onClick={onClose} size="large" />
                    </S.TitleContainer>
                    <Select
                        fullWidth
                        label="Тип реализации"
                        options={sourceOptions}
                        values={sourceOptions.filter(({ id }) => id === source)}
                        onChange={(values) =>
                            values[0] && changeSource(values[0].id as AlertSource)
                        }
                    />
                    <Select
                        fullWidth
                        label="Реализация"
                        options={implementationOptions}
                        values={implementationOptions.filter(({ id }) => id === implementation)}
                        onChange={(values) =>
                            setImplementation(values[0] ? String(values[0].id) : null)
                        }
                    />
                    {isUsecaseSource && (
                        <Banner
                            iconName={Icons.InfoCircled}
                            title={PUBLISH_TARGET_USECASE_UNAVAILABLE[target]}
                        />
                    )}
                    <TextArea
                        fullWidth
                        label="Комментарий"
                        value={comment}
                        disabled={isUsecaseSource}
                        onChange={(e) => setComment(e.target.value)}
                        error={!!errorMessage}
                        helperText={errorMessage || undefined}
                    />
                </S.Content>
                <S.Footer>
                    <S.ButtonContainer>
                        <Button fullWidth variant="outlined" size="medium" onClick={onClose}>
                            Отмена
                        </Button>
                    </S.ButtonContainer>
                    <S.ButtonContainer>
                        <S.ProgressButtonStyled
                            fullWidth
                            variant="contained"
                            size="medium"
                            onClick={handleSave}
                            showProgress={isPending}
                            state={isPending ? 'loading' : 'default'}
                            disabled={!implementation || isUsecaseSource || isPending}
                        >
                            {data && !isUsecaseSource ? 'Обновить' : 'Создать'}
                        </S.ProgressButtonStyled>
                    </S.ButtonContainer>
                </S.Footer>
            </S.Container>
        </SideBlock>
    );
};
