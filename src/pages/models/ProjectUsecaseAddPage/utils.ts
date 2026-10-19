import { AxiosError } from 'axios';

import { IPipelineRunDetails, PipelineStatuses } from 'api/staging-service/types';

import { IRequestError } from './types';

export const getPipelineFailureReason = (details: IPipelineRunDetails) => {
    const failedStage = [...details.stages]
        .reverse()
        .find(
            ({ status, failureReason }) =>
                status === PipelineStatuses.FAILED && Boolean(failureReason?.trim()),
        );

    return failedStage?.failureReason?.trim() ?? null;
};

export const getRequestErrorMessage = (error: unknown, fallback: string) => {
    const requestError = error as AxiosError<IRequestError>;

    return (
        requestError.response?.data?.errorMessage ??
        requestError.response?.data?.message ??
        requestError.response?.data?.error ??
        (error instanceof Error ? error.message : fallback)
    );
};
