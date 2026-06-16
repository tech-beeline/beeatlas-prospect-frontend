import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import type { TextAreaProps } from './types';
import * as S from './units';
import {
    classNames,
    createTextareaId,
    getHelperTextClassName,
    getMaxHeightStyle,
    getRootClassName,
    getTextareaClassName,
    getWrapperClassName,
    resolveTextAreaDefaults,
} from './utils';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            label,
            size,
            placeholder,
            className,
            id,
            textareaId,
            textareaClassName,
            fullWidth,
            error,
            helperText,
            disabled,
            autoHeight = false,
            dataTestId,
            maxHeight,
            helperPosition,
            onInput,
            ...props
        },
        ref,
    ) => {
        const defaults = resolveTextAreaDefaults({
            size,
            fullWidth,
            error,
            disabled,
            dataTestId,
            helperPosition,
            placeholder,
        });

        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const [resolvedTextareaId, setResolvedTextareaId] = useState(() =>
            createTextareaId(textareaId),
        );

        useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

        useEffect(() => {
            setResolvedTextareaId(createTextareaId(textareaId));
        }, [textareaId]);

        const calculateHeight = () => {
            if (!textareaRef.current) {
                return;
            }

            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        };

        useEffect(() => {
            if (!textareaRef.current) {
                return;
            }

            textareaRef.current.style.height = 'auto';

            if (autoHeight) {
                calculateHeight();
            }

            textareaRef.current.style.maxHeight = getMaxHeightStyle({
                maxHeight,
                size: defaults.size,
                label,
            });
        }, [autoHeight, label, maxHeight, defaults.size]);

        const handleClick = () => {
            textareaRef.current?.focus();
        };

        const handleInput: TextAreaProps['onInput'] = (event) => {
            onInput?.(event);

            if (autoHeight) {
                calculateHeight();
            }
        };

        return (
            <S.TextAreaWrapper
                data-testid={defaults.dataTestId}
                className={getWrapperClassName({
                    disabled: defaults.disabled,
                    showAbs: defaults.showAbs,
                })}
            >
                <div
                    id={id}
                    onClick={handleClick}
                    className={getRootClassName({
                        size: defaults.size,
                        error: defaults.error,
                        label,
                        fullWidth: defaults.fullWidth,
                        className,
                    })}
                >
                    <textarea
                        ref={textareaRef}
                        id={resolvedTextareaId}
                        data-testid={`${defaults.dataTestId}-textarea`}
                        disabled={defaults.disabled}
                        placeholder={defaults.placeholderValue}
                        onInput={handleInput}
                        className={getTextareaClassName({
                            size: defaults.size,
                            error: defaults.error,
                            label,
                            textareaClassName,
                        })}
                        aria-invalid={defaults.error}
                        {...props}
                    />

                    <div className="dsb_textarea-borders" />

                    {label && (
                        <label
                            htmlFor={resolvedTextareaId}
                            className="dsb_textarea-label"
                            data-testid={`${defaults.dataTestId}-label`}
                        >
                            {label}
                        </label>
                    )}

                    {defaults.showAbs && (
                        <div
                            className={getHelperTextClassName({
                                error: defaults.error,
                                showAbs: defaults.showAbs,
                            })}
                        >
                            {helperText}
                        </div>
                    )}
                </div>

                {defaults.showBlock && (
                    <div className="dsb_textarea-helper-text-block-wrapper">
                        <sup
                            className={classNames(
                                'dsb_textarea-helper-text',
                                defaults.error && 'dsb_textarea-helper-text--error',
                            )}
                        >
                            {helperText}
                        </sup>
                    </div>
                )}
            </S.TextAreaWrapper>
        );
    },
);

TextArea.displayName = 'TextArea';
