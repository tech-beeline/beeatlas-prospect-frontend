import { useMutation, useQuery, useQueryClient } from 'react-query';

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
    return useQuery<ITech[]>([TECHNOLOGIES_PREFIX, 'tech'], () =>
        getAllTechnologies().then((res) => res.data),
    );
};

interface ITechFormData {
    techData: ITech | undefined;
    allTech: ITech[];
}
export const useGetTechFormDataQuery = (id: string | undefined | null) => {
    return useQuery<ITechFormData>([TECHNOLOGIES_PREFIX, 'tech', id], async () => {
        const data = await getAllTechnologies().then((res) => res.data);
        return { techData: data.find((tech) => tech.id === Number(id)), allTech: data };
    });
};

export const useGetTechnologyCategoriesQuery = () => {
    return useQuery<ICategory[]>([TECHNOLOGIES_PREFIX, 'categories'], () =>
        getTechnologyCategories().then((res) => res.data),
    );
};

interface ICreateTechnologyParams {
    data: Omit<ITechForm, 'id'>;
}
export function useCreateTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [TECHNOLOGIES_PREFIX, 'create'],
        (params: ICreateTechnologyParams) => postTechnology([params.data]),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(TECHNOLOGIES_PREFIX);
            },
        },
    );
}

interface IUpdateTechnologyParams {
    data: ITechForm;
}
export function useUpdateTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [TECHNOLOGIES_PREFIX, 'update'],
        (params: IUpdateTechnologyParams) => patchTechnology([params.data]),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(TECHNOLOGIES_PREFIX);
            },
        },
    );
}

export function useDeleteTechnologyMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        [TECHNOLOGIES_PREFIX, 'delete'],
        (id: string | number) => deleteTechnologyById(id),
        {
            onSuccess: () => {
                void queryClient.invalidateQueries(TECHNOLOGIES_PREFIX);
            },
        },
    );
}
