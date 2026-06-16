import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getProcessById, getProcessesByCmdb } from 'api/camunda';
import {
    getAllFitnessFunctions,
    getCallResult,
    getProductFitnessFunctions,
    postFitnessFunctionStatus,
    putFitnessFunction,
    runFitnessFunction,
} from 'api/fitness-functions';
import { IFitnessFunctionForm } from 'api/fitness-functions/types';

const FITNESS_FUNCTIONS_PREFIX = 'FITNESS_FUNCTIONS_PREFIX';

export const useGetAllFitnessFunctionsQuery = () => {
    return useQuery({
        queryKey: [FITNESS_FUNCTIONS_PREFIX, 'ALL'],
        queryFn: () => getAllFitnessFunctions().then((res) => res.data),
    });
};

interface IPutFitnessFunctionMutation {
    code: string;
    data: IFitnessFunctionForm;
}
export const usePutFitnessFunctionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IPutFitnessFunctionMutation) => putFitnessFunction(data.code, data.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FITNESS_FUNCTIONS_PREFIX] });
        },
    });
};

interface IRunFitnessFunctionMutationParams {
    code: string;
    cmdb: string;
    useStructurizr: boolean;
}
export const useRunFitnessFunctionMutation = () => {
    return useMutation({
        mutationFn: async (data: IRunFitnessFunctionMutationParams) => {
            let docId: string | undefined;

            if (data.useStructurizr) {
                const processes = await getProcessesByCmdb(data.cmdb).then((res) => res.data);

                if (processes.length > 0) {
                    const latestProcess = processes.reduce((latest, process) =>
                        new Date(process.status.createdDate).getTime() >
                        new Date(latest.status.createdDate).getTime()
                            ? process
                            : latest,
                    );
                    const processData = await getProcessById(latestProcess.id).then(
                        (res) => res.data,
                    );
                    docId = processData.context.find((c) => c.name === 'doc_id')?.value;
                }
            }

            const result = await runFitnessFunction(data.code, data.cmdb, docId).then(
                (res) => res.data,
            );
            return result;
        },
    });
};

export const useGetCallResultQuery = (callId: string | undefined, refetch: boolean) => {
    return useQuery({
        queryKey: [FITNESS_FUNCTIONS_PREFIX, 'CALL_RESULT', callId],
        queryFn: () => getCallResult(callId!).then((res) => res.data),
        enabled: !!callId,
        refetchInterval: refetch ? 10000 : false,
    });
};

interface IPostFitnessFunctionStatusMutationParams {
    code: string;
    status: string;
}
export const usePostFitnessFunctionStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IPostFitnessFunctionStatusMutationParams) =>
            postFitnessFunctionStatus(data.code, data.status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FITNESS_FUNCTIONS_PREFIX] });
        },
    });
};

export const useGetProductFitnessFunctionsQuery = (cmdb: string | null, triggers?: boolean) => {
    return useQuery({
        queryKey: [FITNESS_FUNCTIONS_PREFIX, 'PRODUCT_FITNESS_FUNCTIONS', cmdb, triggers],
        queryFn: () => getProductFitnessFunctions(cmdb!, triggers).then((res) => res.data),
        enabled: !!cmdb,
    });
};
