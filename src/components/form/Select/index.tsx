import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { Select as DesignSystemSelect } from 'components/ui';

import { ISelect } from './types';

export const Select: FC<ISelect> = ({
    name,
    label,
    options,
    disabled = false,
    fullWidth = true,
    defaultValue = 1,
    autoFocus,
    onBlur,
    helperText,
    ...rest
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
            defaultValue={defaultValue}
            render={({ field }) => (
                <DesignSystemSelect
                    {...rest}
                    autoFocus={autoFocus}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage ?? helperText}
                    options={options}
                    values={
                        defaultValue === null && field.value === null
                            ? []
                            : [options.find((option) => option.id === field.value) ?? options[0]]
                    }
                    onChange={(value) => field.onChange(value[0]?.id ?? null)}
                    onBlur={(event) => {
                        field.onBlur();
                        onBlur?.(event);
                    }}
                />
            )}
        />
    );
};
