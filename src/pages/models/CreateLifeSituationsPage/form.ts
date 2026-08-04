import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    description: string;
    docLink: string;
    nfr: Array<{ value: number | null }>;
    patterns: Array<{ value: number | null }>;
};

export const validationSchema = object().shape({
    name: string().required('Название обязательно'),
    description: string().required('Описание обязательно'),
    docLink: string().defined().default(''),
    nfr: array()
        .of(
            object().shape({
                value: number().nullable().defined(),
            }),
        )
        .defined(),
    patterns: array()
        .of(
            object().shape({
                value: number().nullable().defined(),
            }),
        )
        .defined(),
});
