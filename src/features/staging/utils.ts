export const getPipelineRunDurationMs = (startedAt: string, completedAt: string | null): number => {
    const startMs = new Date(startedAt).getTime();
    const endMs = completedAt ? new Date(completedAt).getTime() : Date.now();

    return endMs - startMs;
};
