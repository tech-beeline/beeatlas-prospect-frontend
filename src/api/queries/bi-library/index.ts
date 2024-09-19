import { useQuery } from '@tanstack/react-query';

import { getBIChannels, getBIFeelings, getBIParticipants, getBIStatuses } from 'api/bi-library';

const BI_LIBRARY_PREFIX = 'BI_LIBRARY_PREFIX';

export const useGetBIStatusesQuery = () => {
    return useQuery({
        queryKey: [BI_LIBRARY_PREFIX, 'status'],
        queryFn: () => getBIStatuses().then((res) => res.data),
    });
};

export const useGetBIChannelsQuery = () => {
    return useQuery({
        queryKey: [BI_LIBRARY_PREFIX, 'channel'],
        queryFn: () => getBIChannels().then((res) => res.data),
    });
};

export const useGetBIFeelingsQuery = () => {
    return useQuery({
        queryKey: [BI_LIBRARY_PREFIX, 'feeling'],
        queryFn: () => getBIFeelings().then((res) => res.data),
    });
};

export const useGetBIParticipantsQuery = () => {
    return useQuery({
        queryKey: [BI_LIBRARY_PREFIX, 'participants'],
        queryFn: () => getBIParticipants().then((res) => res.data),
    });
};
