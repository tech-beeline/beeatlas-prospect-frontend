import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ringIdToLabelStatusMap } from 'features/technologies';

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

    const { data: technologies, isLoading: isLoadingTech } = useGetAllTechnologiesQuery();
    const { data: groups, isLoading: isLoadingGroups } = useGetPatternGroupsQuery();

    const technologiesOptions = (technologies ?? []).map((tech) => ({
        id: tech.id,
        value: tech.label,
        description: tech.ring?.name,
        ringId: tech.ring?.id,
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
                    />
                    <S.SelectGroup>
                        <S.SelectContainer>
                            <MultiSelect
                                fullWidth
                                name="group"
                                label="Категории*"
                                options={groupsOptions}
                                disabled={isLoadingGroups}
                            />
                        </S.SelectContainer>
                        <S.SelectContainer>
                            <MultiSelect
                                fullWidth
                                filter
                                name="tech"
                                label="Технологии"
                                options={technologiesOptions}
                                disabled={isLoadingTech}
                                makeOption={(option): JSX.Element => (
                                    <div>
                                        <p>{option.value}</p>
                                        {option.description && (
                                            <S.LabelWithoutBorder
                                                title={option.description}
                                                variant="outline"
                                                type={ringIdToLabelStatusMap[option.ringId ?? 1]}
                                            />
                                        )}
                                    </div>
                                )}
                            />
                        </S.SelectContainer>
                    </S.SelectGroup>
                </S.Container>
                <FormFooter showCancelButton={false} submitButtonText="Далее" />
            </S.FormStyled>
        </FormProvider>
    );
};
