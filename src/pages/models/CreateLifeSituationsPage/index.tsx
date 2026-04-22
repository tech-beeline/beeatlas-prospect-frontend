import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Banner, Button, Icon, IconButton, ProgressButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { Text } from 'components/core';
import { AutocompleteArray, TextArea, TextField } from 'components/form';

import { useGetPatternsByChapterIdQuery, useGetPatternsQuery } from 'api/queries/patterns';
import {
    useCreateLifeSituationMutation,
    useGetAllChaptersQuery,
    useGetNfr,
    usePatchLifeSituationMutation,
} from 'api/queries/product';
import * as R from 'router/const';
import { normalizeIds } from 'utils/formatters';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, validationSchema } from './form';
import * as S from './units';

export const CreateLifeSituationsPage = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitState, setSubmitState] = useState<'default' | 'loading' | 'error'>('default');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paramId = searchParams.get('id');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: createLifeSituation } = useCreateLifeSituationMutation();
    const { mutateAsync: patchLifeSituation } = usePatchLifeSituationMutation();

    const { data: chapters } = useGetAllChaptersQuery();
    const { data: selectedPatterns, isLoading: isPatternsLoading } =
        useGetPatternsByChapterIdQuery(paramId);
    const { data: nfr, isLoading: isNfrLoading } = useGetNfr();
    const { data: patterns, isLoading: isPatternsListLoading } = useGetPatternsQuery();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            description: '',
            docLink: '',
            nfr: [],
            patterns: [],
        },
    });
    const { handleSubmit, reset } = form;
    const nfrOptions = (nfr ?? []).map((item) => ({
        id: Number(item.id),
        value: item.name,
    }));
    const patternOptions = (patterns ?? []).map((item) => ({
        id: item.id,
        value: item.name,
    }));

    const navigateBack = () => {
        navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`);
    };

    const onSubmit = handleSubmit(async (values) => {
        try {
            setSubmitError(null);
            setSubmitState('loading');
            const payload = {
                name: values.name,
                description: values.description,
                docLink: values.docLink,
                nfr: normalizeIds(values.nfr),
                patterns: normalizeIds(values.patterns),
            };

            if (paramId) {
                await patchLifeSituation({
                    id: Number(paramId),
                    data: payload,
                });

                setSubmitState('default');
                navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${paramId}`);
                showSnackbar({ message: 'Изменения сохранены' });
            } else {
                const chapter = await createLifeSituation(payload);

                setSubmitState('default');
                navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?chapterId=${chapter.id}`);
                showSnackbar({ message: 'Жизненная ситуация создана' });
            }
        } catch (error) {
            setSubmitState('error');
            const axiosError = error as AxiosError<{
                errorMessage?: string;
            }>;
            const status = axiosError.response?.status;
            const errorMessage = axiosError.response?.data?.errorMessage;

            if (status === 500) {
                setSubmitError(
                    'Нет соединения с сервером. Проверьте интернет-подключение и попробуйте снова',
                );
                return;
            }

            if (status && status >= 400) {
                setSubmitError(errorMessage || 'Произошла ошибка при сохранении');
                return;
            }

            setSubmitError('Произошла ошибка при сохранении');
        }
    });

    useEffect(() => {
        if (!paramId || !chapters || isPatternsLoading || !selectedPatterns) {
            return;
        }

        const chapter = chapters.find((item) => item.id === Number(paramId));
        if (!chapter) {
            return;
        }

        reset({
            name: chapter.name ?? '',
            description: chapter.description ?? '',
            docLink: chapter.docLink ?? '',
            nfr: chapter.nfr.map((item) => Number(item.id)),
            patterns: (selectedPatterns ?? []).map((item) => item.id),
        });
    }, [chapters, paramId, selectedPatterns, reset]);

    return (
        <FormProvider {...form}>
            <S.PageWrapper>
                <S.Header>
                    <IconButton size="large" iconName={Icons.ArrowLeft} onClick={navigateBack} />
                    <Text variant="body2">Назад</Text>
                </S.Header>
                <S.Form onSubmit={onSubmit}>
                    <S.Content>
                        {submitError && (
                            <Banner
                                color="error"
                                iconName={Icons.InfoCircled}
                                title={submitError}
                            />
                        )}
                        <Text variant="h4">
                            {paramId
                                ? 'Редактирование жизненной ситуации'
                                : 'Создание жизненной ситуации'}
                        </Text>
                        <S.FormContainer>
                            <TextField name="name" label="Название*" fullWidth />
                            <S.FullWidthContainer>
                                <TextArea name="description" label="Описание*" fullWidth />
                            </S.FullWidthContainer>
                            <TextField
                                name="docLink"
                                label="Ссылка на дополнительную информацию"
                                fullWidth
                            />
                            <AutocompleteArray
                                title="Требования"
                                name="nfr"
                                options={nfrOptions}
                                label="НФТ"
                                isLoading={isNfrLoading}
                            />
                            <AutocompleteArray
                                title="Паттерн"
                                name="patterns"
                                options={patternOptions}
                                label="Паттерн"
                                isLoading={isPatternsListLoading || isPatternsLoading}
                            />
                        </S.FormContainer>
                    </S.Content>
                    <S.Footer>
                        <S.FooterContent>
                            <Button
                                variant="outlined"
                                size="medium"
                                type="button"
                                onClick={navigateBack}
                            >
                                Отмена
                            </Button>
                            <ProgressButton
                                variant="contained"
                                size="medium"
                                type="submit"
                                state={submitState}
                                startIcon={
                                    submitState === 'error' ? (
                                        <Icon iconName={Icons.Refresh} size="small" />
                                    ) : undefined
                                }
                            >
                                {paramId ? 'Сохранить изменения' : 'Создать'}
                            </ProgressButton>
                        </S.FooterContent>
                    </S.Footer>
                </S.Form>
            </S.PageWrapper>
        </FormProvider>
    );
};
