import React, {
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import type { TextFieldProps } from './types';
import * as S from './units';
import {
    classNames,
    cloneCounter,
    createChangeHandler,
    createInputId,
    getInputClassName,
    getInputWrapperClassName,
    getLabelClassName,
    getValueLength,
    getWrapperClassName,
    resolveTextFieldDefaults,
    shouldShowMaxLengthCounter,
} from './utils';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            label,
            size,
            startAdornment,
            endAdornment,
            autoComplete,
            placeholder,
            className,
            id,
            inputId,
            inputClassName,
            wrapperClassName,
            fullWidth,
            error,
            helperText,
            disabled,
            dataTestId,
            helperPosition,
            isClickableAdornment,
            onChange,
            isShowCountOfValues,
            counter,
            isFocused,
            maxLength,
            disableMaxLength,
            value,
            ...props
        },
        ref,
    ) => {
        const defaults = resolveTextFieldDefaults({
            size,
            autoComplete,
            fullWidth,
            error,
            disabled,
            dataTestId,
            helperPosition,
            isClickableAdornment,
            placeholder,
        });

        const [resolvedInputId, setResolvedInputId] = useState(() => createInputId(inputId));
        const localRef = useRef<HTMLInputElement>(null);
        const [valueLength, setValueLength] = useState(() => getValueLength(value));

        useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

        useEffect(() => {
            setResolvedInputId(createInputId(inputId));
        }, [inputId]);

        useEffect(() => {
            if (value !== undefined) {
                setValueLength(getValueLength(value));
            }
        }, [value]);

        const handleChange = createChangeHandler({
            disabled: defaults.disabled,
            disableMaxLength,
            maxLength,
            onChange,
            setValueLength,
        });

        const classedCounter = cloneCounter({
            counter,
            size: defaults.size,
            label,
            value,
        });
        const showMaxLengthCounter = shouldShowMaxLengthCounter({ disableMaxLength, maxLength });
        const maxLengthCounter = showMaxLengthCounter ? (
            <span className="dsb_input-counter" data-testid="TextField-counter">
                {valueLength}/{maxLength}
            </span>
        ) : null;

        const renderAdornment = (
            adornment: TextFieldProps['startAdornment'],
            position: 'start' | 'end',
        ) => {
            if (!adornment) {
                return null;
            }

            return (
                <div
                    className={classNames(
                        'dsb_input-adornment',
                        `dsb_input-adornment--${position}`,
                    )}
                    style={{
                        pointerEvents: defaults.isClickableAdornment ? 'auto' : 'none',
                    }}
                    data-testid={`${defaults.dataTestId}-${
                        position === 'start' ? 'startAd' : 'endAd'
                    }`}
                >
                    {isValidElement(adornment)
                        ? cloneElement(adornment, {
                              size: defaults.size,
                              className: classNames(
                                  adornment.props.className,
                                  'dsb_input-adornment__item',
                              ),
                          })
                        : adornment}
                </div>
            );
        };

        return (
            <S.TextFieldRoot
                data-testid={defaults.dataTestId}
                id={id}
                className={getWrapperClassName({
                    fullWidth: defaults.fullWidth,
                    disabled: defaults.disabled,
                    className,
                    wrapperClassName,
                })}
            >
                <div
                    className={getInputWrapperClassName({
                        isFocused,
                        error: defaults.error,
                    })}
                >
                    <input
                        data-testid={`${defaults.dataTestId}-input`}
                        ref={localRef}
                        id={resolvedInputId}
                        disabled={defaults.disabled}
                        placeholder={defaults.placeholderValue}
                        maxLength={maxLength}
                        className={getInputClassName({
                            error: defaults.error,
                            size: defaults.size,
                            startAdornment,
                            endAdornment,
                            isFocused,
                            label,
                            inputClassName,
                        })}
                        aria-invalid={defaults.error}
                        onChange={handleChange}
                        value={value}
                        autoComplete={defaults.autoComplete}
                        {...props}
                    />

                    {isShowCountOfValues && classedCounter}

                    {label && (
                        <label
                            data-testid={`${defaults.dataTestId}-label`}
                            htmlFor={resolvedInputId}
                            className={getLabelClassName({
                                size: defaults.size,
                                startAdornment,
                                endAdornment,
                            })}
                        >
                            {label}
                        </label>
                    )}

                    {defaults.showAbs && (
                        <div className="dsb_input-helper-text-absolute-wrapper">
                            <sup className="dsb_input-helper-text">{helperText}</sup>
                            {showMaxLengthCounter && (
                                <div className="dsb_input-counter-wrapper">{maxLengthCounter}</div>
                            )}
                        </div>
                    )}

                    {renderAdornment(startAdornment, 'start')}
                    {renderAdornment(endAdornment, 'end')}
                </div>

                {defaults.showBlock && (
                    <div className="dsb_input-helper-text-block-wrapper">
                        <sup className="dsb_input-helper-text">{helperText}</sup>
                        {showMaxLengthCounter && (
                            <div className="dsb_input-counter-wrapper">{maxLengthCounter}</div>
                        )}
                    </div>
                )}
            </S.TextFieldRoot>
        );
    },
);

TextField.displayName = 'TextField';
