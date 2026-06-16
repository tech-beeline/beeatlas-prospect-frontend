import { object, string } from 'yup';

export type FormValues = {
    name: string;
    description: string;
    domain: string | null;
    owner: string;
    comment: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    description: string().required('Заполните определение'),
    domain: string().nullable().default(''),
    owner: string().default(''),
    comment: string().default(''),
});
