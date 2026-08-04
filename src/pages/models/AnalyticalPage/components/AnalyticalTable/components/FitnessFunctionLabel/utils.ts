import { IFitnessFunctionCalculationData } from 'api/product/types';

export const formatCellText = (fitnessFunction: IFitnessFunctionCalculationData) => {
    if (
        fitnessFunction.successDetail === 0 &&
        fitnessFunction.countDetail === 0 &&
        fitnessFunction.is_check === false
    ) {
        return '0/1';
    } else if (
        fitnessFunction.successDetail === 0 &&
        fitnessFunction.countDetail === 0 &&
        fitnessFunction.is_check === true
    ) {
        return '1/1';
    } else {
        return `${fitnessFunction.successDetail}/${fitnessFunction.countDetail}`;
    }
};
