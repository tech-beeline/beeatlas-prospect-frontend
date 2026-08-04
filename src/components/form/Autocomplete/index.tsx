import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import { Autocomplete as UIAutocomplete } from 'components/ui';

import { IAutocomplete } from './types';

export const Autocomplete: FC<IAutocomplete> = ({
    name,
    label,
    options,
    disabled = false,
    fullWidth = true,
    defaultValue = null,
    loading,
    loadingText,
    noOptionsText,
    onInputChange,
    helperText,
    makeOption,
    endIcon,
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
                <UIAutocomplete
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage ?? helperText}
                    options={options}
                    value={options.find((option) => option.id === field.value) ?? null}
                    noOptionsText={noOptionsText}
                    loading={loading}
                    loadingText={loadingText}
                    onChange={(value) => {
                        field.onChange(value.id);
                        onInputChange(value.value);
                    }}
                    onInputChange={(v) => {
                        onInputChange(v);
                        field.onChange(null);
                    }}
                    onInputClear={() => {
                        onInputChange('');
                        field.onChange(null);
                    }}
                    renderValue={(v) => v.value}
                    type="select"
                    makeOption={makeOption}
                    endAdornment={endIcon}
                />
            )}
        />
    );
};
