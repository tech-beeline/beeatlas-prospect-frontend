import React, { FC, useId } from 'react';

import { TooltipContainer } from 'components/interaction';
import { IconButton } from 'components/ui';

import { Icons } from 'styles/design-tokens/js/iconfont';

import { IBlurButton } from './types';

export const BlurButton: FC<IBlurButton> = ({ isBlurred, onToggle }) => {
    const id = useId();

    return (
        <>
            <IconButton
                data-tooltip-id={`blur-${id}`}
                onClick={onToggle}
                iconName={isBlurred ? Icons.Eye : Icons.EyeOff}
                size="medium"
            />
            <TooltipContainer id={`blur-${id}`} offset={8} place="top" noArrow>
                {isBlurred ? 'Показать содержимое' : 'Скрыть содержимое'}
            </TooltipContainer>
        </>
    );
};
