import { useQuery } from '@tanstack/react-query';

import { IPackage, IPackageWithParts } from 'api/imported-packages/types';

const PACKAGES_PREFIX = 'PACKAGES_PREFIX';

export const useGetPackagesQuery = () => {
    return useQuery<IPackage[]>({
        queryKey: [PACKAGES_PREFIX, 'ALL'],
        queryFn: () =>
            new Promise<IPackage[]>((res) => {
                setTimeout(() => {
                    res([
                        {
                            packageId: 1,
                            operation: 'Обновление',
                            status: 'success',
                            allParts: 1000,
                            sucsessParts: 900,
                            errorParts: 10,
                            processParts: 90,
                        },
                        {
                            packageId: 2,
                            operation: 'Операция',
                            status: 'error',
                            allParts: 1000,
                            sucsessParts: 0,
                            errorParts: 910,
                            processParts: 90,
                        },
                    ]);
                }, 500);
            }),
    });
};

export const useGetPackageWithPartsByIdQuery = (packageId: string | undefined | null) => {
    return useQuery<IPackageWithParts>({
        queryKey: [PACKAGES_PREFIX, 'parts', packageId],
        queryFn: () =>
            new Promise<IPackageWithParts>((res) => {
                setTimeout(() => {
                    res({
                        packageId: 1,
                        operation: 'Операция',
                        status: 'error',
                        parts: [
                            {
                                partId: 1,
                                partNum: 1,
                                status: 'error',
                                payload: 'payload',
                            },
                            {
                                partId: 2,
                                partNum: 2,
                                status: 'error',
                                payload: 'payload',
                            },
                            {
                                partId: 3,
                                partNum: 3,
                                status: 'error',
                                payload: `[
    {
        "partId": 0,
        "partNum": 0,
        "status": "string",
        "payload": "string"
    }
]`,
                            },
                        ],
                    });
                }, 500);
            }),
        enabled: Boolean(packageId),
    });
};
