import { useQuery } from 'react-query';

import { getBIChannels, getBIFeelings, getBIParticipants, getBIStatuses } from 'api/bi-library';

const BI_LIBRARY_PREFIX = 'BI_LIBRARY_PREFIX';

export const useGetBIStatusesQuery = () => {
    return useQuery([BI_LIBRARY_PREFIX, 'status'], () => getBIStatuses().then((res) => res.data));
};

export const useGetBIChannelsQuery = () => {
    return useQuery([BI_LIBRARY_PREFIX, 'channel'], () => getBIChannels().then((res) => res.data));
};

export const useGetBIFeelingsQuery = () => {
    return useQuery([BI_LIBRARY_PREFIX, 'feeling'], () => getBIFeelings().then((res) => res.data));
};

export const useGetBIParticipantsQuery = () => {
    return useQuery([BI_LIBRARY_PREFIX, 'participants'], () =>
        getBIParticipants().then((res) => res.data),
    );
};
