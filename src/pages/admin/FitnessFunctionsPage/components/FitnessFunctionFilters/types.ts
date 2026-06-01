import { IFitnessFunctionData } from 'api/fitness-functions/types';

import { IFitnessFunctionsFilters } from '../../types';

export interface IFitnessFunctionFilters {
    fitnessFunctions: IFitnessFunctionData[];
    filterValues: IFitnessFunctionsFilters;
    setFilterValues: (filterValues: IFitnessFunctionsFilters) => void;
}
