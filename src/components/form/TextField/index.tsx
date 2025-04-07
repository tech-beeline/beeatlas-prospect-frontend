import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField as DesignSystemTextField } from '@beeline/design-system-react';
import get from 'lodash/get';

import { ITextField } from './types';

export const TextField: FC<ITextField> = ({
    name,
    label,
    maxLength,
    id,
    disabled = false,
    fullWidth = true,
    helperPosition = 'absolute',
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
                <DesignSystemTextField
                    id={id}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage}
                    helperPosition={errorMessage ? helperPosition : 'absolute'}
                    maxLength={maxLength}
                    {...field}
                />
            )}
        />
    );
};
