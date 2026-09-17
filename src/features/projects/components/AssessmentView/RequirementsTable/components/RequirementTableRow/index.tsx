import React, { FC, useId, useRef } from 'react';

import { Text } from 'components/core';
import { TooltipContainer } from 'components/interaction';
import { TableData, TableRow } from 'components/ui';

import { useShowTooltip } from 'hooks';

import { IRequirementTableRowProps } from '../../types';

import * as S from './units';

export const RequirementTableRow: FC<IRequirementTableRowProps> = ({ requirement }) => {
    const descriptionRef = useRef<HTMLDivElement>(null);
    const showDescriptionTooltip = useShowTooltip(descriptionRef);
    const tooltipId = `assessment-requirement-${useId().replace(/:/g, '')}`;

    return (
        <TableRow dense>
            <TableData>
                <S.TitleCell>
                    <Text variant="body3">{requirement.title}</Text>
                    {requirement.code && (
                        <Text inactive variant="body3">
                            {requirement.code}
                        </Text>
                    )}
                </S.TitleCell>
            </TableData>
            <TableData>
                <S.Description
                    ref={descriptionRef}
                    data-tooltip-id={showDescriptionTooltip ? tooltipId : undefined}
                >
                    {requirement.description || '—'}
                </S.Description>
                {showDescriptionTooltip && (
                    <TooltipContainer largePadding id={tooltipId} noArrow offset={8} place="bottom">
                        {requirement.description}
                    </TooltipContainer>
                )}
            </TableData>
        </TableRow>
    );
};
