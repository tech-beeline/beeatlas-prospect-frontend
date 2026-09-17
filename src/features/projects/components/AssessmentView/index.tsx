import React, { FC, useState } from 'react';

import { Text } from 'components/core';
import { FloatingNavigation } from 'components/interaction';
import { Badge, Chip, Icon } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { METHODOLOGY_LEVELS, NAVIGATION_ITEMS } from './const';
import { OpenQuestionsList } from './OpenQuestionsList';
import { RequirementTable } from './RequirementsTable';
import {
    IAssessmentViewDesignTechnicalCapability,
    IAssessmentViewProps,
    IAssessmentViewRequirement,
    IAssessmentViewTechnicalCapability,
} from './types';
import * as S from './units';

type TechnicalView = 'reused' | 'new' | 'systems';
type Capability = IAssessmentViewTechnicalCapability | IAssessmentViewDesignTechnicalCapability;

const getCapabilityName = (capability: Capability) =>
    'tcCode' in capability ? capability.name || capability.tcCode : capability.name;
const getCapabilityDescription = (capability: Capability) =>
    'description' in capability ? capability.description : '';

const CapabilityCard: FC<{
    capability: Capability;
    kind: Exclude<TechnicalView, 'systems'>;
    requirements: IAssessmentViewRequirement[];
}> = ({ capability, kind, requirements }) => {
    const [expanded, setExpanded] = useState(false);
    const relatedRequirements = capability.frIds
        .map((id) => requirements.find(({ uniqueIdent }) => uniqueIdent === id))
        .filter((requirement): requirement is IAssessmentViewRequirement => !!requirement);
    const name = getCapabilityName(capability);
    const description = getCapabilityDescription(capability);
    const code = capability.parentBcCode || ('tcCode' in capability ? capability.tcCode : '');

    return (
        <S.CapabilityCard border="default">
            <S.CapabilityHeader>
                <S.CapabilityTitle>
                    <Text variant="subtitle2">{name}</Text>
                    {capability.relevance !== undefined && (
                        <Badge semantic="warning">{capability.relevance}%</Badge>
                    )}
                </S.CapabilityTitle>
                <Badge semantic={kind === 'new' ? 'info' : 'success'} type="secondary">
                    {kind === 'new' ? 'Новая' : 'Переиспользование'}
                </Badge>
            </S.CapabilityHeader>

            {code && code !== name && (
                <Text inactive variant="body3">
                    {code}
                </Text>
            )}
            {description && (
                <Text inactive variant="body3">
                    {description}
                </Text>
            )}
            {(capability.productName || capability.productAlias) && (
                <S.ProductTag>
                    {capability.productName || capability.productAlias}
                    {capability.productName && capability.productAlias
                        ? ` (${capability.productAlias})`
                        : ''}
                </S.ProductTag>
            )}

            <S.RequirementsRow>
                <Text variant="body2">
                    Требования: {capability.frIds.length ? capability.frIds.join(', ') : '—'}
                </Text>
                {relatedRequirements.length > 0 && (
                    <S.ExpandButton
                        type="button"
                        aria-expanded={expanded}
                        aria-label={expanded ? 'Скрыть требования' : 'Показать требования'}
                        onClick={() => setExpanded((value) => !value)}
                    >
                        <Icon iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown} />
                    </S.ExpandButton>
                )}
            </S.RequirementsRow>

            {expanded && (
                <S.RelatedRequirements>
                    {relatedRequirements.map((requirement) => (
                        <div key={requirement.id}>
                            <Text variant="body3">
                                {requirement.uniqueIdent}: {requirement.title}
                            </Text>
                            <Text inactive variant="body3">
                                {requirement.description}
                            </Text>
                        </div>
                    ))}
                </S.RelatedRequirements>
            )}
        </S.CapabilityCard>
    );
};

