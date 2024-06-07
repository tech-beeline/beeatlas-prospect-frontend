import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    categories: number[];
    sector: number;
    ring: number;
    link: string;
    comment: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните поле'),
    categories: array().of(number().default(0)).default([]),
    sector: number().required('Заполните поле'),
    ring: number().required('Заполните поле'),
    link: string().default('').url('Укажите корректную ссылку'),
    comment: string().default(''),
});
