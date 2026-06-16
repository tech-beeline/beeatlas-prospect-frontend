import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    type: number;
    group: number[];
    tech: number[];
    description: string;
};

export const getValidationSchema = () =>
    object().shape({
        name: string().required('Заполните поле'),
        type: number().required('Заполните поле'),
        group: array()
            .of(number().default(0))
            .default([])
            .required('Заполните поле')
            .min(1, 'Заполните поле'),
        tech: array().of(number().default(0)).default([]).required('Заполните поле'),
        description: string().required('Заполните поле'),
    });
