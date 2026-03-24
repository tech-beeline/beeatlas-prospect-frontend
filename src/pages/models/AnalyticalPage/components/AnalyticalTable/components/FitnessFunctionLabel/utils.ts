import { IFitnessFunctionCalculationData } from 'api/product/types';

export const formatCellText = (fitnessFunction: IFitnessFunctionCalculationData) => {
    if (
        fitnessFunction.countSuccess === 0 &&
        fitnessFunction.countAll === 0 &&
        fitnessFunction.isCheck === false
    ) {
        return '0/1';
    } else if (
        fitnessFunction.countSuccess === 0 &&
        fitnessFunction.countAll === 0 &&
        fitnessFunction.isCheck === true
    ) {
        return '1/1';
    } else {
        return `${fitnessFunction.countSuccess}/${fitnessFunction.countAll}`;
    }
};
