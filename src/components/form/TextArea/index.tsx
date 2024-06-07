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
                <DesignSystemTextArea
                    key={name}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    label={label}
                    error={isError}
                    helperText={errorMessage ?? helperText}
                    maxLength={maxLength}
                    {...field}
                />
            )}
        />
    );
};
