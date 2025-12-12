import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextArea as DesignSystemTextArea } from '@beeline/design-system-react';
import get from 'lodash/get';

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
    helperPosition,
    autoFocus,
    onBlur,
    onKeyDown,
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
                <DesignSystemTextArea
                    {...field}
                    key={name}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={finalHelperText}
                    maxLength={maxLength}
                    helperPosition={helperPosition}
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
