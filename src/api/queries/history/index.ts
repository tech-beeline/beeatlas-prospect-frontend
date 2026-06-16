import { useQuery } from '@tanstack/react-query';

import {
    getBusinessCapabilityVersions,
    getBusinessCapabilityVersionsComparsion,
    getTechCapabilityVersions,
    getTechCapabilityVersionsComparsion,
} from 'api/history';

import { IBusinessCapabilityVersion, ITechCapabilityVersion } from '../../history/types';

const HISTORY_PREFIX = 'HISTORY_PREFIX';

export const useGetCapabilityVersionsQuery = (
    capabilityId: string,
    capabilityType: 'BUSINESS' | 'TECH',
) => {
    return useQuery({
        queryKey: [HISTORY_PREFIX, 'CAPABILITY', 'VERSIONS', capabilityId],
        queryFn: () =>
            capabilityType === 'BUSINESS'
                ? getBusinessCapabilityVersions(capabilityId).then((res) => res.data)
                : getTechCapabilityVersions(capabilityId).then((res) => res.data),
    });
};

interface IBusinessCapabilityComparsionParams {
    capabilityId: string;
    version: number;
    otherVersion?: number;
    enabled: boolean;
}

export const useGetBusinessCapabilityVersionsComparsionQuery = (
    params: IBusinessCapabilityComparsionParams,
) => {
    const { capabilityId, version, otherVersion, enabled } = params;
    return useQuery<IBusinessCapabilityVersion[]>({
        queryKey: [
            HISTORY_PREFIX,
            'BUSINESS_CAPABILITY',
            'COMPARSION',
            capabilityId,
            version,
            otherVersion,
        ],
        queryFn: () =>
            getBusinessCapabilityVersionsComparsion(capabilityId, version, otherVersion).then(
                (res) => res.data,
            ),
        enabled,
    });
};

interface ITechCapabilityComparsionParams {
    capabilityId: string;
    version: number;
    otherVersion?: number;
    enabled: boolean;
}

export const useGetTechCapabilityVersionsComparsionQuery = (
    params: ITechCapabilityComparsionParams,
) => {
    const { capabilityId, version, otherVersion, enabled } = params;
    return useQuery<ITechCapabilityVersion[]>({
        queryKey: [
            HISTORY_PREFIX,
            'TECH_CAPABILITY',
            'COMPARSION',
            capabilityId,
            version,
            otherVersion,
        ],
        queryFn: () =>
            getTechCapabilityVersionsComparsion(capabilityId, version, otherVersion).then(
                (res) => res.data,
            ),
        enabled,
    });
};
