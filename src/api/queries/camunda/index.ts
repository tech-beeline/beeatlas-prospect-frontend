import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getProcessById,
    getProcessesByCmdb,
    getProcessStatus,
    startProcess,
    uploadWorkspaceDSLFile,
    uploadWorkspaceJSONFile,
} from 'api/camunda';
import { getWorkspaceValidationByDocId } from 'api/graph';

const CAMUNDA_PREFIX = 'CAMUNDA_PREFIX';

export const useGetProcessesByCmdbQuery = (cmdb: string | null | undefined) => {
    return useQuery({
        queryKey: [CAMUNDA_PREFIX, 'byCmdb', cmdb],
        queryFn: () =>
            getProcessesByCmdb(cmdb!).then((res) =>
                res.data.sort(
                    (a, b) =>
                        new Date(b.status.createdDate).getTime() -
                        new Date(a.status.createdDate).getTime(),
                ),
            ),
        enabled: !!cmdb,
        refetchInterval: 10 * 1000,
    });
};

export const useGetProcessesById = (
    id: string | null | undefined,
    enabled?: boolean,
    refetchInterval?: number | false,
) => {
    return useQuery({
        queryKey: [CAMUNDA_PREFIX, 'byId', id],
        queryFn: () => getProcessById(id!).then((res) => res.data),
        enabled: !!id && (enabled ?? true),
        refetchInterval,
    });
};

export const useGetProcessesStatus = (id: number, enabled?: boolean) => {
    return useQuery({
        queryKey: [CAMUNDA_PREFIX, id],
        queryFn: () => getProcessStatus(id!).then((res) => res.data),
        enabled: !!id && (enabled ?? true),
    });
};

interface ICreateProcessForm {
    file: File;
    cmdb: string;
}
export function useCreateProcessJSONMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAMUNDA_PREFIX, 'create', 'json'],
        mutationFn: async (params: ICreateProcessForm) => {
            const { docId } = await uploadWorkspaceJSONFile(params.file).then((res) => res.data);
            const { valid } = await getWorkspaceValidationByDocId(docId).then((res) => res.data);
            if (valid) {
                const businessKey = `${params.cmdb}_${docId}_${Date.now()}`;
                await startProcess({
                    businessKey,
                    isSync: true,
                    variables: {
                        cmdb: { value: params.cmdb, type: 'String' },
                        docId: { value: String(docId), type: 'Integer' },
                    },
                });
                return businessKey;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAMUNDA_PREFIX] });
        },
    });
}

interface ICreateProcessDSLForm {
    workspace: string;
    cmdb: string;
}
export function useCreateProcessDSLMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAMUNDA_PREFIX, 'create', 'dsl'],
        mutationFn: async (params: ICreateProcessDSLForm) => {
            const { doc_id } = await uploadWorkspaceDSLFile({ workspace: params.workspace }).then(
                (res) => res.data,
            );
            const businessKey = `${params.cmdb}_${doc_id}_${Date.now()}`;
            await startProcess({
                businessKey,
                isSync: true,
                variables: {
                    cmdb: { value: params.cmdb, type: 'String' },
                    docId: { value: String(doc_id), type: 'Integer' },
                },
            });
            setTimeout(() => queryClient.invalidateQueries({ queryKey: [CAMUNDA_PREFIX] }), 1000);
            return businessKey;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAMUNDA_PREFIX] });
        },
    });
}

interface IRestartProcessForm {
    processId: number;
    cmdb: string;
}
export function useRestartProcessMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAMUNDA_PREFIX, 'restart'],
        mutationFn: async (params: IRestartProcessForm) => {
            const data = await getProcessById(params.processId).then((res) => res.data);
            const docId =
                data.context.find((c) => c.name === 'docId')?.value ??
                data.context.find((c) => c.name === 'doc_id')?.value;

            if (!docId) {
                throw new Error('Не найден документ для обновления данных');
            }

            const businessKey = `${params.cmdb}_${docId}_${Date.now()}`;
            await startProcess({
                businessKey,
                isSync: true,
                variables: {
                    cmdb: { value: params.cmdb, type: 'String' },
                    docId: { value: String(docId), type: 'Integer' },
                },
            });
            return businessKey;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAMUNDA_PREFIX] });
        },
    });
}
