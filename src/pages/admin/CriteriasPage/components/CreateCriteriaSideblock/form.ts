import { boolean, object, string } from 'yup';

export type CalculationMetricType = 'continuous' | 'evaluative' | 'discrete';

export type FormValues = {
    name: string;
    code: string;
    reverseAxis: boolean;
    axisMin: string;
    axisMax: string;
    calculationMetric: CalculationMetricType;
    continuousInterval: string;
    continuousStep: string;
    evaluativeInterval: string;
    discreteInterval: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    code: string().required('Заполните код'),
    reverseAxis: boolean().required(),
    axisMin: string().required('Заполните минимальное значение'),
    axisMax: string().required('Заполните максимальное значение'),
    calculationMetric: string().oneOf(['continuous', 'evaluative', 'discrete']).required(),
    continuousInterval: string().when('calculationMetric', {
        is: 'continuous',
        then: (schema) => schema.required('Заполните интервал'),
        otherwise: (schema) => schema.optional(),
    }),
    continuousStep: string().when('calculationMetric', {
        is: 'continuous',
        then: (schema) => schema.required('Заполните шаг'),
        otherwise: (schema) => schema.optional(),
    }),
    evaluativeInterval: string().when('calculationMetric', {
        is: 'evaluative',
        then: (schema) => schema.required('Заполните интервал'),
        otherwise: (schema) => schema.optional(),
    }),
    discreteInterval: string().when('calculationMetric', {
        is: 'discrete',
        then: (schema) => schema.required('Заполните интервал'),
        otherwise: (schema) => schema.optional(),
    }),
});
