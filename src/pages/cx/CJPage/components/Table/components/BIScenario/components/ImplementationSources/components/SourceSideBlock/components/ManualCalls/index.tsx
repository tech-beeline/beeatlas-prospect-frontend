import React, { FC } from 'react';

import { TooltipContainer as HoverTooltip } from 'components/interaction';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { CallCard } from '../CallCard';

import { IManualCalls } from './types';
import * as S from './units';
import { canShowSequenceDiagram, getManualCallFields } from './utils';

export const ManualCalls: FC<IManualCalls> = ({ relations, onOpenDiagram }) => (
    <S.CallsList>
        {relations.map((relation, index) => (
            <CallCard
                key={relation.id}
                title={`Вызов ${index + 1}`}
                fields={getManualCallFields(relation)}
                actions={
                    canShowSequenceDiagram(relation) ? (
                        <>
                            <IconButton
                                data-tooltip-id={`source-sequence-diagram-${relation.id}`}
                                iconName={Icons.GraphDown}
                                size="medium"
                                onClick={() => onOpenDiagram(relation)}
                            />
                            <HoverTooltip
                                id={`source-sequence-diagram-${relation.id}`}
                                offset={8}
                                place="bottom"
                                noArrow
                            >
                                Просмотр диаграммы последовательности
                            </HoverTooltip>
                        </>
                    ) : undefined
                }
            />
        ))}
    </S.CallsList>
);
