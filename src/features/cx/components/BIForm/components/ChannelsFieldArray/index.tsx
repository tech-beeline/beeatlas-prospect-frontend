import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconButton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { useGetBIChannelsQuery } from 'api/queries/bi-library';

import { FormValues } from '../../form';
import * as S from '../units';

import { ChannelField } from './components';
import { IChannelsFieldArray } from './types';

export const ChannelsFieldArray: FC<IChannelsFieldArray> = ({ fullscreen = false }) => {
    const { data } = useGetBIChannelsQuery();

    const { control, watch } = useFormContext<FormValues>();

    const {
        fields: channelFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'channels',
    });

    const channels = watch('channels');

    const alreadySelectedChannels = channels?.map((channel) => channel.value) ?? [];

    const nextChannel =
        (data ?? []).find((option) => !alreadySelectedChannels.includes(option.id))?.id ?? 0;

    const handleAddClick = () => {
        append({ value: nextChannel }, { shouldFocus: false });
    };

    return (
        <div>
            <S.FlexContainer>
                <S.SubTitle id="channels">Каналы</S.SubTitle>
                {data && channelFields.length < data.length && !fullscreen && (
                    <IconButton iconName={Icons.Add} size="large" onClick={handleAddClick} />
                )}
            </S.FlexContainer>
            {channelFields.map((field, index) => (
                <div key={field.id}>
                    <ChannelField
                        options={data ?? []}
                        fullscreen={fullscreen}
                        index={index}
                        fieldsLength={channelFields.length}
                        add={handleAddClick}
                        remove={remove}
                        alreadySelected={alreadySelectedChannels}
                    />
                </div>
            ))}
        </div>
    );
};
