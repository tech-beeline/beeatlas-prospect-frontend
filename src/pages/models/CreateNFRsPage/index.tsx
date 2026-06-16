import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { Text } from 'components/core';
import { AutocompleteArray, TextArea, TextField } from 'components/form';
import { IconButton } from 'components/ui';
import { Banner, Button } from 'components/ui';

import { useGetPatternsQuery } from 'api/queries/patterns';
import {
    useGetAllChaptersQuery,
    useGetFitnessFunctions,
    useGetNFRByIdQuery,
    usePostNFRMutation,
    usePostNFRVersionMutation,
} from 'api/queries/product';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';
import { isNotNull } from 'utils/helpers';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, validationSchema } from './form';
import * as S from './units';

export const CreateNFRsPage = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitState, setSubmitState] = useState<'default' | 'loading' | 'error'>('default');
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const paramId = searchParams.get('id');

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { data: nfr } = useGetNFRByIdQuery(Number(paramId));
    const { data: patterns, isLoading: isPatternsListLoading } = useGetPatternsQuery();
    const { data: chapters, isLoading: isChaptersListLoading } = useGetAllChaptersQuery();
    const { data: fitnessFunctions, isLoading: isFitnessFunctionsListLoading } =
        useGetFitnessFunctions();

    const { mutateAsync: createNFRMutation } = usePostNFRMutation();
    const { mutateAsync: postNFRVersionMutation } = usePostNFRVersionMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            description: '',
            rule: [],
            chapters: [],
            patterns: [],
        },
    });

    const { handleSubmit, reset, watch } = form;

    const patternOptions = (patterns ?? []).map((item) => ({
        id: item.id,
        value: item.name,
        descr: item.code,
    }));

    const chapterOptions = (chapters ?? []).map((item) => ({
        id: item.id,
        value: item.name,
        descr: item.code,
    }));
    const fitnessFunctionOptions = (fitnessFunctions ?? []).map((item) => ({
        id: item.id,
        value: item.code,
        descr: item.description,
    }));

    const navigateBack = () => {
        navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}`);
    };

    useEffect(() => {
        if (!paramId || !nfr) {
            return;
        }

        reset({
            name: nfr.name ?? '',
            description: nfr.description ?? '',
            chapters: (nfr.chapters ?? []).map((item) => ({ value: item.id })),
            patterns: (nfr.patterns ?? []).map((item) => ({ value: item.id })),
            rule: (nfr.fitnessFunctions ?? []).map((item) => ({ value: item.id })),
        });
    }, [nfr, paramId, reset]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            setSubmitError(null);
            setSubmitState('loading');
            const fitnessFunctionCodeMap = new Map(
                (fitnessFunctions ?? []).map((item) => [item.id, item.code]),
            );
            const rule = values.rule
                .map((r) => (r.value ? fitnessFunctionCodeMap.get(r.value) : null))
                .filter((code): code is string => Boolean(code))
                .join(',');

            const payload = {
                name: values.name,
                description: values.description,
                chapters: values.chapters.map((item) => item.value).filter(isNotNull),
                patterns: values.patterns.map((item) => item.value).filter(isNotNull),
                rule,
            };
            if (paramId) {
                if (!nfr?.code) {
                    return;
                }

                const NFRVersion = await postNFRVersionMutation({
                    code: nfr.code,
                    data: payload,
                });
                setSubmitState('default');
                navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?nfrId=${NFRVersion.versionId}`);
                showSnackbar({ message: 'Версия НФТ создана ' });
            } else {
                const NFR = await createNFRMutation(payload);
                setSubmitState('default');
                navigate(`${R.MODELS_PATH}${R.LIFE_SITUATIONS_PATH}?nfrId=${NFR.versionId}`);
                showSnackbar({ message: 'Нефункциональное требование создано' });
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

            setSubmitError('Произошла неизвестная ошибка. Попробуйте снова');
        }
    });

    const name = watch('name');
    const description = watch('description');
    const chaptersValue = watch('chapters');

    const isSubmitButtonDisabled =
        !name || !description || chaptersValue.filter((v) => v.value !== null).length === 0;

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
                        <div>
                            <Text variant="h4">Создание нефункционального требования</Text>
                            {paramId && (
                                <Text inactive variant="body1">
                                    Будет создана новая версия текущего нефункционального требования
                                </Text>
                            )}
                        </div>
                        <S.FormContainer>
                            <TextField name="name" label="Название*" fullWidth />
                            <S.FullWidthContainer>
                                <TextArea name="description" label="Описание*" fullWidth />
                            </S.FullWidthContainer>
                            <AutocompleteArray
                                title="Жизненная ситуация"
                                name="chapters"
                                options={chapterOptions}
                                label="Жизненная ситуация*"
                                isLoading={isChaptersListLoading}
                                makeOption={(option) => (
                                    <div>
                                        <Text variant="body2">{option.value}</Text>
                                        <Text variant="body3" inactive>
                                            {option.descr}
                                        </Text>
                                    </div>
                                )}
                            />
                            <AutocompleteArray
                                title="Паттерн"
                                name="patterns"
                                options={patternOptions}
                                label="Паттерн"
                                isLoading={isPatternsListLoading}
                                makeOption={(option) => (
                                    <div>
                                        <Text variant="body2">{option.value}</Text>
                                        <Text variant="body3" inactive>
                                            {option.descr}
                                        </Text>
                                    </div>
                                )}
                            />
                            <AutocompleteArray
                                title="Фитнес-функция"
                                name="rule"
                                options={fitnessFunctionOptions}
                                label="Фитнес-функция"
                                isLoading={isFitnessFunctionsListLoading}
                                makeOption={(option) => (
                                    <div>
                                        <Text variant="body2">{option.value}</Text>
                                        <Text variant="body3" inactive>
                                            {option.descr}
                                        </Text>
                                    </div>
                                )}
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
                            <S.ProgressButtonStyled
                                variant="contained"
                                size="medium"
                                type="submit"
                                state={submitState}
                                error={submitState === 'error'}
                                disabled={isSubmitButtonDisabled}
                            >
                                {paramId ? 'Сохранить изменения' : 'Создать'}
                            </S.ProgressButtonStyled>
                        </S.FooterContent>
                    </S.Footer>
                </S.Form>
            </S.PageWrapper>
        </FormProvider>
    );
};
