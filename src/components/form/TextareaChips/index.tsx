import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TextareaChips as UiTextareaChips } from 'components/ui/TextareaChips';

import { FormTextareaChipsProps } from './types';

export const TextareaChips: FC<FormTextareaChipsProps> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field, fieldState }) => (
                <UiTextareaChips
                    {...props}
                    {...field}
                    value={field.value ?? []}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message ?? props.helperText}
                />
            )}
        />
    );
};
