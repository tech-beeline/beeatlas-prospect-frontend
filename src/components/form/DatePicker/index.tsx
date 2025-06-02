import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as DesignSystemDatePicker } from '@beeline/design-system-react';
import get from 'lodash/get';

import { IDatePicker } from './types';

export const DatePicker: FC<IDatePicker> = ({
    name,
    label,
    maxLength,
    id,
    disabled = false,
    fullWidth = true,
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
                <DesignSystemDatePicker
                    id={id}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage}
                    maxLength={maxLength}
                    {...field}
                />
            )}
        />
    );
};
