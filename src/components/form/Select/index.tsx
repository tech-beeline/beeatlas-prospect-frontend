import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select as DesignSystemSelect } from '@beeline/design-system-react';
import get from 'lodash/get';

import { ISelect } from './types';

export const Select: FC<ISelect> = ({
    name,
    label,
    options,
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
            defaultValue={0}
            render={({ field }) => (
                <DesignSystemSelect
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage}
                    options={options}
                    values={[options.find((option) => option.id === field.value) ?? options[0]]}
                    onChange={(value) => field.onChange(value[0].id)}
                />
            )}
        />
    );
};
