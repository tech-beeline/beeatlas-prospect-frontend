import React, { FC, useState } from 'react';
import { Avatar, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';
import { useSideSheetStore } from 'features/cx/store';

import { Text } from 'components/core';
import { Link } from 'components/other';

import { TooltipContainer } from 'pages/cx/BPMNViewPage/components/TooltipContainer';
import { SideSheetVariants } from 'pages/cx/CJPage/const';
import * as R from 'router/const';
import { formatNullableString } from 'utils/formatters';

import { BIEditScenario } from '../../../BIEditScenario';
import { BIEditSLA } from '../../../BIEditSLA';

import { IBIScenario } from './types';
import * as S from './units';

export const BIScenario: FC<IBIScenario> = ({ biSteps, last }) => {
    const [expanded, setExpanded] = useState(false);
    const [expandedCallIndices, setExpandedCallIndices] = useState<Set<number>>(new Set());
    const { openSideSheet, payload, toggleSideSheet, closeSideSheet } = useSideSheetStore();

    const handleEditSLA = () => {
        toggleSideSheet(SideSheetVariants.EDIT_SLA_BI, biSteps.id);
    };

    const handleEditScenario = () => {
        toggleSideSheet(SideSheetVariants.EDIT_SCENARIO_BI, biSteps.id);
    };

    return (
        <S.ScenarioTd>
            <S.ScenarionTdWrapper last={last} expanded={expanded}>
                <S.ScenationTitleWrapper>
                    <IconButton
                        onClick={() => setExpanded(!expanded)}
                        iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown}
                        size="medium"
                    />
                    <Avatar variant="circle" iconName={Icons.Settings} color="blue" />
                    <Text variant="body3">{biSteps.name}</Text>
                </S.ScenationTitleWrapper>
                <IconButton iconName={Icons.Edit} size="medium" onClick={handleEditScenario} />
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
                                <Text variant="body3">{formatNullableString(biSteps.rps)}</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">LATENSY, MS</Text>
                                <Text variant="body3">{formatNullableString(biSteps.latency)}</Text>
                            </S.FlexWrapper>
                            <S.FlexWrapper>
                                <Text variant="overline">ERROR RATE, %</Text>
                                <Text variant="body3">
                                    {formatNullableString(biSteps.errorRate)}
                                </Text>
                            </S.FlexWrapper>
                        </S.SLAContent>
                    </S.SLAWrapper>

                    <S.BICallsContainer>
                        {!biSteps.relations || biSteps.relations.length === 0 ? (
                            <S.CallsTitleWrapper>
                                <Text variant="subtitle3">{formatNullableString(null)}</Text>
                            </S.CallsTitleWrapper>
                        ) : (
                            biSteps.relations.map((relation, index) => (
                                <S.CallsWrapper key={index} gap="16">
                                    <S.CallsTitleWrapper expanded={expandedCallIndices.has(index)}>
                                        <Text variant="subtitle3">
                                            {relation.tcName ? (
                                                <TooltipContainer
                                                    text={relation.tcName}
                                                    tooltipId={`relation-${relation.tcName}-${relation.id}`}
                                                />
                                            ) : relation.productName ? (
                                                <TooltipContainer
                                                    text={relation.productName}
                                                    tooltipId={`relation-${relation.productName}-${relation.id}`}
                                                />
                                            ) : (
                                                `Вызов ${index + 1}`
                                            )}
                                        </Text>
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
        </S.ScenarioTd>
    );
};
