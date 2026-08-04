import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    description: string;
    rule: Array<{ value: number | null }>;
    chapters: Array<{ value: number }>;
    patterns: Array<{ value: number | null }>;
};

export const validationSchema = object().shape({
    name: string().required('Название обязательно'),
    description: string().required('Описание обязательно'),
    rule: array()
        .of(
            object().shape({
                value: number().nullable().defined(),
            }),
        )
        .defined(),
    chapters: array()
        .of(
            object().shape({
                value: number().nullable().required('Жизненная ситуация обязательна').defined(),
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
