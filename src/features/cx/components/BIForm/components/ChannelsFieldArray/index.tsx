import React, { FC } from 'react';

import { MultiSelect } from 'components/form';

import { useGetBIChannelsQuery } from 'api/queries/bi-library';

import * as S from '../units';

export const ChannelsFieldArray: FC = () => {
    const { data, isLoading } = useGetBIChannelsQuery();

    const channelOptions = (data ?? []).map((channel) => ({
        id: channel.id,
        value: channel.name,
    }));

    return (
        <div>
            <S.SubTitle id="channels">Каналы</S.SubTitle>

            <MultiSelect
                fullWidth
                name="group"
                label="Канал"
                options={channelOptions}
                disabled={isLoading}
            />
        </div>
    );
};
