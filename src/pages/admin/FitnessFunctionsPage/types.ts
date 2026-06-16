import { FitnessFunctionStatus, FitnessFunctionType } from 'features/fitness-functions';

export interface IFitnessFunctionsFilters {
    selectedFitnessFunctionId: number | null;
    type: FitnessFunctionType | null;
    status: FitnessFunctionStatus | null;
    isTrigger: boolean;
}
