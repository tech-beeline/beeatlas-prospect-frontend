import React, { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextArea } from 'components/form';

import { useValidateRulesMutation } from 'api/queries/patterns';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { FormValues, getValidationSchema } from './form';
import { IRulesForm } from './types';
import * as S from './units';

export const RulesForm: FC<IRulesForm> = ({ setStepVariant, savedData, setSavedData }) => {
    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset, watch } = form;
    const { mutateAsync: validateRules } = useValidateRulesMutation();

    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const lastValidatedRuleRef = useRef<string>('');
    const ruleValue = watch('rule');
    const isContentChanged = lastValidatedRuleRef.current !== (ruleValue || '');

    useEffect(() => {
        if (isContentChanged && isValid) {
            setIsValid(false);
        }
    }, [isContentChanged, isValid]);

    const validate = async (cypher: string): Promise<boolean> => {
        if (!cypher.trim()) {
            setErrorMessage('Поле не может быть пустым');
            setIsValid(false);
            return false;
        }

        setIsChecking(true);
        setErrorMessage(null);
        try {
            const response = await validateRules(cypher);
            if (response.valid === true || response.valid === 'true') {
                lastValidatedRuleRef.current = cypher;
                setIsValid(true);
                return true;
            }
        } catch (err) {
            setErrorMessage('Поле содержит некорректные данные. Пожалуйста, заполните правильно');
            setIsValid(false);
            return false;
        } finally {
            setIsChecking(false);
        }
        return false;
    };

    const handleSubmitData = handleSubmit((values) => {
        setSavedData({ ...savedData, rule: values.rule || '' });
        setStepVariant(StepVariants.DESCRIPTION);
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid || isContentChanged) {
            await validate(ruleValue || '');
            return;
        }

        handleSubmitData();
    };

    const getSubmitButtonText = () => {
        if (isValid && !isContentChanged) {
            return 'Далее';
        }
        return 'Проверить';
    };

    const isSubmitButtonDisabled = () => !ruleValue || isChecking;

    useEffect(() => {
        reset({
            rule: savedData.rule,
        });
    }, [savedData]);

    return (
        <FormProvider {...form}>
            <S.FormStyled onSubmit={onSubmit}>
                <S.Container>
                    <TextArea
                        fullWidth
                        name="rule"
                        label="Правило идентификации*"
                        error={!isValid && !!errorMessage}
                        externalErrorMessage={errorMessage || ''}
                    />
                </S.Container>
                <FormFooter
                    onCancelButtonClick={() => setStepVariant(StepVariants.DOCUMENTATION)}
                    submitButtonDisabled={isSubmitButtonDisabled()}
                    submitButtonText={getSubmitButtonText()}
                />
            </S.FormStyled>
        </FormProvider>
    );
};
