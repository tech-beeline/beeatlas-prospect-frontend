import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createMessage,
    deleteSession,
    getAllUserSessions,
    getSessionByKey,
    getSessionHistory,
    postSession,
} from 'api/ai-chat';
import { IPostMessageForm, IPostSessionForm } from 'api/ai-chat/types';

const AI_CHAT_PREFIX = 'AI_CHAT_PREFIX';

export const useGetAllUserSessionsQuery = (userId: number, refetch: boolean) => {
    return useQuery({
        queryKey: [AI_CHAT_PREFIX, 'SESSIONS'],
        queryFn: () => getAllUserSessions(userId).then((res) => res.data),
        refetchInterval: refetch ? 5 * 1000 : false,
    });
};

export const useGetSessionByKeyQuery = (sessionKey: string) => {
    return useQuery({
        queryKey: [AI_CHAT_PREFIX, 'SESSION', sessionKey],
        queryFn: () => getSessionByKey(sessionKey).then((res) => res.data),
    });
};

export const useGetSessionHistoryQuery = (sessionKey: string | null) => {
    return useQuery({
        queryKey: [AI_CHAT_PREFIX, 'SESSION_HISTORY', sessionKey],
        queryFn: () => getSessionHistory(sessionKey!).then((res) => res.data),
        enabled: !!sessionKey,
    });
};

export const usePostSessionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IPostSessionForm) => postSession(data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [AI_CHAT_PREFIX, 'SESSIONS'] });
        },
    });
};

export const useDeleteSessionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (sessionKey: string) => deleteSession(sessionKey).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [AI_CHAT_PREFIX, 'SESSIONS'] });
        },
    });
};

export const usePostMessageMutation = (sessionKey: string | null) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IPostMessageForm) =>
            createMessage(sessionKey, data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [AI_CHAT_PREFIX, 'SESSIONS'] });
            queryClient.invalidateQueries({
                queryKey: [AI_CHAT_PREFIX, 'SESSION_HISTORY', sessionKey],
            });
        },
    });
};
