import React, { FC, useState } from 'react';
import { CustomModal } from 'features/cx';
import { useSideSheetStore } from 'features/cx/store';

import { Text } from 'components/core';
import { ClampedText } from 'components/interaction';
import { IconButton } from 'components/ui';
import { Avatar, Icon } from 'components/ui';

import { SideSheetVariants } from 'pages/cx/CJPage/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableNumber, formatNullableString } from 'utils/formatters';

import { BIEditScenario } from '../../../BIEditScenario';
import { BIEditSLA } from '../../../BIEditSLA';

import { ImplementationSources } from './components';
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
                                <Text variant="overline">LATENCY, MS</Text>
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

                    <ImplementationSources biStep={biSteps} onOpenDiagram={openDiagram} />
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
