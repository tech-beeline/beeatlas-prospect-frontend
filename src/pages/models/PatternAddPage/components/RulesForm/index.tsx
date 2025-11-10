import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextArea } from 'components/form';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { FormValues, getValidationSchema } from './form';
import { IRulesForm } from './types';
import * as S from './units';

export const RulesForm: FC<IRulesForm> = ({ setStepVariant, savedData, setSavedData }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset } = form;

    const onSubmit = handleSubmit((values) => {
        setSavedData({ ...savedData, rule: values.rule });
        setStepVariant(StepVariants.DESCRIPTION);
    });

    useEffect(() => {
        reset({
            rule: savedData.rule,
        });
    }, [savedData]);

    return (
        <FormProvider {...form}>
            <S.FormStyled onSubmit={onSubmit}>
                <S.Container>
                    <TextArea fullWidth name="rule" label="Правило идентификации*" />
                </S.Container>
                <FormFooter
                    onCancelButtonClick={() => setStepVariant(StepVariants.DOCUMENTATION)}
                    submitButtonText="Далее"
                />
            </S.FormStyled>
        </FormProvider>
    );
};
