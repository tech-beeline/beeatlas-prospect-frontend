import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from 'features/auth';

import { Text } from 'components/core';
import { TextArea, TextField } from 'components/form';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Banner, Button, Icon } from 'components/ui';

import { useCreateBCApplicationMutation } from 'api/queries/applications';
import {
    useGetCapabilityByIdQuery,
    useGetCapabilityDescriptionQuery,
} from 'api/queries/capability';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CapabilityAutocomplete } from './components';
import { FormValues, validationSchema } from './form';
import * as S from './units';

export const BCAddPage = () => {
    const [showBanner, setShowBanner] = useState(true);

    const [params] = useSearchParams();
    const paramId = params.get('id');
    const paramFrom = params.get('from');
    const [paramFromId, paramFromType] = paramFrom?.split(',') ?? [];

    const navigate = useNavigate();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const userInfo = useAuthStore((store) => store.userInfo);
    const userName = `${userInfo?.family_name} ${userInfo?.given_name}`;

    const { data: capabilityData, isLoading: isLoadingCapabilityData } =
        useGetCapabilityByIdQuery(paramId);

    const { mutateAsync, isPending: isCreatingApplication } = useCreateBCApplicationMutation();

    const navigateBack = () => {
        navigate(
            paramFrom
                ? `${R.MODELS_PATH}${R.FDM_PATH}?id=${paramFromId}&type=${paramFromType}`
                : paramId
                ? `${R.MODELS_PATH}${R.FDM_PATH}?id=${paramId}&type=BUSINESS`
                : `${R.MODELS_PATH}${R.FDM_PATH}`,
        );
    };

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, setValue, watch, setError, clearErrors } = form;

    const onSubmit = () =>
        handleSubmit(async (values) => {
            try {
                await mutateAsync({
                    name: values.name,
                    description: values.description,
                    parentId: values.domain ? Number(values.domain) : undefined,
                    owner: values.owner,
                    author: userName,
                    mutableBcId: paramId ? Number(paramId) : undefined,
                    comment: values.comment,
                });
                showSnackbar({
                    message:
                        'Заявка отправлена. Внести изменения в заявку и отследить ее статус можно в разделе Мои заявки',
                });
                navigateBack();
            } catch (error) {}
        });

    const handleAssignButtonClick = () => {
        setValue('owner', userName);
    };

    useEffect(() => {
        if (capabilityData) {
            setValue('name', capabilityData.name);
            setValue('description', capabilityData.description);
            setValue('owner', capabilityData.owner ?? '');
            if (capabilityData.parent) setValue('domain', String(capabilityData.parent.id));
        }
    }, [capabilityData]);

    const nameValue = watch('name');
    const descriptionValue = watch('description');

    const isGenerateButtonDisabled = nameValue?.length === 0;

    const {
        data: descriptionData,
        error: generationError,
        refetch,
        isFetching: isGeneratingDescription,
    } = useGetCapabilityDescriptionQuery(nameValue);

    useEffect(() => {
        if (descriptionData) {
            setValue('description', descriptionData);
        }
    }, [descriptionData]);

    useEffect(() => {
        if (generationError) {
            setError('description', { message: 'Ошибка генерации определения' });
        }
    }, [generationError]);

    useEffect(() => {
        clearErrors('description');
    }, [descriptionValue]);

    const handleGenerateButtonClick = async () => {
        setValue('description', '');
        refetch();
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit()}>
                <S.PageWrapper>
                    <S.Header>
                        <IconButton
                            onClick={navigateBack}
                            iconName={Icons.ArrowLeft}
                            size="large"
                        />
                        <Text variant="body2">Назад</Text>
                    </S.Header>

                    <S.Content>
                        <S.ContentContainer>
                            <Text variant="h4">
                                {paramId ? 'Редактирование' : 'Создание'} бизнес-возможности
                            </Text>
                            {showBanner && (
                                <Banner
                                    color="info"
                                    iconName={Icons.InfoCircled}
                                    title={
                                        paramId
                                            ? 'Внесенные изменения проходят этап согласования корпоративным архитектором, по результату рассмотрения заявки вам придет уведомление'
                                            : 'Создание бизнес-возможности проходит этап согласования корпоративным архитектором, по результату рассмотрения заявки вам придет уведомление'
                                    }
                                    onClose={() => setShowBanner(false)}
                                />
                            )}
                            <S.FlexContainer>
                                <S.RelativeContainer>
                                    <S.TextFieldStyled
                                        name="name"
                                        label="Название*"
                                        disabled={isLoadingCapabilityData}
                                        helperPosition="block"
                                        maxLength={200}
                                    />
                                    <S.IconContainer data-tooltip-id="name-icon">
                                        <Icon iconName={Icons.InfoCircled} size="medium" />
                                    </S.IconContainer>
                                    <TooltipContainer
                                        displayFlex
                                        largePadding
                                        hideGap
                                        offset={0}
                                        id="name-icon"
                                        place="bottom"
                                        noArrow
                                    >
                                        <Text variant="subtitle3">Формула:</Text>
                                        <Text variant="caption">
                                            {
                                                '<Действие-отглагольное существительное> <Объект действия - существительное> + <Характеристика объекта/уточнение>'
                                            }
                                        </Text>
                                        <Text variant="subtitle3">Пример:</Text>
                                        <Text variant="caption">
                                            Возможность оценивать, анализировать, логировать
                                            (действие) доступность, время отклика, корректность
                                            взаимодействия (объект, характеристики)
                                        </Text>
                                    </TooltipContainer>
                                </S.RelativeContainer>
                                {window.FEATURE_FLAGS.FLAG_IS_DEMO_STAND === false && (
                                    <S.ProgressButtonStyled
                                        type="button"
                                        size="medium"
                                        variant="outlined"
                                        disabled={isGenerateButtonDisabled}
                                        data-tooltip-id="generate-button"
                                        state={isGeneratingDescription ? 'loading' : 'default'}
                                        showProgress={isGeneratingDescription}
                                        onClick={handleGenerateButtonClick}
                                    >
                                        Сгенерировать определение
                                    </S.ProgressButtonStyled>
                                )}
                                {isGenerateButtonDisabled && (
                                    <TooltipContainer
                                        largePadding
                                        offset={8}
                                        id="generate-button"
                                        place="bottom"
                                        noArrow
                                    >
                                        Кнопка позволяет сгенерировать определение. Чтобы
                                        сгенерировать определение, сначала нужно указать название
                                        возможности
                                    </TooltipContainer>
                                )}
                            </S.FlexContainer>
                            <S.FlexContainer>
                                <S.RelativeContainer>
                                    <S.TextAreaStyled
                                        name="description"
                                        label={
                                            isGeneratingDescription
                                                ? 'Генерируем определение, подождите немного ...'
                                                : 'Определение*'
                                        }
                                        helperPosition="block"
                                        disabled={
                                            isLoadingCapabilityData || isGeneratingDescription
                                        }
                                    />
                                    <S.IconContainer data-tooltip-id="description-icon">
                                        <Icon iconName={Icons.InfoCircled} size="medium" />
                                    </S.IconContainer>
                                    <TooltipContainer
                                        displayFlex
                                        largePadding
                                        hideGap
                                        offset={0}
                                        id="description-icon"
                                        place="bottom"
                                        noArrow
                                    >
                                        <Text variant="subtitle3">Формула:</Text>
                                        <Text variant="caption">
                                            {`<Действие-отглагольное существительное> <Объект действия - существительное> + <Характеристика объекта/уточнение> <Ценность> или <Мотивация/конечная цель>`}
                                        </Text>
                                        <Text variant="subtitle3">Пример:</Text>
                                        <Text variant="caption">
                                            Возможность оценивать, анализировать, логировать
                                            (действие) доступность, время отклика, корректность
                                            взаимодействия (объект, характеристики) перед
                                            конфигурированием новых сервисов на VAS-платформе
                                            (пояснение) для проверки правильности настройки
                                            оборудования (мотивация/ценность)
                                        </Text>
                                    </TooltipContainer>
                                </S.RelativeContainer>
                            </S.FlexContainer>
                            <CapabilityAutocomplete
                                isLoadingCapability={isLoadingCapabilityData}
                                parent={capabilityData?.parent}
                            />
                            <S.FlexContainer>
                                <TextField
                                    name="owner"
                                    label="Владелец возможности"
                                    disabled={isLoadingCapabilityData}
                                    helperPosition="block"
                                    maxLength={200}
                                />
                                <Button
                                    type="button"
                                    size="medium"
                                    onClick={handleAssignButtonClick}
                                >
                                    Назначить себя
                                </Button>
                            </S.FlexContainer>
                            <Text variant="subtitle1">Комментарий к заявке</Text>
                            <TextArea
                                name="comment"
                                label="Комментарий к заявке"
                                disabled={isLoadingCapabilityData}
                            />
                            {/* @TODO: Scroll issue */}
                            <S.EmptyDiv />
                        </S.ContentContainer>
                    </S.Content>
                    <S.Footer>
                        <S.ButtonContainer>
                            {/* <Button size="medium" type="button" onClick={onSubmit(true)}>
                                Сохранить как черновик
                            </Button> */}
                            <Button
                                size="medium"
                                variant="contained"
                                disabled={isCreatingApplication || isGeneratingDescription}
                                type="submit"
                            >
                                Отправить заявку
                            </Button>
                        </S.ButtonContainer>
                    </S.Footer>
                </S.PageWrapper>
            </form>
        </FormProvider>
    );
};
