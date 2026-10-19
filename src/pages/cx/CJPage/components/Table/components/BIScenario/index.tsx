import React, { FC, useState } from 'react';
import { CustomModal } from 'features/cx';
import { useSideSheetStore } from 'features/cx/store';

import { Text } from 'components/core';
import { ClampedText } from 'components/interaction';
import { Avatar, Icon } from 'components/ui';

import { SideSheetVariants } from 'pages/cx/CJPage/const';
import { Icons } from 'styles/design-tokens/js/iconfont';
import { formatNullableString } from 'utils/formatters';

import { BIEditScenario } from '../../../BIEditScenario';
import { ManualCallEditor } from '../../../BIEditScenario/types';
import { BIEditSLA } from '../../../BIEditSLA';

import { ImplementationSources, SLA } from './components';
import { stepTypeAvatarMap } from './const';
import { DiagramView } from './DiagramView';
import { IBIScenario } from './types';
import * as S from './units';
import { isUserTaskStep } from './utils';

export const BIScenario: FC<IBIScenario> = ({ biSteps, bpmn = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [manualEditor, setManualEditor] = useState<ManualCallEditor>({ mode: 'initial' });
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

    const handleEditScenario = (editor: ManualCallEditor) => {
        setManualEditor(editor);
        toggleSideSheet(SideSheetVariants.EDIT_SCENARIO_BI, biSteps.id);
    };
    const stepAvatar = stepTypeAvatarMap[biSteps.type as keyof typeof stepTypeAvatarMap] ?? {
        iconName: Icons.Settings,
        color: 'blue',
    };
    const isLocked = bpmn && isUserTaskStep(biSteps.type);

    return (
        <S.ScenarioCard>
            <S.ScenarioHeader
                type="button"
                expanded={expanded && !isLocked}
                disabled={isLocked}
                aria-expanded={!isLocked ? expanded : undefined}
                onClick={() => setExpanded(!expanded)}
            >
                <Avatar
                    variant="circle"
                    icon={<Icon iconName={stepAvatar.iconName} />}
                    color={stepAvatar.color}
                />
                <S.Title>
                    <ClampedText
                        text={biSteps.name}
                        tooltipId={`title-${biSteps.id}`}
                        noArrow
                        place="top"
                        offset={8}
                    />
                    <Text variant="caption" inactive>
                        {formatNullableString(biSteps.uniqueIdent)}
                    </Text>
                </S.Title>
                {!isLocked && <Icon iconName={expanded ? Icons.NavArrowUp : Icons.NavArrowDown} />}
            </S.ScenarioHeader>

            {expanded && !isLocked && (
                <S.ScenarioContent>
                    <SLA biStep={biSteps} onEdit={handleEditSLA} />
                    <ImplementationSources
                        biStep={biSteps}
                        onOpenDiagram={openDiagram}
                        onEditManual={handleEditScenario}
                    />
                </S.ScenarioContent>
            )}
            {!isLocked && (
                <>
                    <BIEditSLA
                        isOpen={
                            openSideSheet === SideSheetVariants.EDIT_SLA_BI &&
                            payload === biSteps.id
                        }
                        onClose={closeSideSheet}
                        slaId={String(biSteps.id)}
                        data={{
                            errorRate: biSteps.errorRate,
                            latency: biSteps.latency,
                            rps: biSteps.rps,
                        }}
                    />
                    <BIEditScenario
                        isOpen={
                            openSideSheet === SideSheetVariants.EDIT_SCENARIO_BI &&
                            payload === biSteps.id
                        }
                        onClose={closeSideSheet}
                        stepId={biSteps.id}
                        mode={manualEditor.mode}
                        relationId={manualEditor.relationId}
                        relationsData={biSteps.relations}
                    />
                </>
            )}
            {isOpen && selectedRelation && (
                <CustomModal open={isOpen} onClose={() => setIsOpen(false)}>
                    <DiagramView relation={selectedRelation} onClose={() => setIsOpen(false)} />
                </CustomModal>
            )}
        </S.ScenarioCard>
    );
};
