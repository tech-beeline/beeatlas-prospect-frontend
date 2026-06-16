import type { HTMLAttributes } from 'react';

export type StepStateType = 'active' | 'success' | 'error' | 'disabled' | 'visited' | 'non-visited';

export type StepperDirectionType = 'vertical' | 'horizontal';

export interface StepType {
    id: string;
    label: string;
    signature?: string;
    state?: StepStateType;
    activated?: boolean;
    direction?: StepperDirectionType;
}

export interface StepCommonProps extends StepType {
    order?: number;
    onClick?: (id: string) => void;
}

export interface StepperStepProps extends StepCommonProps {
    activated?: boolean;
    direction: StepperDirectionType;
}

export interface StepperMobileStepProps extends StepCommonProps {
    activated?: boolean;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    switchLength?: number;
    steps: StepType[];
    activeStepId: StepType['id'];
    direction?: StepperDirectionType;
    mobile?: boolean;
    className?: string;
    onStepChange?: (id: string) => void;
    enableAutoScroll?: boolean;
}
