import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    description: string;
    docLink: string;
    nfr: Array<number | null | undefined>;
    patterns: Array<number | null | undefined>;
};

export const validationSchema = object().shape({
    name: string().required('Название обязательно'),
    description: string().required('Описание обязательно'),
    docLink: string().defined().default(''),
    nfr: array().of(number().nullable()).defined(),
    patterns: array().of(number().nullable()).defined(),
});
