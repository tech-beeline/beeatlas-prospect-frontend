import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getProcessById,
    getProcessesByCmdb,
    startProcess,
    uploadWorkspaceDSLFile,
    uploadWorkspaceJSONFile,
} from 'api/camunda';

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
            await startProcess({
                businessKey: `${params.cmdb}_${docId}_${Date.now()}`,
                isSync: true,
                variables: {
                    cmdb: { value: params.cmdb, type: 'String' },
                    docId: { value: String(docId), type: 'Integer' },
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAMUNDA_PREFIX] });
        },
    });
}

export function useCreateProcessDSLMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [CAMUNDA_PREFIX, 'create', 'dsl'],
        mutationFn: async (params: ICreateProcessForm) => {
            const { docId } = await uploadWorkspaceDSLFile(params.file).then((res) => res.data);
            await startProcess({
                businessKey: `${params.cmdb}_${docId}_${Date.now()}`,
                isSync: true,
                variables: {
                    cmdb: { value: params.cmdb, type: 'String' },
                    docId: { value: String(docId), type: 'Integer' },
                },
            });
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
            const docId = data.context.find((c) => c.name === 'doc_id')?.value;

            if (docId) {
                await startProcess({
                    businessKey: `${params.cmdb}_${docId}_${Date.now()}`,
                    isSync: true,
                    variables: {
                        cmdb: { value: params.cmdb, type: 'String' },
                        docId: { value: String(docId), type: 'Integer' },
                    },
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAMUNDA_PREFIX] });
        },
    });
}
