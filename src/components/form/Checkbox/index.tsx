import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox as DesignSystemCheckbox } from '@beeline/design-system-react';

import { ICheckbox } from './types';

export const Checkbox: FC<ICheckbox> = ({ name, label, disabled = false }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <DesignSystemCheckbox
                    disabled={disabled}
                    label={label}
                    checked={field.value}
                    {...field}
                />
            )}
        />
    );
};
