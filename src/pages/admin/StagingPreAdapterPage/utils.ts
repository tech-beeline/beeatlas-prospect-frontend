import { IPipileneRun, PipelineStatuses } from 'api/staging-service/types';

export const getChildPipelineStats = (pipelineRun?: IPipileneRun | null) => {
    if (!pipelineRun) {
        return null;
    }

    const childPipilinesCount = pipelineRun?.childStatsSnapshot.reduce(
        (acc, v) => acc + v.count,
        0,
    );
    const successCount =
        pipelineRun?.childStatsSnapshot.find((v) => v.status === PipelineStatuses.COMPLETED)
            ?.count ?? 0;
    const inProgressCount =
        pipelineRun?.childStatsSnapshot
            .filter(
                (v) => ![PipelineStatuses.COMPLETED, PipelineStatuses.FAILED].includes(v.status),
            )
            .reduce((acc, v) => acc + v.count, 0) ?? 0;
    const errorCount =
        pipelineRun?.childStatsSnapshot.find((v) => v.status === PipelineStatuses.FAILED)?.count ??
        0;

    return {
        total: childPipilinesCount,
        success: successCount,
        progress: inProgressCount,
        error: errorCount,
    };
};
