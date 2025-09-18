import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stepper } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { Text } from 'components/core';

import * as R from 'router/const';

import { DescriptionForm, DocumentationForm, GeneralInfoForm, RulesForm } from './components';
import { ISavedData, STEPS, StepVariants } from './const';
import * as S from './units';

export const PatternAddPage = () => {
    const [stepVariant, setStepVariant] = useState(StepVariants.GENERAL_INFO);
    const [savedData, setSavedData] = useState<ISavedData>({});

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}`);
    };

    return (
        <S.PageWrapper>
            <S.Header>
                <IconButton size="large" iconName={Icons.ArrowLeft} onClick={navigateBack} />
                <Text variant="body2">Назад</Text>
            </S.Header>
            <S.Subheader>
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
            </S.Subheader>
            {stepVariant === StepVariants.GENERAL_INFO && (
                <GeneralInfoForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
            {stepVariant === StepVariants.DOCUMENTATION && (
                <DocumentationForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
            {stepVariant === StepVariants.RULES && (
                <RulesForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
            {stepVariant === StepVariants.DESCRIPTION && (
                <DescriptionForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
        </S.PageWrapper>
    );
};
