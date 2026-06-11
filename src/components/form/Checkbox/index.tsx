import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox as UiCheckbox } from 'components/ui';

import { ICheckbox } from './types';

export const Checkbox: FC<ICheckbox> = ({ name, label, disabled = false }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <UiCheckbox disabled={disabled} label={label} checked={field.value} {...field} />
            )}
        />
    );
};
