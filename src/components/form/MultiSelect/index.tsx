import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { Select as DesignSystemSelect } from 'components/ui';

import { IMultiSelect } from './types';

export const MultiSelect: FC<IMultiSelect> = ({
    name,
    label,
    options,
    disabled = false,
    fullWidth = true,
    defaultValue = [],
    filter = false,
    makeOption,
    autoFocus,
    onBlur,
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
                    multiple
                    filter={filter}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage}
                    options={options}
                    makeOption={makeOption}
                    values={options.filter((option) => field.value.includes(option.id))}
                    onChange={(value) => field.onChange(value.map((v) => v.id))}
                    autoFocus={autoFocus}
                    onBlur={(event) => {
                        field.onBlur();
                        onBlur?.(event);
                    }}
                />
            )}
        />
    );
};
