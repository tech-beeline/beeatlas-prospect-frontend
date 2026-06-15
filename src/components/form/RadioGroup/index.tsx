import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Radio } from 'components/ui';

import { IRadioGroup } from './types';

export const RadioGroup: FC<IRadioGroup> = ({ name, options, disabled }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={0}
            render={({ field }) => (
                <>
                    {options.map((option) => (
                        <Radio
                            key={option.id}
                            label={option.label}
                            disabled={disabled}
                            checked={option.id === field.value}
                            onChange={() => field.onChange(option.id)}
                        />
                    ))}
                </>
            )}
        />
    );
};
