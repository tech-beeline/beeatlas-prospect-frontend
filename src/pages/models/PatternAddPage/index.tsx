import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Text } from 'components/core';
import { IconButton, Stepper } from 'components/ui';

import { useGetPatternByIdQuery, useGetPatternFileByIdQuery } from 'api/queries/patterns';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';

import {
    DescriptionForm,
    DocumentationForm,
    GeneralInfoForm,
    NFRForm,
    RulesForm,
} from './components';
import { ISavedData, STEPS, StepVariants } from './const';
import * as S from './units';

export const PatternAddPage = () => {
    const [params] = useSearchParams();
    const paramId = params.get('id');
    const [stepVariant, setStepVariant] = useState(StepVariants.GENERAL_INFO);
    const [savedData, setSavedData] = useState<ISavedData>({});

    const { data } = useGetPatternByIdQuery(paramId);
    const { data: fileData } = useGetPatternFileByIdQuery(paramId);

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(`${R.MODELS_PATH}${R.PATTERNS_PATH}`);
    };

    useEffect(() => {
        if (data && fileData) {
            setSavedData({
                documentationFile: new File([fileData.file], fileData.fileName),
                name: data.name,
                type: data.isAntiPattern === true ? 1 : 0,
                description: data.description,
                group: data.groups.map((group) => group.id),
                tech: data.technologies.map((tech) => tech.id),
                dsl: data.dsl,
                rule: data.rule,
            });
        } else {
            setSavedData({});
        }
    }, [data, fileData]);

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
                        state: paramId
                            ? 'success'
                            : step.id === stepVariant
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
            {stepVariant === StepVariants.NFR && (
                <NFRForm
                    setStepVariant={setStepVariant}
                    savedData={savedData}
                    setSavedData={setSavedData}
                />
            )}
        </S.PageWrapper>
    );
};
