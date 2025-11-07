import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from 'components/core';
import { MultiSelect, RadioGroup, TextArea, TextField } from 'components/form';

import { useGetPatternGroupsQuery } from 'api/queries/patterns';
import { useGetAllTechnologiesQuery } from 'api/queries/technologies';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { FormValues, getValidationSchema } from './form';
import { IGeneralInfoForm } from './types';
import * as S from './units';

export const GeneralInfoForm: FC<IGeneralInfoForm> = ({
    setStepVariant,
    savedData,
    setSavedData,
}) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset, watch } = form;

    const onSubmit = handleSubmit((values) => {
        setSavedData({ ...savedData, ...values });
        setStepVariant(StepVariants.DOCUMENTATION);
    });

    const description = watch('description');

    const { data: technologies, isLoading } = useGetAllTechnologiesQuery();
    const { data: groups } = useGetPatternGroupsQuery();

    const technologiesOptions = (technologies ?? []).map((tech) => ({
        id: tech.id,
        value: tech.label,
    }));

    const groupsOptions = (groups ?? []).map((group) => ({
        id: group.id,
        value: group.name,
    }));

    useEffect(() => {
        reset({
            name: savedData.name,
            type: savedData.type,
            group: savedData.group,
            tech: savedData.tech,
            description: savedData.description,
        });
    }, [savedData]);

    return (
        <FormProvider {...form}>
            <S.FormStyled onSubmit={onSubmit}>
                <S.Container>
                    <div>
                        <Text variant="subtitle1">Тип паттерна</Text>
                        <S.RadioContainer>
                            <RadioGroup
                                name="type"
                                options={[
                                    { label: 'Паттерн', id: 0 },
                                    { label: 'Антипаттерн', id: 1 },
                                ]}
                            />
                        </S.RadioContainer>
                    </div>
                    <TextField name="name" label="Название паттерна*" />
                    <TextArea
                        fullWidth
                        label="Краткое описание*"
                        name="description"
                        helperText={`${description?.length ?? 0}/255`}
                        maxLength={255}
                        disabled={isLoading}
                    />
                    <S.SelectGroup>
                        <S.SelectContainer>
                            <MultiSelect
                                fullWidth
                                name="group"
                                label="Категория*"
                                options={groupsOptions}
                            />
                        </S.SelectContainer>
                        <S.SelectContainer>
                            <MultiSelect
                                fullWidth
                                name="tech"
                                label="Технология*"
                                options={technologiesOptions}
                            />
                        </S.SelectContainer>
                    </S.SelectGroup>
                </S.Container>
                <FormFooter cancelButtonDisabled submitButtonText="Далее" />
            </S.FormStyled>
        </FormProvider>
    );
};
