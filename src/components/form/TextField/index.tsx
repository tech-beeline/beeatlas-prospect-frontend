import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { ITextField } from './types';
import * as S from './units';

export const TextField: FC<ITextField> = ({
    name,
    label,
    maxLength,
    id,
    disabled = false,
    fullWidth = true,
    helperPosition = 'absolute',
    autoFocus,
    onBlur,
    onKeyDown,
    type,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = get(errors, name);
    const errorMessage = error?.message ? String(error.message) : undefined;
    const isError = Boolean(error);
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <S.TextFieldStyled
                    {...field}
                    id={id}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage}
                    helperPosition={errorMessage ? helperPosition : 'absolute'}
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                    onBlur={(event) => {
                        field.onBlur();
                        onBlur?.(event);
                    }}
                    onKeyDown={onKeyDown}
                    type={type}
                />
            )}
        />
    );
};
