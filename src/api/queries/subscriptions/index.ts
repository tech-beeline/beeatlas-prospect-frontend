import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSubscribedCapabilities } from 'api/capability';
import { CapabilitySearchResultTypeVariant } from 'api/capability/types';
import { deleteSubscription, postSubscription } from 'api/subscriptions';
import { ISubscription, ISubscriptionForm, SubscriptionType } from 'api/subscriptions/types';
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
            ] = await Promise.all([
                getSubscribedCapabilities(CapabilitySearchResultTypeVariant.BUSINESS_CAPABILITY),
                getSubscribedCapabilities(CapabilitySearchResultTypeVariant.TECH_CAPABILITY),
                getSubscribedTechnologies(),
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
