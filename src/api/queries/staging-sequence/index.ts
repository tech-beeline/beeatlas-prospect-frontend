import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getSequenceAlertById,
    getSequenceCallsById,
    getStagingSequenceBiStepByCode,
    getStagingSequenceBiSteps,
    getStagingSequenceCjTree,
    postSequenceAlertById,
} from 'api/staging-sequence';
import { IStagingSequenceAlertForm } from 'api/staging-sequence/types';

const STAGING_SEQUENCE_PREFIX = 'STAGING_SEQUENCE_PREFIX';

export const useGetStagingSequenceCjTreeQuery = () => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'CJ_TREE'],
        queryFn: () => getStagingSequenceCjTree().then((res) => res.data),
    });
};

export const useGetStagingSequenceBiStepsQuery = () => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'BI_STEPS'],
        queryFn: () => getStagingSequenceBiSteps().then((res) => res.data),
    });
};

export const useGetSequenceAlertByIdQuery = (uid: string) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'SEQUENCE_ALERT', uid],
        queryFn: () => getSequenceAlertById(uid).then((res) => res.data),
    });
};

interface IUsePostSequenceAlertByIdMutationParams {
    uid: string;
    data: IStagingSequenceAlertForm;
}
export const usePostSequenceAlertByIdMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [STAGING_SEQUENCE_PREFIX, 'SEQUENCE_ALERT', 'create'],
        mutationFn: (params: IUsePostSequenceAlertByIdMutationParams) =>
            postSequenceAlertById(params.uid, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [STAGING_SEQUENCE_PREFIX, 'SEQUENCE_ALERT'],
            });
        },
    });
};

export const useGetSequenceCallsByIdQuery = (uid: string) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'SEQUENCE_CALLS', uid],
        queryFn: () => getSequenceCallsById(uid).then((res) => res.data),
    });
};

export const useGetStagingSequenceBiStepByCodeQuery = (code: string | null | undefined) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'BI_STEP', code],
        queryFn: () => getStagingSequenceBiStepByCode(code!).then((res) => res.data),
        enabled: Boolean(code),
    });
};
