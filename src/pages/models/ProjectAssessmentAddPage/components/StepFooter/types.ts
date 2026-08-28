import { ReactNode } from 'react';

export interface IStepFooterProps {
    onBack?: () => void;
    onRestart?: () => void;
    restartText?: string;
    restartLoading?: boolean;
    onNext?: () => void;
    nextText?: string;
    nextDisabled?: boolean;
    nextLoading?: boolean;
    nextTooltip?: string;
    extraAction?: ReactNode;
}
