import { useMutation, useQuery } from '@tanstack/react-query';

import { GATEWAY_SOLUTION_CHECKER_URL } from 'api/const';
import {
    getTCProgressForAssessment,
    getTCResultForAssessment,
    IStructureRequirement,
    postTCDataForAssessment,
} from 'api/projects';
import Api from 'utils/api/axiosWrapper';

export interface ITechnicalCapabilityCandidate {
    id: string;
    name: string;
    description: string;
    rationale: string;
    score: number;
    frIds: string[];
}

export interface ICatalogTechnicalCapability {
    id: string;
    code: string;
    name: string;
    description: string;
    relevance: number;
    systems: string[];
    origin?: 'manual';
    system?: ISystem;
    parentBc?: { code: string; name: string; description?: string };
}

export interface ICatalogBusinessCapability {
    id: string;
    code: string;
    name: string;
    relevance: number;
    technicalCapabilities: ICatalogTechnicalCapability[];
}

export interface ICatalogCandidate extends ITechnicalCapabilityCandidate {
    systems: string[];
    matches: ICatalogBusinessCapability[];
}

export interface ICatalogEntry {
    code: string;
    name: string;
    description: string;
    score: number;
}
export interface ISystem {
    code: string;
    name: string;
    description?: string;
}
interface ILandscapeResult {
    results: {
        candidate_name: string;
        bcs: (ICatalogEntry & {
            tcs: (ICatalogEntry & { system_code: string | null; system_name: string | null })[];
        })[];
    }[];
}
interface IProgress {
    done: boolean;
    error: string | null;
    current_tc: number;
    total_tc: number;
    current_bc: number;
    total_bc: number;
}
export const useStartTechnicalCandidatesMutation = () =>
    useMutation({
        mutationFn: async (params: {
            requirements: IStructureRequirement[];
            taskDescription: string;
        }) => {
            const { data } = await postTCDataForAssessment({
                structured_requirements: params.requirements,
                task_description: params.taskDescription,
                business_capabilities: [],
            });
            return { taskId: data.task_id };
        },
    });
export const useGetTechnicalCandidatesProgressQuery = (
    taskId?: string | number | null,
    enabled = false,
) =>
    useQuery({
        queryKey: ['assessment', 'tc', 'progress', taskId],
        queryFn: async () => {
            const { data } = await getTCProgressForAssessment(taskId!);
            if (data.error) throw new Error(data.error);
            return {
                ...data,
                progress: data.done
                    ? 100
                    : Math.min(
                          95,
                          Math.round((100 * data.current_chunk) / Math.max(1, data.total_chunks)),
                      ),
            };
        },
        enabled: !!taskId && enabled,
        retry: false,
        refetchInterval: (q) => (q.state.error || q.state.data?.done ? false : 2000),
    });
export const useGetTechnicalCandidatesResultQuery = (
    taskId?: string | number | null,
    enabled = false,
) =>
    useQuery({
        queryKey: ['assessment', 'tc', 'result', taskId],
        queryFn: async () => {
            const { data } = await getTCResultForAssessment(taskId!);
            return {
                candidates: data.candidates.map((tc, index) => ({
                    ...tc,
                    id: `${taskId}-${index}`,
                    frIds: tc.fr_ids,
                    score: Math.round((tc.score ?? 0) * 100),
                })),
            };
        },
        enabled: !!taskId && enabled,
        retry: false,
    });
export const useStartCatalogAnalysisMutation = () =>
    useMutation({
        mutationFn: async (params: { candidates: ITechnicalCapabilityCandidate[] }) => {
            const { data } = await Api.post({
                url: `${GATEWAY_SOLUTION_CHECKER_URL}landscape/analyze/start`,
                data: {
                    candidates: params.candidates.map(({ name, description }) => ({
                        name,
                        description,
                    })),
                },
            });
            return { taskId: data.task_id as string };
        },
    });
