import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    code: string;
    critical: number;
    owner: number | undefined | null;
    description: string;
    gitUrl: string;
    employees: { employee?: number | undefined | null }[];
};

export const getValidationSchema = (isEditing: boolean) =>
    object().shape({
        name: string().required('Заполните поле'),
        code: string()
            .required('Заполните поле')
            .matches(
                isEditing ? /.*?/ : /^[a-zA-Z0-9]+$/,
                'В названии кода используются некорректные символы',
            ),
        critical: number().required('Заполните поле'),
        owner: number().nullable(),
        description: string().default(''),
        gitUrl: string().default(''),
        employees: array()
            .of(object().shape({ employee: number().nullable() }))
            .default([]),
    });
