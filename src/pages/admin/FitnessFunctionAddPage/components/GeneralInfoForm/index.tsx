import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { MultiSelect, RadioGroup, RadioGroupBoolean, TextField } from 'components/form';
import { Button } from 'components/ui';

import { StepVariants } from '../../const';

import { FormValues, getValidationSchema } from './form';
import { IFitnessFunctionOption, IGeneralInfoForm } from './types';
import * as S from './units';

export const GeneralInfoForm: FC<IGeneralInfoForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
    paramId,
    fitnessFunctions,
    isLoadingFitnessFunctions,
}) => {
    const fitnessFunctionOptions: IFitnessFunctionOption[] = (fitnessFunctions ?? []).map(
        (fitnessFunction) => ({
            id: fitnessFunction.code,
            value: fitnessFunction.code,
            description: fitnessFunction.description,
        }),
    );

    const invalidCodes = (fitnessFunctions ?? []).map((fitnessFunction) => fitnessFunction.code);

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema(invalidCodes)),
        defaultValues: {
            code: savedData.code,
            name: savedData.name,
            isTrigger: savedData.isTrigger,
            type: savedData.type,
            applicability: savedData.applicability,
        },
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        reset({
            code: savedData.code,
            name: savedData.name,
            isTrigger: savedData.isTrigger,
            type: savedData.type,
            applicability: savedData.applicability,
        });
    }, [savedData]);

    const onSubmit = handleSubmit((values) => {
        setSavedData({
            ...savedData,
            code: values.code,
            name: values.name,
            isTrigger: values.isTrigger,
            type: values.type,
            applicability: values.applicability?.filter(
                (applicability) => applicability !== undefined,
            ) as string[],
        });
        setStepVariant(StepVariants.LOGIC);
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit}>
                <S.Container>
                    <S.TextFieldsContainer>
                        <S.GrowContainer>
                            <TextField fullWidth disabled={!!paramId} label="Код*" name="code" />
                        </S.GrowContainer>
                        <S.GrowContainer>
                            <TextField fullWidth label="Название*" name="name" />
                        </S.GrowContainer>
                    </S.TextFieldsContainer>
                    <S.RadioBlockContainer>
                        <S.CaptionTextContainer>
                            <Text variant="subtitle3">Триггер</Text>
                            <Text inactive variant="caption">
                                Тригер - контекстная оценка, выявляющая свойства приложения,
                                влияющие на применение к нему определенных правил
                            </Text>
                        </S.CaptionTextContainer>
                        <S.RadiosContainer>
                            <RadioGroupBoolean name="isTrigger" />
                        </S.RadiosContainer>
                    </S.RadioBlockContainer>
                    <S.RadioBlockContainer>
                        <S.CaptionTextContainer>
                            <Text variant="subtitle3">Тип</Text>
                            <Text inactive variant="caption">
                                Как будет выполнятся фитнес-функция. Скрипт — вы пишете код на
                                Python, платформа его выполняет. Синхронный и асинхронный — вызываем
                                ваш сервис, результат возвращается сразу или позже
                            </Text>
                        </S.CaptionTextContainer>
                        <S.RadiosContainer>
                            <RadioGroup
                                name="type"
                                disabled={!!paramId}
                                options={[
                                    { label: 'Script', id: 0 },
                                    { label: 'Синхронный метод', id: 1 },
                                    { label: 'Асинхронный метод', id: 2 },
                                ]}
                            />
                        </S.RadiosContainer>
                    </S.RadioBlockContainer>
                    <S.ApplicabilityContainer>
                        <S.CaptionTextContainer>
                            <Text variant="subtitle3">Применимость</Text>
                            <Text inactive variant="caption">
                                Фитнес-функция запустится только для продуктов, где пройдены
                                выбранные фитнес-функции. Оставьте пустым — будет применяться ко
                                всем продуктам
                            </Text>
                        </S.CaptionTextContainer>
                        <S.TextFieldsContainer>
                            <S.GrowContainer>
                                <MultiSelect
                                    fullWidth
                                    disabled={isLoadingFitnessFunctions}
                                    name="applicability"
                                    label="Фитнес-функции"
                                    options={fitnessFunctionOptions}
                                    makeOption={(option) => (
                                        <S.OptionContent>
                                            <S.OptionText variant="body2">
                                                {option.value}
                                            </S.OptionText>
                                            <S.OptionText inactive variant="caption">
                                                {option.description}
                                            </S.OptionText>
                                        </S.OptionContent>
                                    )}
                                />
                            </S.GrowContainer>
                            <S.GrowContainer />
                        </S.TextFieldsContainer>
                    </S.ApplicabilityContainer>
                    <S.ButtonsContainer>
                        <Button variant="contained" size="medium" type="submit">
                            Далее
                        </Button>
                    </S.ButtonsContainer>
                </S.Container>
            </form>
        </FormProvider>
    );
};
