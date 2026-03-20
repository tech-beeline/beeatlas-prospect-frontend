import React, { FC } from 'react';
import { Chip, IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { TooltipContainer } from 'components/interaction';

import { ICypherChip } from './types';
import { isTextLabelTruncated, textLabel } from './utils';

export const CypherChip: FC<ICypherChip> = ({ tooltipId, text, isActive, onClick, onClear }) => {
    const needsTooltip = isTextLabelTruncated(text);

    return (
        <>
            <div data-tooltip-id={needsTooltip ? tooltipId : undefined}>
                <Chip
                    label={textLabel(text)}
                    onClick={onClick}
                    active={isActive}
                    endAdornment={
                        isActive && onClear ? (
                            <IconButton
                                iconName={Icons.Cancel}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClear();
                                }}
                            />
                        ) : undefined
                    }
                />
            </div>

            {needsTooltip && (
                <TooltipContainer
                    id={tooltipId}
                    place="bottom"
                    offset={8}
                    noArrow
                    largePadding
                    largeWidth
                >
                    {text}
                </TooltipContainer>
            )}
        </>
    );
};
