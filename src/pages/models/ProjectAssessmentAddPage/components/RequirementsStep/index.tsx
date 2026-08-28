import React, { FC } from 'react';
import { OpenQuestionsList, RequirementTable } from 'features/projects';

import { Text } from 'components/core';
import { FloatingNavigation } from 'components/interaction';
import { Button, Icon } from 'components/ui';

import { StructureRequirementType } from 'api/projects';
import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { buildRequirementsMarkdown, downloadMarkdown } from '../../markdownExport';
import { ProcessingState } from '../ProcessingState';
import { StepFooter } from '../StepFooter';

import { IRequirementsStepProps } from './types';
import * as S from './units';

export const RequirementsStep: FC<IRequirementsStepProps> = ({
    savedData,
    processState,
    progress,
    onNext,
    onBack,
    onRestart,
}) => {
    const functionalRequirements = savedData.requirements.filter(
        (req) => req.type === StructureRequirementType.FR,
    );

    const nonFunctionalRequirements = savedData.requirements.filter(
        (req) => req.type === StructureRequirementType.NFR,
    );

    const openQuestions = savedData.requirements.filter(
        (req) => req.type === StructureRequirementType.OQ,
    );

    if (processState === 'error') {
        return (
            <S.StepLayout>
                <S.StepScroll>
                    <S.WideContent>
                        <Text variant="body2">
                            Обработка остановлена. Повторите запрос или вернитесь к предыдущему
                            шагу.
                        </Text>
                    </S.WideContent>
                </S.StepScroll>
                <StepFooter
                    restartText="Перезапустить требования"
                    onBack={onBack}
                    onRestart={onRestart}
                />
            </S.StepLayout>
        );
    }

    if (processState !== 'done') {
        return (
            <S.StepLayout>
                <S.StepScroll>
                    <ProcessingState
                        title="Импортирую требования из текста или Confluence"
                        progress={progress}
                        metrics={[
                            { label: 'Обработано', value: `${progress}%` },
                            { label: 'Этап', value: 'Структурирование' },
                        ]}
                    />
                </S.StepScroll>
                <StepFooter
                    restartText="Перезапустить требования"
                    onBack={onBack}
                    onRestart={onRestart}
                />
            </S.StepLayout>
        );
    }

    return (
        <S.StepLayout>
            <S.StepScroll>
                <S.WideContent>
                    <S.RequirementsGrid>
                        <S.RequirementsContent>
                            <S.Section id="assessment-functional-requirements">
                                <Text variant="subtitle1">Функциональные требования</Text>
                                <RequirementTable
                                    requirements={functionalRequirements.map((requirement) => ({
                                        id: requirement.id,
                                        code: requirement.id,
                                        title: requirement.title,
                                        description: requirement.description,
                                    }))}
                                    emptyText="Функциональные требования не выявлены"
                                />
                            </S.Section>
                            <S.Section id="assessment-non-functional-requirements">
                                <Text variant="subtitle1">Нефункциональные требования</Text>
                                <RequirementTable
                                    requirements={nonFunctionalRequirements.map((requirement) => ({
                                        id: requirement.id,
                                        code: requirement.id,
                                        title: requirement.title,
                                        description: requirement.description,
                                    }))}
                                    emptyText="Нефункциональные требования не выявлены"
                                />
                            </S.Section>
                            <S.Section id="assessment-open-questions">
                                <Text variant="subtitle1">Вопросы для уточнения</Text>
                                <OpenQuestionsList
                                    questions={openQuestions.map((question) => ({
                                        id: question.id,
                                        code: question.id,
                                        text: question.title,
                                    }))}
                                />
                            </S.Section>
                        </S.RequirementsContent>
                        <S.SideNavigation>
                            <FloatingNavigation
                                items={[
                                    {
                                        id: 'assessment-functional-requirements',
                                        label: 'Функциональные требования',
                                    },
                                    {
                                        id: 'assessment-non-functional-requirements',
                                        label: 'Нефункциональные требования',
                                    },
                                    {
                                        id: 'assessment-open-questions',
                                        label: 'Вопросы для уточнения',
                                    },
                                ]}
                            />
                        </S.SideNavigation>
                    </S.RequirementsGrid>
                </S.WideContent>
            </S.StepScroll>
            <StepFooter
                restartText="Перезапустить требования"
                extraAction={
                    <Button
                        size="medium"
                        startIcon={<Icon iconName={Icons.Download} />}
                        type="button"
                        variant="outlined"
                        onClick={() =>
                            downloadMarkdown(
                                buildRequirementsMarkdown(savedData.requirements),
                                'requirements.md',
                            )
                        }
                    >
                        Экспорт требований
                    </Button>
                }
                onBack={onBack}
                onNext={onNext}
                onRestart={onRestart}
                nextDisabled={!functionalRequirements.length}
                nextText="Выявить TC"
            />
        </S.StepLayout>
    );
};