export const AssessmentView: FC<IAssessmentViewProps> = ({ assessment, header }) => {
    const impactTone =
        METHODOLOGY_LEVELS.find(({ code }) => code === assessment.impactLevel)?.tone || 'neutral';
    const systems = Array.from(
        new Map(
            [...assessment.tc, ...assessment.designTc]
                .filter(({ productAlias, productName }) => productAlias || productName)
                .map((capability) => [
                    capability.productAlias || capability.productName,
                    {
                        alias: capability.productAlias,
                        name: capability.productName,
                        title: getCapabilityName(capability),
                        description: getCapabilityDescription(capability),
                    },
                ]),
        ).values(),
    );
    const [technicalView, setTechnicalView] = useState<TechnicalView>(() =>
        assessment.tc.length ? 'reused' : assessment.designTc.length ? 'new' : 'systems',
    );

    return (
        <S.ViewWrapper>
            <S.MainContent>
                {header}

                <S.Section id="assessment-statistics">
                    <Text variant="subtitle1">Статистика</Text>
                    <S.StatisticsGrid>
                        <S.StatisticCard border="default">
                            <S.ImpactValue variant="h4" $tone={impactTone}>
                                {assessment.impactLevel}
                            </S.ImpactValue>
                            <Text inactive variant="body2">
                                Оценка влияния
                            </Text>
                        </S.StatisticCard>
                        <S.StatisticCard border="default">
                            <Text variant="h4">{assessment.reqFunc.length}</Text>
                            <Text inactive variant="body2">
                                Функциональные требования
                            </Text>
                        </S.StatisticCard>
                        <S.StatisticCard border="default">
                            <Text variant="h4">{assessment.reqNonFunc.length}</Text>
                            <Text inactive variant="body2">
                                Нефункциональные требования
                            </Text>
                        </S.StatisticCard>
                        <S.StatisticCard border="default">
                            <S.StatisticValue>
                                <Text variant="h4">{assessment.designTc.length}</Text>
                                <Badge semantic="info" type="secondary">
                                    Новые
                                </Badge>
                            </S.StatisticValue>
                            <Text inactive variant="body2">
                                Технические возможности
                            </Text>
                        </S.StatisticCard>
                        <S.StatisticCard border="default">
                            <S.StatisticValue>
                                <Text variant="h4">{assessment.tc.length}</Text>
                                <Badge semantic="success" type="secondary">
                                    Переиспользованные
                                </Badge>
                            </S.StatisticValue>
                            <Text inactive variant="body2">
                                Технические возможности
                            </Text>
                        </S.StatisticCard>
                        <S.StatisticCard border="default">
                            <Text variant="h4">{systems.length}</Text>
                            <Text inactive variant="body2">
                                Затронутые системы
                            </Text>
                        </S.StatisticCard>
                    </S.StatisticsGrid>
                </S.Section>

                <S.Section id="assessment-methodology">
                    <Text variant="subtitle1">Оценка по методологии</Text>
                    <S.MethodologyGrid>
                        {METHODOLOGY_LEVELS.map((level) => {
                            const selected = level.code === assessment.impactLevel;

                            return (
                                <S.MethodologyCard
                                    border={selected ? 'brand' : 'default'}
                                    key={level.code}
                                    $selected={selected}
                                    $tone={level.tone}
                                >
                                    <S.MethodologyCode
                                        inactive
                                        variant="h4"
                                        $selected={selected}
                                        $tone={level.tone}
                                    >
                                        {level.code}
                                    </S.MethodologyCode>
                                    <Text inactive variant="caption">
                                        {level.title}
                                    </Text>
                                    <Text inactive variant="caption">
                                        {level.description}
                                    </Text>
                                </S.MethodologyCard>
                            );
                        })}
                    </S.MethodologyGrid>
                </S.Section>

                <S.Section id="assessment-functional">
                    <Text variant="subtitle1">Функциональные требования</Text>
                    <RequirementTable
                        emptyText="Функциональные требования не выявлены"
                        requirements={assessment.reqFunc.map((requirement) => ({
                            id: requirement.id,
                            code: requirement.uniqueIdent,
                            title: requirement.title,
                            description: requirement.description,
                        }))}
                    />
                </S.Section>

                <S.Section id="assessment-non-functional">
                    <Text variant="subtitle1">Нефункциональные требования</Text>
                    <RequirementTable
                        emptyText="Нефункциональные требования не выявлены"
                        requirements={assessment.reqNonFunc.map((requirement) => ({
                            id: requirement.id,
                            code: requirement.uniqueIdent,
                            title: requirement.title,
                            description: requirement.description,
                        }))}
                    />
                </S.Section>

                <S.Section id="assessment-capabilities">
                    <Text variant="subtitle1">Технические возможности</Text>
                    <S.TechnicalChips>
                        <Chip
                            active={technicalView === 'reused'}
                            label={`Переиспользованные (${assessment.tc.length})`}
                            onClick={() => setTechnicalView('reused')}
                        />
                        <Chip
                            active={technicalView === 'new'}
                            label={`Новые (${assessment.designTc.length})`}
                            onClick={() => setTechnicalView('new')}
                        />
                        <Chip
                            active={technicalView === 'systems'}
                            label={`Затронутые системы (${systems.length})`}
                            onClick={() => setTechnicalView('systems')}
                        />
                    </S.TechnicalChips>

                    {technicalView === 'reused' && (
                        <S.CapabilityList>
                            {assessment.tc.map((capability) => (
                                <CapabilityCard
                                    capability={capability}
                                    key={capability.id}
                                    kind="reused"
                                    requirements={assessment.reqFunc}
                                />
                            ))}
                            {!assessment.tc.length && (
                                <Text inactive variant="body2">
                                    Переиспользованные технические возможности не выявлены
                                </Text>
                            )}
                        </S.CapabilityList>
                    )}

                    {technicalView === 'new' && (
                        <S.CapabilityList>
                            {assessment.designTc.map((capability) => (
                                <CapabilityCard
                                    capability={capability}
                                    key={capability.id}
                                    kind="new"
                                    requirements={assessment.reqFunc}
                                />
                            ))}
                            {!assessment.designTc.length && (
                                <Text inactive variant="body2">
                                    Новые технические возможности не выявлены
                                </Text>
                            )}
                        </S.CapabilityList>
                    )}

                    {technicalView === 'systems' && (
                        <S.SystemsList>
                            <S.SystemCard border="default">
                                {systems.map((system) => (
                                    <S.SystemDetails key={system.alias}>
                                        <Text variant="body2">{system.name || '—'}</Text>
                                        <Text inactive variant="body3">
                                            {system.alias || '—'}
                                        </Text>
                                    </S.SystemDetails>
                                ))}
                            </S.SystemCard>
                            {!systems.length && (
                                <Text inactive variant="body2">
                                    Системы не выявлены
                                </Text>
                            )}
                        </S.SystemsList>
                    )}
                </S.Section>

                <S.Section id="assessment-questions">
                    <Text variant="subtitle1">Вопросы для уточнения</Text>
                    <OpenQuestionsList
                        questions={assessment.openQuestions.map((question) => ({
                            id: question.id,
                            code: question.uniqueIdent,
                            text: question.questionText,
                        }))}
                    />
                </S.Section>
            </S.MainContent>

            <S.SideNavigation>
                <FloatingNavigation items={NAVIGATION_ITEMS} />
            </S.SideNavigation>
        </S.ViewWrapper>
    );
};
