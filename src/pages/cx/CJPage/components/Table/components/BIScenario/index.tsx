import React, { FC, useState } from 'react';
import { CustomModal } from 'features/cx';
import { useSideSheetStore } from 'features/cx/store';

import { Text } from 'components/core';
import { ClampedText, TooltipContainer as HoverTooltip } from 'components/interaction';
import { Link } from 'components/other';
import { IconButton } from 'components/ui';
import { Avatar, Icon } from 'components/ui';

import { SideSheetVariants } from 'pages/cx/CJPage/const';
import * as R from 'router/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableNumber, formatNullableString } from 'utils/formatters';

import { BIEditScenario } from '../../../BIEditScenario';
import { BIEditSLA } from '../../../BIEditSLA';

import { stepTypeAvatarMap } from './const';
import { DiagramView } from './DiagramView';
import { IBIScenario } from './types';
import * as S from './units';

export const BIScenario: FC<IBIScenario> = ({ biSteps, last }) => {
    const [expanded, setExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRelation, setSelectedRelation] = useState<typeof biSteps.relations[0] | null>(
        null,
    );

    const openDiagram = (relation: typeof biSteps.relations[0]) => {
        if (!relation) return;
        setSelectedRelation(relation);
        setIsOpen(true);
    };
    const [expandedCallIndices, setExpandedCallIndices] = useState<Set<number>>(new Set());
    const { openSideSheet, payload, toggleSideSheet, closeSideSheet } = useSideSheetStore();
    const handleEditSLA = () => {
        toggleSideSheet(SideSheetVariants.EDIT_SLA_BI, biSteps.id);
    };

    const handleEditScenario = () => {
        toggleSideSheet(SideSheetVariants.EDIT_SCENARIO_BI, biSteps.id);
    };
    const stepAvatar = stepTypeAvatarMap[biSteps.type as keyof typeof stepTypeAvatarMap] ?? {
        iconName: Icons.Settings,
        color: 'blue',
    };

    return (
        <S.ScenarioTd last={last}>
            <S.ScenarionTdWrapper last={last} expanded={expanded}>
                <S.ScenarionWrapper>
                    <S.ScenationTitleWrapper>
                        <IconButton
                            onClick={() => setExpanded(!expanded)}
                            iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                            size="medium"
                        />
                        <Avatar
                            variant="circle"
                            icon={<Icon iconName={stepAvatar.iconName} />}
                            color={stepAvatar.color}
                        />
                        <S.FlexWrapper gap="4">
                            <ClampedText
                                text={biSteps.name}
                                tooltipId={`title-${biSteps.id}`}
                                noArrow
                                place="top"
                                offset={8}
                            />
                            <Text variant="caption">
                                {formatNullableString(biSteps.uniqueIdent)}
                            </Text>
                        </S.FlexWrapper>
                    </S.ScenationTitleWrapper>
                    <IconButton iconName={Icons.Edit} size="medium" onClick={handleEditScenario} />
                </S.ScenarionWrapper>
            </S.ScenarionTdWrapper>

            {expanded && (
                <S.ScenarioContentWrapper last={last}>
                    <S.SLAWrapper>
                        <S.TitleWrapper>
                            <Text variant="body3">SLA</Text>
                            <IconButton
                                iconName={Icons.Edit}
                                size="medium"
                                onClick={handleEditSLA}
                            />
                        </S.TitleWrapper>
                        <S.SLAContent>
                            <S.FlexWrapper>
                                <Text variant="overline">RPS</Text>
                                <Text variant="body3">{formatNullableNumber(biSteps.rps)}</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">LATENSY, MS</Text>
                                <Text variant="body3">{formatNullableNumber(biSteps.latency)}</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">ERROR RATE, %</Text>
                                <Text variant="body3">
                                    {formatNullableNumber(biSteps.errorRate)}
                                </Text>
                            </S.FlexWrapper>
                        </S.SLAContent>
                    </S.SLAWrapper>

                    <S.BICallsContainer>
                        {!biSteps.relations || biSteps.relations.length === 0 ? (
                            <S.CallsTitleWrapper>
                                <Text inactive variant="body3">
                                    В шаге сценария BI нет описанных вызовов
                                </Text>
                            </S.CallsTitleWrapper>
                        ) : (
                            biSteps.relations.map((relation, index) => (
                                <S.CallsWrapper key={index} gap="16">
                                    <S.CallsTitleWrapper expanded={expandedCallIndices.has(index)}>
                                        <Text variant="subtitle3">
                                            {relation.tcName ? (
                                                <ClampedText
                                                    text={relation.tcName}
                                                    tooltipId={`relation-${relation.tcName}-${relation.id}`}
                                                    noArrow
                                                    place="top"
                                                    offset={8}
                                                />
                                            ) : relation.productName ? (
                                                <ClampedText
                                                    text={relation.productName}
                                                    tooltipId={`relation-${relation.productName}-${relation.id}`}
                                                    noArrow
                                                    place="top"
                                                    offset={8}
                                                />
                                            ) : (
                                                `Вызов ${index + 1}`
                                            )}
                                        </Text>
                                        <S.ButtonsWrapper gap="8">
                                            {relation.operation &&
                                            relation.operationId &&
                                            relation.tcCode &&
                                            window.FEATURE_FLAGS.FLAG_IS_PROD === false ? (
                                                <>
                                                    <IconButton
                                                        data-tooltip-id={`sequence-diagram-${relation.id}`}
                                                        iconName={Icons.GraphDown}
                                                        size="medium"
                                                        onClick={() => openDiagram(relation)}
                                                    />
                                                    <HoverTooltip
                                                        id={`sequence-diagram-${relation.id}`}
                                                        offset={8}
                                                        place="bottom"
                                                        noArrow
                                                    >
                                                        Просмотр диаграммы последовательности
                                                    </HoverTooltip>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            <S.IconButtonStyled
                                                expanded={expandedCallIndices.has(index)}
                                                size="medium"
                                                iconName={Icons.NavArrowDown}
                                                onClick={() => {
                                                    setExpandedCallIndices((prev) => {
                                                        const newSet = new Set(prev);
                                                        if (newSet.has(index)) {
                                                            newSet.delete(index);
                                                        } else {
                                                            newSet.add(index);
                                                        }
                                                        return newSet;
                                                    });
                                                }}
                                            />
                                        </S.ButtonsWrapper>
                                    </S.CallsTitleWrapper>

                                    {expandedCallIndices.has(index) && (
                                        <S.CallsContent>
                                            <S.FlexWrapper gap="24">
                                                <S.FlexWrapper>
                                                    <Text variant="overline" inactive>
                                                        ПРИЛОЖЕНИЕ
                                                    </Text>
                                                    {relation.productName &&
                                                    relation.productAlias ? (
                                                        <Link
                                                            title={relation.productName}
                                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?cmdb=${relation.productAlias}`}
                                                        />
                                                    ) : (
                                                        formatNullableString(null)
                                                    )}
                                                </S.FlexWrapper>

                                                <S.FlexWrapper>
                                                    <Text variant="overline" inactive>
                                                        ТЕХНИЧЕСКАЯ ВОЗМОЖНОСТЬ
                                                    </Text>
                                                    {relation.tcName && relation.tcId ? (
                                                        <Link
                                                            title={relation.tcName}
                                                            url={`${R.MODELS_PATH}${R.FDM_PATH}?id=${relation.tcId}&type=TECH`}
                                                        />
                                                    ) : (
                                                        formatNullableString(null)
                                                    )}
                                                </S.FlexWrapper>

                                                <S.FlexWrapper>
                                                    <Text variant="overline" inactive>
                                                        ИНТЕРФЕЙС
                                                    </Text>
                                                    {relation.productAlias &&
                                                    relation.interfaceName &&
                                                    relation.interfaceId ? (
                                                        <Link
                                                            title={relation.interfaceName}
                                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&cmdb=${relation.productAlias}&id=${relation.interfaceId}&type=arch_interface`}
                                                        />
                                                    ) : (
                                                        formatNullableString(null)
                                                    )}
                                                </S.FlexWrapper>

                                                <S.FlexWrapper>
                                                    <Text variant="overline" inactive>
                                                        ENDPOINT
                                                    </Text>
                                                    {relation.productAlias &&
                                                    relation.operation &&
                                                    relation.operationId ? (
                                                        <Link
                                                            title={relation.operation}
                                                            url={`${R.MODELS_PATH}${R.APPS_PATH}${R.VIEW_PATH}?tab=INTERFACES_AND_METHODS&cmdb=${relation.productAlias}&id=${relation.operationId}&type=arch_operation`}
                                                        />
                                                    ) : (
                                                        formatNullableString(null)
                                                    )}
                                                </S.FlexWrapper>
                                                <S.FlexWrapper>
                                                    <Text variant="overline" inactive>
                                                        ОПИСАНИЕ
                                                    </Text>
                                                    {formatNullableString(relation.description)}
                                                </S.FlexWrapper>
                                            </S.FlexWrapper>
                                        </S.CallsContent>
                                    )}
                                </S.CallsWrapper>
                            ))
                        )}
                    </S.BICallsContainer>
                </S.ScenarioContentWrapper>
            )}
            <BIEditSLA
                isOpen={openSideSheet === SideSheetVariants.EDIT_SLA_BI && payload === biSteps.id}
                onClose={closeSideSheet}
                slaId={String(biSteps.id)}
                data={{ errorRate: biSteps.errorRate, latency: biSteps.latency, rps: biSteps.rps }}
            />
            <BIEditScenario
                isOpen={
                    openSideSheet === SideSheetVariants.EDIT_SCENARIO_BI && payload === biSteps.id
                }
                onClose={closeSideSheet}
                stepId={biSteps.id}
                relationsData={biSteps.relations}
            />
            {isOpen && selectedRelation && (
                <CustomModal open={isOpen} onClose={() => setIsOpen(false)}>
                    <DiagramView relation={selectedRelation} onClose={() => setIsOpen(false)} />
                </CustomModal>
            )}
        </S.ScenarioTd>
    );
};
