import { array, boolean, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    categories: number[];
    sector: number;
    ring: number;
    comment: string;
    isCritical: boolean;
};

export const getValidationSchema = (names: string[]) =>
    object().shape({
        name: string()
            .required('Заполните поле')
            .test(
                'unique',
                (field) => `Технология с именем ${field.value} уже существует`,
                (value) => !names.includes(value),
            ),
        categories: array().of(number().default(0)).default([]),
        sector: number().required('Заполните поле'),
        ring: number().required('Заполните поле'),
        comment: string().default(''),
        isCritical: boolean().default(true),
    });
