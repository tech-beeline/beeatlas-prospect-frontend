import { object, string } from 'yup';

export type FormValues = {
    name: string;
    description: string;
    domain: string;
    owner: string;
    comment: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    description: string().required('Заполните определение'),
    domain: string().nullable().default('').required('Укажите родительскую возможность'),
    owner: string().default(''),
    comment: string().default(''),
});
