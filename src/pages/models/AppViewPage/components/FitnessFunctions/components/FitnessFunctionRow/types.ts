import { IProductFitnessFunctions } from 'api/fitness-functions/types';

import { FitnessFunctionsTab } from '../../const';

export interface IFitnessFunctionRow {
    fitnessFunction: IProductFitnessFunctions;
    tab: FitnessFunctionsTab;
}
