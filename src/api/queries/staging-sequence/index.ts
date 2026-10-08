import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getDashboardVersion,
    getSequenceAlertById,
    getSequenceCallsById,
    getStagingSequenceBiStepByCode,
    getStagingSequenceBiSteps,
    getStagingSequenceCjTree,
    patchE2E,
    postE2E,
    postPipelineRun,
    postSequenceAlertById,
} from 'api/staging-sequence';
import {
    IPatchE2EForm,
    IPipelineRunForm,
    IPostE2EForm,
    IStagingSequenceAlertForm,
} from 'api/staging-sequence/types';

import { toDashboardVersionStatus } from './utils';

export const STAGING_SEQUENCE_PREFIX = 'STAGING_SEQUENCE_PREFIX';

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

export const useGetSequenceAlertByIdQuery = (uid: string | null) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'SEQUENCE_ALERT', uid],
        queryFn: () => getSequenceAlertById(uid!).then((res) => res.data),
        enabled: !!uid,
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
            queryClient.invalidateQueries({
                queryKey: [STAGING_SEQUENCE_PREFIX, 'DASHBOARD_VERSION'],
            });
        },
    });
};

export const useGetDashboardVersionQuery = (pipelineCode: string, uid: string | null) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'DASHBOARD_VERSION', pipelineCode, uid],
        queryFn: () =>
            getDashboardVersion(pipelineCode, uid!).then((res) =>
                toDashboardVersionStatus(res.data),
            ),
        enabled: !!uid,
    });
};

interface IUsePostPipelineRunMutationParams {
    code: string;
    data: IPipelineRunForm;
}
export const usePostPipelineRunMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [STAGING_SEQUENCE_PREFIX, 'PIPELINE_RUN', 'create'],
        mutationFn: (params: IUsePostPipelineRunMutationParams) =>
            postPipelineRun(params.code, params.data),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [STAGING_SEQUENCE_PREFIX, 'DASHBOARD_VERSION'],
            });
        },
    });
};

export const useGetSequenceCallsByIdQuery = (uid: string | null) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'SEQUENCE_CALLS', uid],
        queryFn: () => getSequenceCallsById(uid!).then((res) => res.data),
        enabled: !!uid,
    });
};

export const useGetStagingSequenceBiStepByCodeQuery = (code: string | null | undefined) => {
    return useQuery({
        queryKey: [STAGING_SEQUENCE_PREFIX, 'BI_STEP', code],
        queryFn: () => getStagingSequenceBiStepByCode(code!).then((res) => res.data),
        enabled: Boolean(code),
    });
};

interface IPostE2EMutationParams {
    data: IPostE2EForm;
    source: string;
}
export const usePostE2EMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [STAGING_SEQUENCE_PREFIX, 'E2E', 'create'],
        mutationFn: (params: IPostE2EMutationParams) => postE2E(params.data, params.source),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [STAGING_SEQUENCE_PREFIX],
            });
        },
    });
};

interface IPatchE2EParams {
    code: string;
    data: IPatchE2EForm;
}
export const usePatchE2EMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [STAGING_SEQUENCE_PREFIX, 'E2E', 'create'],
        mutationFn: (params: IPatchE2EParams) => patchE2E(params.code, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [STAGING_SEQUENCE_PREFIX],
            });
        },
    });
};
