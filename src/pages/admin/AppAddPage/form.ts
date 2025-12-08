import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    code: string;
    critical: number;
    owner: number;
    description: string;
    gitUrl: string;
    employees: number[];
};

export const getValidationSchema = () =>
    object().shape({
        name: string().required('Заполните поле'),
        code: string().required('Заполните поле'),
        critical: number().required('Заполните поле'),
        owner: number().required('Заполните поле'),
        description: string().default(''),
        gitUrl: string().default(''),
        employees: array().of(number().required()).default([]),
    });
