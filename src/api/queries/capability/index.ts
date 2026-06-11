import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteBusinessCapabilityByCode,
    deleteTechCapabilityByCode,
    getBusinessCapabilityById,
    getBusinessCapabilityChildren,
    getBusinessCapabilityDomains,
    getCapabilitiesByProductId,
    getCapabilitiesBySearch,
    getCoreBusinessCapabilities,
    getMapData,
    getPromtByAlias,
    getTechCapabilityById,
    postDescriptionByPromt,
    putBusinessCapability,
} from 'api/capability';
import { CapabilitySearchVariant, IBusinessCapabilityForm } from 'api/capability/types';

const CAPABILITY_PREFIX = 'CAPABILITY_PREFIX';

interface IGetCapabilitiesParams {
    search: string;
    searchVariant?: CapabilitySearchVariant;
}
export const useGetCapabilitiesQuery = (params: IGetCapabilitiesParams) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'ALL', params],
        queryFn: () =>
            getCapabilitiesBySearch(params.search, params.searchVariant).then((res) => res.data),
        enabled: params.search !== '',
    });
};

interface IGetBusinessCapabilityDomainsParams {
    enabled: boolean;
}
export const useGetBusinessCapabilityDomainsQuery = (
    params: IGetBusinessCapabilityDomainsParams,
) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'DOMAINS', params],
        queryFn: () => getBusinessCapabilityDomains().then((res) => res.data),
        enabled: params.enabled,
    });
};

export function useCreateBusinessCapabilityMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAPABILITY_PREFIX, 'create'],
        mutationFn: (data: IBusinessCapabilityForm) => putBusinessCapability(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAPABILITY_PREFIX] });
        },
    });
}

export const useGetMapDataQuery = (id?: number, enabled = true) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'map', id],
        queryFn: () => getMapData(id).then((res) => res.data),
        enabled,
    });
};

export const useGetCoreCapabilitiesQuery = () => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'core'],
        queryFn: () => getCoreBusinessCapabilities().then((res) => res.data),
    });
};

export const useGetCapabilityByIdQuery = (id?: string | null) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'id', id],
        queryFn: () => getBusinessCapabilityById(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetCapabilityDescriptionQuery = (name: string) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'promt', name],
        queryFn: async () => {
            const res = await getPromtByAlias('bc_description_generate').then((res) => res.data);
            const resGeneration = await postDescriptionByPromt({
                messages: [
                    {
                        role: 'user',
                        content: res.promt.replace('<!!!>', name),
                    },
                ],
                model: res.model,
                stream: false,
            }).then((res) => res.data);

            const descriptionParsed = JSON.parse(
                resGeneration?.choices[0]?.message?.content
                    ?.replace('```json', '')
                    .replace('```', ''),
            )?.descr;

            if (descriptionParsed) {
                return descriptionParsed;
            } else {
                throw new Error();
            }
        },
        enabled: false,
    });
};

export const useGetChildrenCapabilitiesQuery = ({
    id,
    enabled,
    type,
}: {
    id: number;
    enabled: boolean;
    type?: string;
}) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, type, 'chdilren', id],
        queryFn: () => getBusinessCapabilityChildren(id).then((res) => res.data),
        enabled,
        gcTime: 0,
    });
};

export const useGetTechCapabilityByIdQuery = ({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'tech', 'parents', id],
        queryFn: () => getTechCapabilityById(id).then((res) => res.data),
        enabled,
    });
};

export const useGetTechCapabilitiesByProductIdQuery = (id: string | undefined | null) => {
    return useQuery({
        queryKey: [CAPABILITY_PREFIX, 'tech', 'byProduct', id],
        queryFn: () => getCapabilitiesByProductId(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export function useDeleteBusinessCapabilityMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAPABILITY_PREFIX, 'bc', 'delete'],
        mutationFn: (code: string) => deleteBusinessCapabilityByCode(code),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [CAPABILITY_PREFIX] });
        },
    });
}

export function useDeleteTechCapabilityMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAPABILITY_PREFIX, 'tc', 'delete'],
        mutationFn: (code: string) => deleteTechCapabilityByCode(code),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [CAPABILITY_PREFIX] });
        },
    });
}
