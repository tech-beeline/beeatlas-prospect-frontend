import { number, object } from 'yup';

export type FormValues = {
    rps: number;
    latency: number;
    errorRate: number;
};

export const validationSchema = object().shape({
    rps: number().required('Заполните RPS'),
    latency: number().required('Заполните RPS'),
    errorRate: number().required('Заполните RPS'),
});
