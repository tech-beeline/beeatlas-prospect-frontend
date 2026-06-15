import React, { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { TextArea } from 'components/form';
import { Link } from 'components/other';
import { Banner, InlineAlert } from 'components/ui';

import { IValidateRulesResponse } from 'api/patterns/types';
import { useValidateRulesMutation } from 'api/queries/patterns';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { StepVariants } from '../../const';
import { FormFooter } from '../FormFooter';

import { FormValues, getValidationSchema } from './form';
import { IRulesForm } from './types';
import * as S from './units';

export const RulesForm: FC<IRulesForm> = ({ setStepVariant, savedData, setSavedData }) => {
    const [showBanner, setShowBanner] = useState(true);

    const form = useForm<FormValues>({
        resolver: yupResolver(getValidationSchema()),
    });

    const { handleSubmit, reset, watch } = form;
    const { mutateAsync: validateRules, isPending: isValidating } = useValidateRulesMutation();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const ruleValue = watch('rule');

    useEffect(() => {
        setErrorMessage(null);
    }, [ruleValue]);

    const validate = async (cypher: string): Promise<boolean> => {
        try {
            const response = await validateRules(cypher);

            if (response.readOnly === 'false') {
                setErrorMessage('Запрос должен быть только на чтение данных');
                return false;
            }
            if (response.valid === 'true') {
                return true;
            }
        } catch (err) {
            const errorData = (err as AxiosError<IValidateRulesResponse>)?.response?.data;
            if (errorData) {
                if (errorData.valid === 'false' && errorData.error) {
                    setErrorMessage(errorData.error);
                } else if (errorData.readOnly === 'false') {
                    setErrorMessage('Запрос должен быть только на чтение данных');
                } else {
                    setErrorMessage('Неизвестная ошибка');
                }
            }
            return false;
        }
        return false;
    };

    const lastValidatedRuleRef = useRef<string | null>(null);

    const onSubmit = handleSubmit(async (values) => {
        if (values.rule === '') {
            setSavedData({ ...savedData, rule: values.rule });
            setStepVariant(StepVariants.DESCRIPTION);
        } else {
            const ok = await validate(values.rule);
            lastValidatedRuleRef.current = values.rule;
            if (ok) {
                setSavedData({ ...savedData, rule: values.rule });
                setStepVariant(StepVariants.DESCRIPTION);
            }
        }
    });

    useEffect(() => {
        reset({
            rule: savedData.rule,
        });
    }, [savedData]);

    const isSubmitButtonDisabled = isValidating || ruleValue === lastValidatedRuleRef.current;

    return (
        <FormProvider {...form}>
            <S.FormStyled onSubmit={onSubmit}>
                <S.Container>
                    {showBanner && (
                        <S.BannerContainer>
                            <Banner
                                iconName={Icons.InfoCircled}
                                color="info"
                                title={
                                    <div>
                                        При создании паттерна данный шаг допускается пропустить — к
                                        нему можно вернуться позднее. Перед разработкой правил
                                        идентификации архитектуры обязательно ознакомьтесь с{' '}
                                        <Link
                                            title="информацией"
                                            url={`${R.MODELS_PATH}${R.PATTERNS_PATH}${R.RULES_PATH}`}
                                        />
                                    </div>
                                }
                                onClose={() => setShowBanner(false)}
                            />
                        </S.BannerContainer>
                    )}
                    <TextArea
                        fullWidth
                        name="rule"
                        label="Правило идентификации"
                        error={!!errorMessage}
                    />
                    {errorMessage && (
                        <S.AlertContainer>
                            <InlineAlert type="error" iconName={Icons.InfoCircled}>
                                <S.AlertText>{errorMessage}</S.AlertText>
                            </InlineAlert>
                        </S.AlertContainer>
                    )}
                </S.Container>
                <FormFooter
                    onCancelButtonClick={() => setStepVariant(StepVariants.DOCUMENTATION)}
                    submitButtonDisabled={isSubmitButtonDisabled}
                    submitButtonText="Далее"
                />
            </S.FormStyled>
        </FormProvider>
    );
};
