import { IPipelineChildRun } from 'api/staging-service/types';

export interface IChildPipelineRow {
    pipeline: IPipelineChildRun;
    preAdapterRunId: number | string | null;
    setSelectedPipeline: (pipeline: IPipelineChildRun) => void;
}
