import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteTechnologyById,
    deleteTechnologyCategory,
    deleteTechnologyVersionById,
    getAllTechnologies,
    getTechDocumentationTypes,
    getTechFile,
    getTechnologyById,
    getTechnologyCategories,
    mergeTechnologyCategories,
    patchTechnology,
    patchTechnologyCategory,
    patchTechnologyVersions,
    postTechnology,
    postTechnologyCategory,
    postTechnologyVersions,
    uploadTechFile,
} from 'api/technologies';
import {
    ICategory,
    ICategoryForm,
    IMergeCategoriesForm,
    ITech,
    ITechForm,
    ITechVersionForm,
} from 'api/technologies/types';

const TECHNOLOGIES_PREFIX = 'TECHNOLOGIES_PREFIX';

export const useGetAllTechnologiesQuery = () => {
    return useQuery<ITech[]>({
        queryKey: [TECHNOLOGIES_PREFIX, 'tech'],
        queryFn: () => getAllTechnologies().then((res) => res.data),
    });
};

export const useGetTechnologyByIdQuery = (id: string | number | null) => {
    return useQuery({
        queryKey: [TECHNOLOGIES_PREFIX, 'tech', 'byId', id],
        queryFn: () => getTechnologyById(id!).then((res) => res.data),
        enabled: !!id,
    });
};

export const useGetTechnologiesForAdminPanelQuery = () => {
    return useQuery<ITech[]>({
        queryKey: [TECHNOLOGIES_PREFIX, 'admin', 'tech'],
        queryFn: () => getAllTechnologies(false).then((res) => res.data),
    });
};

interface ITechFormData {
    techData: ITech | undefined;
    allTech: ITech[];
}

export const useGetTechFormDataQuery = (id: string | undefined | null) => {
    return useQuery<ITechFormData>({
        queryKey: [TECHNOLOGIES_PREFIX, 'tech', id],
        queryFn: async () => {
            const data = await getAllTechnologies(false).then((res) => res.data);
            return { techData: data.find((tech) => tech.id === Number(id)), allTech: data };
        },
    });
};

export const useGetTechnologyCategoriesQuery = () => {
    return useQuery<ICategory[]>({
        queryKey: [TECHNOLOGIES_PREFIX, 'categories'],
        queryFn: () => getTechnologyCategories().then((res) => res.data),
    });
};

interface ICreateCategoryParams {
    data: ICategoryForm;
}

export function useCreateCategoryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'category', 'create'],
        mutationFn: (params: ICreateCategoryParams) => postTechnologyCategory(params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface IUpdateCategoryParams {
    id: string | number;
    data: ICategoryForm;
}

export function useUpdateCategoryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'category', 'update'],
        mutationFn: (params: IUpdateCategoryParams) =>
            patchTechnologyCategory(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

export function useDeleteCategoryMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'category', 'delete'],
        mutationFn: (id: string | number) => deleteTechnologyCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface IMergeCategoriesParams {
    data: IMergeCategoriesForm;
}

export function useMergeCategoriesMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'category', 'merge'],
        mutationFn: (params: IMergeCategoriesParams) => mergeTechnologyCategories(params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface ICreateTechnologyParams {
    data: Omit<ITechForm, 'id'>[];
}

export function useCreateTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'create'],
        mutationFn: (params: ICreateTechnologyParams) =>
            postTechnology(params.data).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface IUpdateTechnologyParams {
    data: ITechForm;
}

export function useUpdateTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'update'],
        mutationFn: (params: IUpdateTechnologyParams) =>
            patchTechnology(params.data.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

export function useDeleteTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'delete'],
        mutationFn: (id: string | number) => deleteTechnologyById(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface ICreateTechnologyVersionParams {
    technologyId: string | number;
    data: ITechVersionForm[];
}

export function useCreateTechnologyVersionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'create', 'version'],
        mutationFn: (params: ICreateTechnologyVersionParams) =>
            postTechnologyVersions(params.technologyId, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface IUpdateTechnologyVersionParams {
    technologyId: string | number;
    versionId: string | number;
    data: ITechVersionForm;
}

export function useUpdateTechnologyVersionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'update', 'version'],
        mutationFn: (params: IUpdateTechnologyVersionParams) =>
            patchTechnologyVersions(params.technologyId, params.versionId, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface IDeleteTechnologyVersionParams {
    techId: string | number;
    versionId: string | number;
}

export function useDeleteTechnologyVersionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'delete', 'version'],
        mutationFn: (params: IDeleteTechnologyVersionParams) =>
            deleteTechnologyVersionById(params.techId, params.versionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
}

interface IUploadFileParams {
    file: File;
    techId: number;
}
export const useUploadTechFileMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'upload'],
        mutationFn: async (params: IUploadFileParams) => {
            await uploadTechFile(params.file, params.techId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TECHNOLOGIES_PREFIX] });
        },
    });
};

export const useGetTechnologyFileByIdQuery = (id: string | number | null) => {
    return useQuery({
        queryKey: [TECHNOLOGIES_PREFIX, 'tech', 'file', id],
        queryFn: async () => {
            const docTypes = await getTechDocumentationTypes().then((res) => res.data);
            const docTypeId = docTypes[0].id;

            const techFile = await getTechFile(Number(id), docTypeId).then((res) => res);
            const fileName = techFile.headers['content-disposition']
                .split('filename=')[1]
                .replaceAll('"', '');

            return { file: techFile.data, fileName };
        },
        enabled: !!id,
    });
};
