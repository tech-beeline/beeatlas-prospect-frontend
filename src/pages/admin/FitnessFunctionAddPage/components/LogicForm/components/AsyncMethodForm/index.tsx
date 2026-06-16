import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { TextField } from 'components/form';
import { Button } from 'components/ui';

import { usePutFitnessFunctionMutation } from 'api/queries/fitness-functions';
import { StepVariants } from 'pages/admin/FitnessFunctionAddPage/const';
import { useSnackbarStore } from 'widgets/Snackbar';

import { FormValues, getValidationSchema } from './form';
import { IAsyncMethodForm } from './types';
import * as S from './units';

export const AsyncMethodForm: FC<IAsyncMethodForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
}) => {
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const { mutateAsync: putFitnessFunction, isPending: isUpdatingFitnessFunction } =
        usePutFitnessFunctionMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
        defaultValues: {
            link: savedData.asyncMethodLink,
        },
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        reset({
            link: savedData.asyncMethodLink,
        });
    }, [savedData]);

    const onSubmit = handleSubmit(async (values) => {
        await putFitnessFunction({
            code: savedData.code ?? '',
            data: {
                description: savedData.name ?? '',
                applicability: savedData.applicability?.length
                    ? savedData.applicability?.join(', ')
                    : undefined,
                auxiliary_check: String(savedData.isTrigger ?? false),
                method: values.link,
                method_synchronous: String(false),
                script: null,
            },
        });
        showSnackbar({ message: 'Фитнес-функция сохранена в статусе Test' });
        setSavedData({
            ...savedData,
            asyncMethodLink: values.link,
        });
        setStepVariant(StepVariants.TEST);
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
                <S.Container>
                    <S.FormContainer>
                        <Text variant="subtitle3">Тип аcинхронный метод</Text>
                        <TextField
                            fullWidth
                            name="link"
                            label="Endpoint"
                            helperText="Полный путь к эндпоинту, начиная с http:// или https://. Допустимые символы: буквы, цифры, -, _, ., /, :, ?, &, =, #. Пробелы запрещены"
                            helperPosition="block"
                        />
                    </S.FormContainer>
                    <S.ButtonsContainer>
                        <Button
                            variant="outlined"
                            size="medium"
                            type="button"
                            onClick={() => setStepVariant(StepVariants.GENERAL_INFO)}
                        >
                            Назад
                        </Button>
                        <S.ProgressButtonStyled
                            variant="contained"
                            size="medium"
                            type="button"
                            onClick={onSubmit}
                            state={isUpdatingFitnessFunction ? 'loading' : 'default'}
                            showProgress={isUpdatingFitnessFunction}
                        >
                            Далее
                        </S.ProgressButtonStyled>
                    </S.ButtonsContainer>
                </S.Container>
            </form>
        </FormProvider>
    );
};
