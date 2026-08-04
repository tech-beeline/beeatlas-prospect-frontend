import { ComponentProps } from 'react';

import { TooltipContainer } from '../TooltipContainer';

type TooltipContainerProps = ComponentProps<typeof TooltipContainer>;

export interface IClampedText extends Partial<TooltipContainerProps> {
    text: string;
    tooltipId: string;
    lines?: number;
}
