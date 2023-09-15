import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio as DesignSystemRadio } from '@beeline/design-system-react';

import { IRadioGroup } from './types';

export const RadioGroup: FC<IRadioGroup> = ({ name, labels }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={0}
            render={({ field }) => (
                <>
                    {labels.map((label, index) => (
                        <DesignSystemRadio
                            key={label}
                            label={label}
                            checked={index === field.value}
                            onClick={() => field.onChange(index)}
                        />
                    ))}
                </>
            )}
        />
    );
};