export const useGetCatalogAnalysisProgressQuery = (
    taskId?: string | number | null,
    enabled = false,
) =>
    useQuery({
        queryKey: ['assessment', 'catalog', 'progress', taskId],
        queryFn: async () => {
            const { data }: { data: IProgress } = await Api.get({
                url: `${GATEWAY_SOLUTION_CHECKER_URL}landscape/analyze/${taskId}/progress`,
            });
            if (data.error) throw new Error(data.error);
            return {
                ...data,
                progress: data.done
                    ? 100
                    : Math.min(
                          95,
                          Math.round(
                              (100 *
                                  (data.current_tc +
                                      data.current_bc / Math.max(1, data.total_bc))) /
                                  Math.max(1, data.total_tc),
                          ),
                      ),
            };
        },
        enabled: !!taskId && enabled,
        retry: false,
        refetchInterval: (q) => (q.state.error || q.state.data?.done ? false : 2000),
    });
export const useGetCatalogAnalysisResultQuery = (
    taskId?: string | number | null,
    enabled = false,
) =>
    useQuery({
        queryKey: ['assessment', 'catalog', 'result', taskId],
        queryFn: async () => {
            const { data }: { data: ILandscapeResult } = await Api.get({
                url: `${GATEWAY_SOLUTION_CHECKER_URL}landscape/analyze/${taskId}/result`,
            });
            return {
                candidates: data.results.map((result) => ({
                    name: result.candidate_name,
                    matches: result.bcs.map((bc) => ({
                        id: bc.code,
                        code: bc.code,
                        name: bc.name,
                        relevance: Math.round(bc.score * 100),
                        technicalCapabilities: bc.tcs.map((tc) => ({
                            id: tc.code,
                            code: tc.code,
                            name: tc.name,
                            description: tc.description,
                            relevance: Math.round(tc.score * 100),
                            systems: tc.system_code ? [tc.system_code] : [],
                            system: tc.system_code
                                ? { code: tc.system_code, name: tc.system_name || tc.system_code }
                                : undefined,
                            parentBc: { code: bc.code, name: bc.name, description: bc.description },
                        })),
                    })),
                })),
            };
        },
        enabled: !!taskId && enabled,
        retry: false,
    });
export const useAssessmentSystemsQuery = () =>
    useQuery({
        queryKey: ['assessment', 'systems'],
        queryFn: async () => {
            const { data }: { data: { systems: ISystem[] } } = await Api.get({
                url: `${GATEWAY_SOLUTION_CHECKER_URL}tc/systems`,
            });
            return data.systems;
        },
    });
export const useAssessmentBcQuery = (query: string) =>
    useQuery({
        queryKey: ['assessment', 'bc-search', query],
        queryFn: async () => {
            const { data }: { data: { results: ICatalogEntry[] } } = await Api.post({
                url: `${GATEWAY_SOLUTION_CHECKER_URL}landscape/bc/search`,
                data: { query },
            });
            return data.results;
        },
        enabled: !!query.trim(),
    });
export interface IPublishAssessment {
    title: string;
    source: string;
    source_url?: string;
    structured_requirements: IStructureRequirement[];
    impact_tcs: unknown[];
    task_description: string;
    impact_level: string;
    page_title?: string;
    parent_page_url?: string;
    pat?: string;
}
export const usePublishAssessmentMutation = () =>
    useMutation({
        mutationFn: async (data: IPublishAssessment): Promise<{ confluence_url: string }> =>
            (await Api.post({ url: `${GATEWAY_SOLUTION_CHECKER_URL}publish/confluence`, data }))
                .data,
    });
export const useExportAssessmentMutation = () =>
    useMutation({
        mutationFn: async (data: IPublishAssessment): Promise<Blob> =>
            (
                await Api.post({
                    url: `${GATEWAY_SOLUTION_CHECKER_URL}publish/export`,
                    data,
                    responseType: 'blob',
                })
            ).data,
    });
