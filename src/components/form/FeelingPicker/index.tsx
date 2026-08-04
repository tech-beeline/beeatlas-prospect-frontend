import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FeelingTypes, IconFeeling } from 'components/other';
import { Radio } from 'components/ui';

import { IFeelingPicker } from './types';
import * as S from './units';

const feelingTypes = Object.keys(FeelingTypes);

export const FeelingPicker: FC<IFeelingPicker> = ({ name }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={2}
            render={({ field }) => (
                <S.Container>
                    {feelingTypes.map((type, i) => (
                        <S.IconContainer key={i}>
                            <IconFeeling
                                type={type as FeelingTypes}
                                onClick={() => field.onChange(i)}
                            />
                            <Radio checked={field.value === i} onClick={() => field.onChange(i)} />
                        </S.IconContainer>
                    ))}
                </S.Container>
            )}
        />
    );
};
