import { UseFormResetField } from 'react-hook-form';

import { ICriteriaForm, IMapCriteria } from 'api/maps/types';

import { CalculationMetricType, FormValues } from './form';

function isCalculationMetricType(value: string): value is CalculationMetricType {
    return value === 'continuous' || value === 'evaluative' || value === 'discrete';
}

export function mapCriteriaToFormValues(criteria: IMapCriteria): FormValues {
    const calculationMetric = isCalculationMetricType(criteria.type)
        ? criteria.type
        : ('continuous' as CalculationMetricType);

    const intervalStr = criteria.interval != null ? String(criteria.interval) : '';
    const thresholdStr = criteria.threshold != null ? String(criteria.threshold) : '';

    return {
        name: criteria.description ?? '',
        code: criteria.name ?? '',
        reverseAxis: criteria.revers,
        axisMin: criteria.minDesc ?? '',
        axisMax: criteria.maxDesc ?? '',
        calculationMetric,
        continuousInterval: calculationMetric === 'continuous' ? intervalStr : '',
        continuousStep: calculationMetric === 'continuous' ? thresholdStr : '',
        evaluativeInterval: calculationMetric === 'evaluative' ? intervalStr : '',
        discreteInterval: calculationMetric === 'discrete' ? intervalStr : '',
    };
}

export function formValuesToCriteriaForm(values: FormValues): ICriteriaForm {
    const { calculationMetric } = values;

    let interval: number;
    let threshold: number | null;

    switch (calculationMetric) {
        case 'continuous':
            interval = Number(values.continuousInterval);
            threshold = Number(values.continuousStep);
            break;
        case 'evaluative':
            interval = Number(values.evaluativeInterval);
            threshold = null;
            break;
        case 'discrete':
            interval = Number(values.discreteInterval);
            threshold = null;
            break;
    }

    return {
        name: values.code,
        description: values.name,
        type: calculationMetric,
        interval,
        threshold,
        revers: values.reverseAxis,
        minDesc: values.axisMin,
        maxDesc: values.axisMax,
    };
}

export const clearInactiveMetricFields = (
    active: CalculationMetricType,
    resetField: UseFormResetField<FormValues>,
) => {
    if (active !== 'continuous') {
        resetField('continuousInterval', { defaultValue: '' });
        resetField('continuousStep', { defaultValue: '' });
    }
    if (active !== 'evaluative') {
        resetField('evaluativeInterval', { defaultValue: '' });
    }
    if (active !== 'discrete') {
        resetField('discreteInterval', { defaultValue: '' });
    }
};
