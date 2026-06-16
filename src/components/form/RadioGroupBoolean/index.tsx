import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Radio } from 'components/ui';

import { IRadioGroupBoolean } from './types';

export const RadioGroupBoolean: FC<IRadioGroupBoolean> = ({ name, disabled }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={true}
            render={({ field }) => (
                <>
                    <Radio
                        label="Да"
                        disabled={disabled}
                        checked={field.value === true}
                        onChange={() => field.onChange(true)}
                    />
                    <Radio
                        label="Нет"
                        disabled={disabled}
                        checked={field.value === false}
                        onChange={() => field.onChange(false)}
                    />
                </>
            )}
        />
    );
};
