import React, {
    type ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Icons } from 'styles/design-tokens/js/iconfont/icons';

import { normalizeButtonIcon, resolveVariant } from '../Button/utils';

import { DEFAULT_STATUS_DELAY_TIME } from './const';
import type { ProgressButtonProps, ProgressButtonSettings, ProgressButtonState } from './types';
import * as S from './units';
import {
    areSettingsEqual,
    calcPathDefinition,
    calcSettings,
    classNames,
    getProgressButtonRootClassName,
    getStrokeColor,
    getVariantClassName,
    isErrorObject,
    resolveLoadingState,
    useDebounceCallback,
} from './utils';

export const ProgressButton = forwardRef<HTMLElement, ProgressButtonProps>(
    (
        {
            determinateMode = false,
            progress = 0,
            size = 'medium',
            statusDelayTime = DEFAULT_STATUS_DELAY_TIME,
            className,
            variant = 'primary',
            children,
            startIcon,
            endIcon,
            onClick,
            disabled,
            state,
            ...props
        },
        ref,
    ) => {
        const resolvedVariant = resolveVariant(variant);
        const buttonRef = useRef<HTMLElement | null>(null);
        const [internalProgress, setInternalProgress] = useState(determinateMode ? progress : 0);
        const [statusIcon, setStatusIcon] = useState(Icons.Check);
        const [isError, setIsError] = useState(false);
        const [settings, setSettings] = useState<ProgressButtonSettings | null>(null);
        const [windowWidth, setWindowWidth] = useState(
            typeof window !== 'undefined' ? window.innerWidth : 0,
        );

        const updateSettings = useCallback(() => {
            if (!buttonRef.current) {
                return;
            }

            const nextSettings = calcSettings(buttonRef);

            setSettings((prev) => (areSettingsEqual(prev, nextSettings) ? prev : nextSettings));
        }, []);

        const [toDefaultStateWithDelay, cancelToDefaultStateWithDelay] = useDebounceCallback(() => {
            if (statusDelayTime === -1) {
                return;
            }

            setInternalProgress(0);
            setIsError(false);
        }, statusDelayTime);

        const loadingState = useMemo(
            () =>
                resolveLoadingState({
                    state,
                    isError,
                    progress: internalProgress,
                }),
            [state, isError, internalProgress],
        );

        const setButtonRefHandler = useCallback(
            (buttonElement: HTMLElement | null) => {
                if (ref) {
                    if (typeof ref === 'function') {
                        ref(buttonElement);
                    } else {
                        ref.current = buttonElement;
                    }
                }

                buttonRef.current = buttonElement;
            },
            [ref],
        );

        const isFinished = loadingState === 'success' || loadingState === 'error';
        const strokeColor = useMemo(
            () => getStrokeColor(variant, loadingState),
            [variant, loadingState],
        );
        const pathDefinition = useMemo(
            () => (settings ? calcPathDefinition(settings) : ''),
            [settings],
        );
        const fullWidth = props.fullWidth;

        useEffect(() => {
            if (!fullWidth) {
                return;
            }

            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [fullWidth]);

        useLayoutEffect(() => {
            updateSettings();
        }, [children, size, loadingState, fullWidth, windowWidth, updateSettings]);

        useEffect(() => {
            if (!determinateMode) {
                return;
            }

            if (progress <= 0) {
                setInternalProgress(0);
            } else if (progress > 0 && progress < 100) {
                setInternalProgress(progress);
            } else if (progress >= 100) {
                setInternalProgress(100);
            }
        }, [progress, determinateMode]);

        useEffect(() => {
            switch (loadingState as ProgressButtonState) {
                case 'success':
                    setStatusIcon(Icons.Check);
                    toDefaultStateWithDelay();
                    break;
                case 'error':
                    setStatusIcon(Icons.Refresh);
                    toDefaultStateWithDelay();
                    break;
                default:
                    break;
            }
        }, [loadingState, toDefaultStateWithDelay]);

        const handleClick = () => {
            setIsError(false);
            cancelToDefaultStateWithDelay();

            if (!determinateMode && onClick) {
                setInternalProgress(3);
            }

            Promise.resolve(onClick?.())
                .then((result) => {
                    if (isErrorObject(result)) {
                        throw result;
                    }

                    if (onClick) {
                        setInternalProgress(100);
                    }

                    return result;
                })
                .catch(() => {
                    setIsError(true);
                });
        };

        return (
            <S.ProgressButtonRoot
                data-testid="ProgressButton"
                ref={setButtonRefHandler as ForwardedRef<HTMLElement>}
                {...props}
                onClick={handleClick}
                size={size}
                variant={resolvedVariant}
                className={getProgressButtonRootClassName({
                    loadingState,
                    startIcon,
                    endIcon,
                    children,
                    className: classNames(getVariantClassName(variant), className),
                })}
                disabled={disabled || loadingState === 'loading'}
                $loadingState={loadingState}
                $variant={resolvedVariant}
            >
                <S.Status
                    className={classNames('dsb-button-progress__status', {
                        'dsb-button-progress__status--show': isFinished,
                    })}
                    $isVisible={isFinished}
                >
                    <S.StatusIcon
                        className={S.getStatusIconClassName(size)}
                        translate="no"
                        aria-hidden="true"
                        $size={size}
                    >
                        {statusIcon}
                    </S.StatusIcon>
                </S.Status>

                <S.Content
                    className={classNames('dsb-button-progress__content', {
                        'dsb-button-progress__content--hide': isFinished,
                    })}
                    $isHidden={isFinished}
                >
                    {startIcon && (
                        <S.StartIcon className="dsb_button-start-icon">
                            {normalizeButtonIcon(startIcon)}
                        </S.StartIcon>
                    )}
                    {children}
                    {endIcon && (
                        <S.EndIcon className="dsb_button-end-icon">
                            {normalizeButtonIcon(endIcon)}
                        </S.EndIcon>
                    )}
                </S.Content>

                {settings && (
                    <S.ProgressSvg
                        viewBox={`0 0 ${settings.width + settings.strokeWidth} ${
                            settings.height + settings.strokeWidth
                        }`}
                        preserveAspectRatio="none"
                        className="dsb-button-progress__svg"
                        role="progressbar"
                        aria-busy={loadingState === 'loading'}
                        aria-hidden={loadingState === 'default'}
                    >
                        <S.ProgressSvgPath
                            className={classNames(
                                'dsb-button-progress__svg-path',
                                `dsb-button-progress__svg-path--${loadingState}`,
                                {
                                    'dsb-button-progress__svg-path--indeterminate-loading':
                                        !determinateMode && loadingState === 'loading',
                                },
                            )}
                            d={pathDefinition}
                            pathLength={100}
                            stroke={strokeColor}
                            strokeDasharray={100}
                            strokeDashoffset={100 - internalProgress}
                            $loadingState={loadingState}
                            $isIndeterminateLoading={!determinateMode && loadingState === 'loading'}
                        />
                    </S.ProgressSvg>
                )}
            </S.ProgressButtonRoot>
        );
    },
);

ProgressButton.displayName = 'ProgressButton';
