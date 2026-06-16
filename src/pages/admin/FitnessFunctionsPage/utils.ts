import { getFitnessFunctionType } from 'features/fitness-functions';

import { IFitnessFunctionData } from 'api/fitness-functions/types';

import { IFitnessFunctionsFilters } from './types';

export const filterFitnessFunctions = (
    fitnessFunctions: IFitnessFunctionData[],
    filterValues: IFitnessFunctionsFilters,
) => {
    return fitnessFunctions.filter((ff) => {
        if (filterValues.selectedFitnessFunctionId) {
            return ff.id === filterValues.selectedFitnessFunctionId;
        }

        let flag = true;

        if (filterValues.type) {
            flag = getFitnessFunctionType(ff) === filterValues.type;
            if (!flag) return false;
        }
        if (filterValues.status) {
            flag = ff.status === filterValues.status;
            if (!flag) return false;
        }
        if (filterValues.isTrigger) {
            flag = ff.auxiliary_check === filterValues.isTrigger;
            if (!flag) return false;
        }
        return flag;
    });
};
