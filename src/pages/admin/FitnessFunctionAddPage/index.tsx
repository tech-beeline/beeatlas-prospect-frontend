import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { Stepper } from 'components/ui';
import { IconButton } from 'components/ui';
import { Banner } from 'components/ui';

import { useGetAllFitnessFunctionsQuery } from 'api/queries/fitness-functions';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import { GeneralInfoForm, LogicForm, TestForm } from './components';
import { STEPS, StepVariants } from './const';
import { IFitnessFunctionSavedData } from './types';
import * as S from './units';

export const FitnessFunctionAddPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');

    const { data: fitnessFunctions, isLoading: isLoadingFitnessFunctions } =
        useGetAllFitnessFunctionsQuery();

    const [stepVariant, setStepVariant] = useState(StepVariants.GENERAL_INFO);
    const [savedData, setSavedData] = useState<IFitnessFunctionSavedData>({});

    const navigate = useNavigate();

    const returnToFitnessFunctions = () => {
        navigate(`${R.ADMIN_PATH}${R.FITNESS_FUNCTIONS_PATH}`);
    };

    useEffect(() => {
        if (paramId) {
            const fitnessFunction = fitnessFunctions?.find(
                (fitnessFunction) => String(fitnessFunction.id) === paramId,
            );
            if (fitnessFunction) {
                setSavedData({
                    code: fitnessFunction.code,
                    name: fitnessFunction.description,
                    isTrigger: fitnessFunction.auxiliary_check,
                    type: fitnessFunction.script ? 0 : fitnessFunction.method_synchronous ? 1 : 2,
                    applicability: fitnessFunction.applicability
                        ? fitnessFunction.applicability.split(', ')
                        : [],
                    scriptCode: fitnessFunction.script ?? '',
                    scriptFile: null,
                    asyncMethodLink: fitnessFunction.method ?? '',
                    syncMethodLink: fitnessFunction.method ?? '',
                });
            }
        }
    }, [paramId, fitnessFunctions]);

    return (
        <S.PageWrapper>
            <S.Content>
                <S.TitleContainer>
                    <IconButton
                        iconName={Icons.ArrowLeft}
                        size="large"
                        onClick={returnToFitnessFunctions}
                    />
                    <Text variant="h4">
                        {paramId
                            ? 'Редактирование кастомной фитнес-функции'
                            : 'Создание кастомной фитнес-функции'}
                    </Text>
                </S.TitleContainer>
                <S.StepperContainer>
                    <Stepper
                        enableAutoScroll
                        direction="horizontal"
                        activeStepId={stepVariant}
                        steps={STEPS.map((step) => ({
                            id: step.id,
                            label: step.label,
                            state:
                                step.id === stepVariant
                                    ? 'active'
                                    : step.index < STEPS.find((s) => s.id === stepVariant)!.index
                                    ? 'success'
                                    : 'non-visited',
                        }))}
                    />
                </S.StepperContainer>
                {!!paramId && (
                    <S.BannerContainer>
                        <Banner
                            iconName={Icons.InfoCircled}
                            color="info"
                            title="После любых изменений фитнес-функции (триггер, тип, применимость) вы можете либо выполнить повторное тестирование и затем сохранить её как Trial, либо сохранить изменения без тестирования — тогда функцию нужно сохранить в статусе Test"
                        />
                    </S.BannerContainer>
                )}
                {stepVariant === StepVariants.GENERAL_INFO && (
                    <GeneralInfoForm
                        setStepVariant={setStepVariant}
                        savedData={savedData}
                        setSavedData={setSavedData}
                        paramId={paramId}
                        fitnessFunctions={fitnessFunctions}
                        isLoadingFitnessFunctions={isLoadingFitnessFunctions}
                    />
                )}
                {stepVariant === StepVariants.LOGIC && (
                    <LogicForm
                        setStepVariant={setStepVariant}
                        savedData={savedData}
                        setSavedData={setSavedData}
                    />
                )}
                {stepVariant === StepVariants.TEST && (
                    <TestForm
                        setStepVariant={setStepVariant}
                        savedData={savedData}
                        setSavedData={setSavedData}
                        paramId={paramId}
                    />
                )}
            </S.Content>
        </S.PageWrapper>
    );
};
