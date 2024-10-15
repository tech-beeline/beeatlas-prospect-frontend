import { useQuery } from '@tanstack/react-query';

import { getAllPackages, getPackageById } from 'api/imported-packages';
import { IPackageWithParts } from 'api/imported-packages/types';

const PACKAGES_PREFIX = 'PACKAGES_PREFIX';

interface IGetAllPackagesParams {
    page?: number;
    perPage?: number;
    status?: string;
}
export const useGetAllPackagesQuery = (params?: IGetAllPackagesParams) => {
    return useQuery({
        queryKey: [PACKAGES_PREFIX, 'ALL', params],
        queryFn: () =>
            getAllPackages(params?.page, params?.perPage, params?.status).then((res) => res.data),
    });
};

interface IGetPackageWithContentParams {
    id: string | undefined | null;
    page?: number;
    perPage?: number;
}
export const useGetPackageWithContentByIdQuery = (params: IGetPackageWithContentParams) => {
    return useQuery<IPackageWithParts>({
        queryKey: [PACKAGES_PREFIX, 'parts', params],
        queryFn: () =>
            getPackageById(params.id ?? '0', params.page, params.perPage).then((res) => res.data),
        enabled: Boolean(params.id),
    });
};
