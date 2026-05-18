import { CalculationMetricType, FormValues } from './form';

export const METRICS: Array<{
    id: CalculationMetricType;
    title: string;
    hint: string;
}> = [
    {
        id: 'continuous',
        title: 'Непрерывный',
        hint: 'Значение критерия — это числовая величина (сумма, процент, количество и т.д.), а оценка определяется тем, в какой интервал, заданный шагом, попадает это значение ',
    },
    {
        id: 'evaluative',
        title: 'Оценочный',
        hint: 'Значение отражает измеримый показатель (количество, доля и т.д.), а оценка — качественный уровень, который присваивается по заданному правилу',
    },
    {
        id: 'discrete',
        title: 'Дискретный',
        hint: 'Критерий оценивается по фиксированной балльной шкале, и набранный балл одновременно является и значением, и оценкой',
    },
];

export const emptyValues: FormValues = {
    name: '',
    code: '',
    reverseAxis: false,
    axisMin: '',
    axisMax: '',
    calculationMetric: 'continuous',
    continuousInterval: '',
    continuousStep: '',
    evaluativeInterval: '',
    discreteInterval: '',
};
