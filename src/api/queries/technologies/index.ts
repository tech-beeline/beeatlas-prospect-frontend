import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    deleteTechnologyById,
    getAllTechnologies,
    getTechnologyCategories,
    patchTechnology,
    postTechnology,
} from 'api/technologies';
import { ICategory, ITech, ITechForm } from 'api/technologies/types';

const TECHNOLOGIES_PREFIX = 'TECHNOLOGIES_PREFIX';

export const useGetAllTechnologiesQuery = () => {
    return useQuery<ITech[]>({
        queryKey: [TECHNOLOGIES_PREFIX, 'tech'],
        queryFn: () => getAllTechnologies().then((res) => res.data),
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
            const data = await getAllTechnologies().then((res) => res.data);
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

interface ICreateTechnologyParams {
    data: Omit<ITechForm, 'id'>[];
}
export function useCreateTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [TECHNOLOGIES_PREFIX, 'create'],
        mutationFn: (params: ICreateTechnologyParams) => postTechnology(params.data),
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
        mutationFn: (params: IUpdateTechnologyParams) => patchTechnology([params.data]),
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
