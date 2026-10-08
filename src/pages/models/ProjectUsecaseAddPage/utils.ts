import { IPipelineRunDetails, PipelineStatuses } from 'api/staging-service/types';

export const getPipelineFailureReason = (details: IPipelineRunDetails) => {
    const failedStage = [...details.stages]
        .reverse()
        .find(
            ({ status, failureReason }) =>
                status === PipelineStatuses.FAILED && Boolean(failureReason?.trim()),
        );

    return failedStage?.failureReason?.trim() ?? null;
};
