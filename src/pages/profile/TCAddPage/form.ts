import { array, number, object, string } from 'yup';

export type FormValues = {
    product: number;
    name: string;
    description: string;
    bc: { id: number }[];
    status: number;
    version: string;
    dateFrom: string;
    dateTo: string;
};

export const validationSchema = object().shape({
    product: number().required('Выберите продукт'),
    name: string().required('Заполните название'),
    description: string().required('Заполните определение'),
    bc: array()
        .of(
            object().shape({
                id: number().required('Заполните поле'),
            }),
        )
        .default([]),
    status: number().default(0),
    version: string().default(''),
    dateFrom: string().default(''),
    dateTo: string().default(''),
});
