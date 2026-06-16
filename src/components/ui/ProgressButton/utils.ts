import { type ReactNode, useCallback, useRef } from 'react';

import type { ResolvedButtonVariant } from '../Button/types';
import { resolveVariant } from '../Button/utils';

import { DEFAULT_SETTINGS } from './const';
import type { ProgressButtonSettings, ProgressButtonState } from './types';

export const classNames = (
    ...args: Array<string | Record<string, boolean> | undefined | false>
): string =>
    args
        .flatMap((arg) => {
            if (!arg) {
                return [];
            }

            if (typeof arg === 'string') {
                return [arg];
            }

            return Object.entries(arg)
                .filter(([, value]) => value)
                .map(([key]) => key);
        })
        .join(' ');

export const useDebounceCallback = <T extends (...args: never[]) => void>(
    callback: T,
    delay: number,
): [(...args: Parameters<T>) => void, () => void] => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearInnerTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const debouncedFunc = useCallback(
        (...args: Parameters<T>) => {
            clearInnerTimeout();
            timeoutRef.current = setTimeout(() => {
                callback(...args);
                timeoutRef.current = null;
            }, delay);
        },
        [callback, delay, clearInnerTimeout],
    );

    return [debouncedFunc, clearInnerTimeout];
};

export const calcSettings = (
    buttonRef: React.RefObject<HTMLElement | null>,
): ProgressButtonSettings => {
    const buttonElement = buttonRef.current;

    if (buttonElement) {
        const buttonRect = buttonElement.getBoundingClientRect();

        return {
            width: buttonRect.width,
            height: buttonRect.height,
            startPos: buttonElement.offsetWidth / 2,
            strokeWidth: DEFAULT_SETTINGS.strokeWidth,
            borderRadius: DEFAULT_SETTINGS.borderRadius,
        };
    }

    return DEFAULT_SETTINGS;
};

export const areSettingsEqual = (
    prev: ProgressButtonSettings | null,
    next: ProgressButtonSettings,
): boolean =>
    prev !== null &&
    prev.width === next.width &&
    prev.height === next.height &&
    prev.startPos === next.startPos &&
    prev.strokeWidth === next.strokeWidth &&
    prev.borderRadius === next.borderRadius;

export const calcPathDefinition = (settings: ProgressButtonSettings): string => `
	M ${settings.startPos} ${settings.strokeWidth}
	H${settings.width - settings.borderRadius}
	a${settings.borderRadius},${settings.borderRadius} 0 0 1 ${settings.borderRadius},${
    settings.borderRadius
}
	V${settings.height - settings.borderRadius}
	a${settings.borderRadius},${settings.borderRadius} 0 0 1 -${settings.borderRadius},${
    settings.borderRadius
}
	H${settings.borderRadius + settings.strokeWidth}
	a${settings.borderRadius},${settings.borderRadius} 0 0 1 -${settings.borderRadius},-${
    settings.borderRadius
}
	V${settings.borderRadius + settings.strokeWidth}
	a${settings.borderRadius},${settings.borderRadius} 0 0 1 ${settings.borderRadius},-${
    settings.borderRadius
}
	H ${settings.startPos}
`;

export const isErrorObject = (value: unknown): value is Error =>
    !!value &&
    typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Error]';

export const resolveLoadingState = ({
    state,
    isError,
    progress,
}: {
    state?: ProgressButtonState;
    isError: boolean;
    progress: number;
}): ProgressButtonState => {
    if (state) {
        return state;
    }

    if (isError) {
        return 'error';
    }

    if (progress <= 0) {
        return 'default';
    }

    if (progress > 0 && progress < 100) {
        return 'loading';
    }

    return 'success';
};

export const getStrokeColor = (variant: string, loadingState: ProgressButtonState): string => {
    const resolvedVariant = resolveVariant(variant);

    if (loadingState === 'error') {
        return 'var(--color-status-error)';
    }

    if (loadingState === 'success') {
        return 'transparent';
    }

    switch (resolvedVariant) {
        case 'contained':
            return 'var(--color-text-black-active, rgba(9, 11, 22, 0.94))';
        case 'outlined':
            return 'var(--color-background-brand)';
        case 'overlay':
            return 'var(--color-button-overlay-background)';
        case 'danger':
            return 'var(--color-status-error)';
        case 'accent-black':
        case 'accent-white':
            return 'var(--color-text-black-active, rgba(9, 11, 22, 0.94))';
        default:
            return 'transparent';
    }
};

export const getProgressButtonRootClassName = ({
    loadingState,
    startIcon,
    endIcon,
    children,
    className,
}: {
    loadingState: ProgressButtonState;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
}): string =>
    classNames(
        'dsb-button-progress',
        `dsb-button-progress--${loadingState}`,
        {
            'dsb_button__start-icon': !!startIcon,
            'dsb_button__end-icon': !!endIcon,
            'dsb_button__icon-button': !children,
        },
        className,
    );

export const getVariantClassName = (variant: string): string => {
    const resolvedVariant = resolveVariant(variant) as ResolvedButtonVariant;

    return `dsb_button__${resolvedVariant}`;
};
