import { object, string } from 'yup';

export type FormValues = {
    rps: string;
    latency: string;
    errorRate: string;
};

export const validationSchema = object().shape({
    rps: string().default(''),
    latency: string().default(''),
    errorRate: string().default(''),
});
