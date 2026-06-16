import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from 'features/auth';

import { Text } from 'components/core';
import { TextArea, TextField } from 'components/form';
import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Button, Icon } from 'components/ui';

import { ApplicationStatus } from 'api/applications/types';
import {
    useGetApplicationByBusinessKeyQuery,
    usePatchApplicationEntityMutation,
    // usePatchBCApplicationStatusMutation,
} from 'api/queries/applications';
import { useGetCapabilityDescriptionQuery } from 'api/queries/capability';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { useSnackbarStore } from 'widgets/Snackbar';

import { CapabilityAutocomplete } from './components';
import { FormValues, validationSchema } from './form';
import { IApplicationEditPage } from './types';
import * as S from './units';

export const ApplicationEditPage: FC<IApplicationEditPage> = ({ review }) => {
    const [params] = useSearchParams();
    const paramKey = params.get('key');

    const navigate = useNavigate();

    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const userInfo = useAuthStore((store) => store.userInfo);
    const userName = `${userInfo?.family_name} ${userInfo?.given_name}`;

    const { data: applicationData, isLoading: isLoadingApplicationData } =
        useGetApplicationByBusinessKeyQuery(paramKey);

    // const { mutateAsync: patchApplicationStatus, isPending: isUpdatingApplication } =
    //     usePatchBCApplicationStatusMutation();

    const { mutateAsync: updateApplication, isPending: isUpdatingApplication } =
        usePatchApplicationEntityMutation();

    const navigateBack = () => {
        navigate(
            review
                ? `${R.PROFILE_PATH}${R.REVIEW_PATH}${R.VIEW_PATH}?key=${paramKey}`
                : `${R.PROFILE_PATH}${R.APPLICATIONS_PATH}${R.VIEW_PATH}?key=${paramKey}`,
        );
    };

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, setValue, watch, setError, clearErrors } = form;

    const onSubmit = () =>
        handleSubmit(async (values) => {
            try {
                if (review) {
                    if (applicationData) {
                        await updateApplication({
                            id: applicationData.entity_id,
                            data: {
                                name: values.name,
                                description: values.description,
                                parentId: Number(values.domain),
                                owner: values.owner,
                                comment: values.comment ? values.comment : undefined,
                            },
                            nextStatus: ApplicationStatus.DN,
                        });
                    }
                    showSnackbar({
                        message: 'Возможность создана, заявка закрыта',
                    });
                } else {
                    if (applicationData) {
                        await updateApplication({
                            id: applicationData.entity_id,
                            data: {
                                name: values.name,
                                description: values.description,
                                parentId: Number(values.domain),
                                owner: values.owner,
                                comment: values.comment ? values.comment : undefined,
                            },
                            nextStatus: applicationData.executor
                                ? ApplicationStatus.RW
                                : ApplicationStatus.WTXCTR,
                        });
                    }
                    showSnackbar({
                        message: 'Заявка отредактирована',
                    });
                }
                navigateBack();
            } catch (error) {}
        });

    const handleAssignButtonClick = () => {
        setValue('owner', userName);
    };

    useEffect(() => {
        if (applicationData) {
            setValue('name', applicationData.entity.name);
            setValue('description', applicationData.entity.description);
            setValue('owner', applicationData.entity.owner);
            setValue('domain', String(applicationData.entity.parent.id));
        }
    }, [applicationData]);

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
                            <Text variant="h4">Редактирование заявки</Text>
                            <S.FlexContainer>
                                <S.RelativeContainer>
                                    <S.TextFieldStyled
                                        name="name"
                                        label="Название*"
                                        disabled={isLoadingApplicationData}
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
                                        disabled={
                                            isLoadingApplicationData || isGeneratingDescription
                                        }
                                        helperPosition="block"
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
                                isLoadingCapability={isLoadingApplicationData}
                                parent={applicationData?.entity.parent}
                            />
                            <S.FlexContainer>
                                <TextField
                                    name="owner"
                                    label="Владелец возможности"
                                    disabled={false}
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
                                disabled={false}
                            />
                            {/* @TODO: Scroll issue */}
                            <S.EmptyDiv />
                        </S.ContentContainer>
                    </S.Content>
                    <S.Footer>
                        <S.ButtonContainer>
                            {review ? (
                                <Button
                                    size="medium"
                                    variant="contained"
                                    disabled={isUpdatingApplication}
                                    type="submit"
                                >
                                    Согласовать
                                </Button>
                            ) : (
                                <Button
                                    size="medium"
                                    variant="contained"
                                    disabled={isUpdatingApplication || isGeneratingDescription}
                                    type="submit"
                                >
                                    {applicationData?.status.alias === ApplicationStatus.WTXCTR
                                        ? 'Сохранить изменения'
                                        : 'Отправить заявку'}
                                </Button>
                            )}
                        </S.ButtonContainer>
                    </S.Footer>
                </S.PageWrapper>
            </form>
        </FormProvider>
    );
};
