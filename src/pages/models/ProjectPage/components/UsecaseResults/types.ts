import { IProjectUsecaseSummaryDto } from 'api/usecase/types';

export interface IUsecaseResults {
    usecases: IProjectUsecaseSummaryDto[];
    onEdit: (usecaseId: number) => void;
    onCreate: () => void;
}
