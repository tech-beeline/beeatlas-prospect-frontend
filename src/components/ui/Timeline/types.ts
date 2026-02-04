import type { HTMLAttributes, ReactNode } from 'react';

import type { Icons } from 'styles/design-tokens/js/iconfont/icons';

export type TimelineIconType = 'active' | 'inactive' | 'current' | 'error';

export type AtomPosition = 'top' | 'middle' | 'bottom';

export type DirectionType = 'vertical' | 'horizontal';

export interface StageType {
    id: string;
    title: ReactNode;
    signature?: string;
    text?: string;
    error?: boolean;
    iconName?: Icons;
    action?: ReactNode;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
    activeStepId?: StageType['id'];
    steps: StageType[];
    collapsed?: boolean;
    collapsable?: boolean;
    onCollapse?: () => void;
    direction?: DirectionType;
    completed?: boolean;
    className?: string;
}

export interface TimelineAtomProps {
    type?: TimelineIconType;
    position?: AtomPosition;
    direction?: DirectionType;
    iconName?: Icons;
    collapsable?: boolean;
    collapsed?: boolean;
}

export interface VerticalContentProps extends StageType {
    type: TimelineIconType;
    position: AtomPosition;
    collapsable?: boolean;
    collapsed?: boolean;
}

export interface TimelineHorizontalProps {
    steps: StageType[];
    activeStepIndex?: number;
    completed?: boolean;
}

export interface TimelineVerticalProps {
    steps: StageType[];
    activeStepIndex?: number;
    onCollapse?: () => void;
    collapsed?: boolean;
    collapsable?: boolean;
    completed?: boolean;
}

export interface CurrentStepVerticalTimelineProps {
    steps: StageType[];
    completed?: boolean;
    bottom?: boolean;
    collapsable?: boolean;
    collapsed?: boolean;
}

export interface CollapsableTimelineProps {
    steps: StageType[];
    completed?: boolean;
}

export interface TimelineCollapseProps {
    onCollapse?: () => void;
    collapsed?: boolean;
    className?: string;
    takenStepsCount?: number;
    amountStepsCount?: number;
    completed?: boolean;
    pastSteps?: boolean;
    children?: ReactNode;
}
