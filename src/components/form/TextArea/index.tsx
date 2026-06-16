import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { TextArea as UiTextArea } from 'components/ui';

import { ITextArea } from './types';

export const TextArea: FC<ITextArea> = ({
    name,
    label,
    maxLength,
    helperText,
    disabled = false,
    fullWidth = true,
    error: externalError,
    externalErrorMessage,
    helperPosition = 'absolute',
    autoFocus,
    onBlur,
    onKeyDown,
    ...rest
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const fieldError = get(errors, name);
    const fieldErrorMessage = fieldError?.message ? String(fieldError.message) : undefined;
    const isError = externalError ?? Boolean(fieldError);
    const finalHelperText = externalErrorMessage ?? fieldErrorMessage ?? helperText;
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <UiTextArea
                    {...field}
                    {...rest}
                    key={name}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={finalHelperText}
                    maxLength={maxLength}
                    helperPosition={finalHelperText ? helperPosition : 'absolute'}
                    autoFocus={autoFocus}
                    onBlur={(event) => {
                        field.onBlur();
                        onBlur?.(event);
                    }}
                    onKeyDown={onKeyDown}
                />
            )}
        />
    );
};
