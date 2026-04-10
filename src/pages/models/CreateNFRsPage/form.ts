import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    description: string;
    rule: Array<number | null | undefined>;
    chapters: Array<number>;
    patterns: Array<number | null | undefined>;
};

export const validationSchema = object().shape({
    name: string().required('Название обязательно'),
    description: string().required('Описание обязательно'),
    rule: array().of(number().nullable()).defined(),
    chapters: array().of(number().nullable().required('Жизненная ситуация обязательна')).defined(),
    patterns: array().of(number().nullable()).defined(),
});
