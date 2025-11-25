import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Banner, InlineAlert } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { TextArea } from 'components/form';
import { Link } from 'components/other';

import { useValidateRulesMutation } from 'api/queries/patterns';

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

    const onSubmit = handleSubmit(async (values) => {
        if (values.rule === '') {
            setSavedData({ ...savedData, rule: values.rule });
            setStepVariant(StepVariants.DESCRIPTION);
        } else {
            const ok = await validate(values.rule);
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
                                    <S.BannerTitleContainer>
                                        Прежде чем создавать правила идентификации архитектуры,
                                        ознакомьтесь с{' '}
                                        <Link
                                            title="SDK BeeAtlas"
                                            url="https://git.vimpelcom.ru/common/beeatlas/beeatlas_sdk"
                                        />
                                    </S.BannerTitleContainer>
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
                        <InlineAlert type="error" iconName={Icons.InfoCircled}>
                            <S.AlertContainer>{errorMessage}</S.AlertContainer>
                        </InlineAlert>
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
