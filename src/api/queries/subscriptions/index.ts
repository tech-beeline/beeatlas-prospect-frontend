import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSubscribedCapabilities } from 'api/capability';
import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import {
    deleteSubscription,
    getSubscribedInterfaces,
    getSubscribedPattern,
    getSubscriptionEntityTypes,
    getSubscriptions,
    postSubscription,
} from 'api/subscriptions';
import {
    IMultipleSubscriptionForm,
    ISubscription,
    ISubscriptionForm,
    SubscriptionType,
} from 'api/subscriptions/types';
import { getSubscribedTechnologies } from 'api/technologies';

const SUBSCRIPTIONS_PREFIX = 'SUBSCRIPTIONS_PREFIX';

export const useGetAllSubscriptionsQuery = () => {
    return useQuery<ISubscription[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'ALL'],
        queryFn: async () => {
            const subscriptions: ISubscription[] = [];

            const [
                businessCapabilitiesSubscriptions,
                techCapabilitiesSubscriptions,
                technologiesSubscriptions,
                patternsSubscriptions,
            ] = await Promise.all([
                getSubscribedCapabilities(CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY),
                getSubscribedCapabilities(CapabilitySearchResultTypeVariant.TECH_CAPABILITY),
                getSubscribedTechnologies(),
                getSubscribedPattern(),
            ]);

            subscriptions.push(
                ...businessCapabilitiesSubscriptions.data.map((sub) => ({
                    id: sub.id,
                    title: sub.name,
                    type: sub.isDomain
                        ? sub.parentId === null
                            ? SubscriptionType.GROUP
                            : SubscriptionType.DOMAIN
                        : SubscriptionType.BUSINESS_CAPABILITY,
                })),
            );

            subscriptions.push(
                ...techCapabilitiesSubscriptions.data.map((sub) => ({
                    id: sub.id,
                    title: sub.name,
                    type: SubscriptionType.TECH_CAPABILITY,
                })),
            );

            subscriptions.push(
                ...technologiesSubscriptions.data.map((sub) => ({
                    id: sub.id,
                    title: sub.label,
                    type: SubscriptionType.TECHNOLOGY,
                })),
            );

            subscriptions.push(
                ...patternsSubscriptions.data.map((sub) => ({
                    id: sub.id,
                    title: sub.name,
                    type: SubscriptionType.PATTERN,
                })),
            );

            return subscriptions;
        },
    });
};

export const useGetSubscribedBusinessCapabilitiesIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'BUSINESS_CAPABILITY_IDS'],
        queryFn: async () => {
            const businessCapabilitiesSubscriptions = await getSubscribedCapabilities(
                CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY,
            );

            return businessCapabilitiesSubscriptions.data.map((sub) => sub.id);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export const useGetSubscribedTechCapabilitiesIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'TECH_CAPABILITY_IDS'],
        queryFn: async () => {
            const techCapabilitiesSubscriptions = await getSubscribedCapabilities(
                CapabilitySearchResultTypeVariant.TECH_CAPABILITY,
            );

            return techCapabilitiesSubscriptions.data.map((sub) => sub.id);
        },

        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export const useGetSubscribedTechnologiesIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'TECHNOLOGY_IDS'],
        queryFn: async () => {
            const techCapabilitiesSubscriptions = await getSubscribedTechnologies();

            return techCapabilitiesSubscriptions.data.map((sub) => sub.id);
        },

        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export const useGetSubscribedPatternIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'PATTERN_IDS'],
        queryFn: async () => {
            const patternsSubscriptions = await getSubscribedPattern();

            return patternsSubscriptions.data.map((sub) => sub.id);
        },

        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export const useGetSubscribedInerfacesIdsQuery = () => {
    return useQuery<number[]>({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'INTERFACE_IDS'],
        queryFn: async () => {
            const interfaceSubscriptions = await getSubscribedInterfaces();

            return interfaceSubscriptions.data.map((sub) => sub.id);
        },

        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export function useCreateSubscriptionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [SUBSCRIPTIONS_PREFIX, 'create'],
        mutationFn: (data: ISubscriptionForm) => postSubscription(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_PREFIX] });
        },
    });
}

export function useMultipleCreateSubscriptionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [SUBSCRIPTIONS_PREFIX, 'create'],
        mutationFn: async (data: ISubscriptionForm[]) => {
            const promises = data.map((sub) => postSubscription(sub));
            await Promise.all(promises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_PREFIX] });
        },
    });
}

export function useDeleteSubscriptionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [SUBSCRIPTIONS_PREFIX, 'delete'],
        mutationFn: (data: ISubscriptionForm) => deleteSubscription(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_PREFIX] });
        },
    });
}

export function useMultipleDeleteSubscriptionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [SUBSCRIPTIONS_PREFIX, 'delete'],
        mutationFn: async (data: IMultipleSubscriptionForm) => {
            const promises = data.ids.map((id) =>
                deleteSubscription({ entityType: data.entityType, id }),
            );
            await Promise.all(promises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_PREFIX] });
        },
    });
}

export const useGetSubscriptionEntityTypesQuery = () => {
    return useQuery({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'ENTITY_TYPES'],
        queryFn: () => getSubscriptionEntityTypes().then((res) => res.data),
    });
};

export const useGetSubscriptionsQuery = () => {
    return useQuery({
        queryKey: [SUBSCRIPTIONS_PREFIX, 'ALL', 'V2'],
        queryFn: () => getSubscriptions().then((res) => res.data),
    });
};
