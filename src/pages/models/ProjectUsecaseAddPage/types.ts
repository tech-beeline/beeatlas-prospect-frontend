import { IProjectUsecasePipelineConnectionOperation } from 'api/staging-service/types';
import { ProjectUsecaseResolutionType } from 'api/usecase';

export enum UsecaseImportStep {
    DATA = 'DATA',
    RESULT = 'RESULT',
}

export interface IResolutionDraft {
    type: ProjectUsecaseResolutionType | null;
    productAlias: string | null;
    containerId: number | null;
    interfaceId: number | null;
    operationId: number | null;
}

export type IResolutionSelection =
    | {
          type: ProjectUsecaseResolutionType.EXISTING;
          productAlias: string;
          connectionOperation: IProjectUsecasePipelineConnectionOperation;
      }
    | {
          type: ProjectUsecaseResolutionType.NEW;
          productAlias: string;
      }
    | {
          type: ProjectUsecaseResolutionType.PLANNED;
      };
