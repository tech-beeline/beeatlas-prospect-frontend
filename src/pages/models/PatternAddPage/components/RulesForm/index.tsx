import React, { FC, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Banner, InlineAlert } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { TextArea } from 'components/form';
import { Link } from 'components/other';

import { useValidateRulesMutation } from 'api/queries/patterns';
import * as ROUTER from 'router/const';

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
        if (!cypher.trim()) {
            setErrorMessage('Поле не может быть пустым');
            return false;
        }

        try {
            const response = await validateRules(cypher);

            if (response.valid === true || response.valid === 'true') {
                return true;
            }
        } catch (err) {
            setErrorMessage((err as AxiosError<{ error: string }>).response?.data?.error ?? '');
            return false;
        }
        return false;
    };

    const lastValidatedRuleRef = useRef<string | null>(null);

    const onSubmit = handleSubmit(async (values) => {
        if (values.rule === '' || values.rule === lastValidatedRuleRef.current) {
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
                                            url={`${ROUTER.MODELS_PATH}${ROUTER.PATTERNS_PATH}${ROUTER.RULES_PATH}`}
                                        />
                                        . Если при проверке правил возникнут ошибки, вы можете
                                        перейти к следующему шагу и внести правки позже. Но до этого
                                        момента за корректность правил отвечаете исключительно вы
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
                    submitButtonDisabled={isValidating}
                    submitButtonText="Далее"
                />
            </S.FormStyled>
        </FormProvider>
    );
};
