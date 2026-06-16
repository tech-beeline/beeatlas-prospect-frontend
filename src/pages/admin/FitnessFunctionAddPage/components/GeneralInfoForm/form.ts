import { array, boolean, number, object, string } from 'yup';

export type FormValues = {
    code: string;
    name: string;
    isTrigger: boolean;
    type: number;
    applicability: (string | undefined)[];
};

export const getValidationSchema = (invalidCodes: string[]) =>
    object().shape({
        code: string()
            .required('Заполните поле')
            .test(
                'unique',
                () => `Фитнес-функция с таким кодом уже существует`,
                // (value) => !invalidCodes.includes(value),
                () => true,
            ),
        name: string().required('Заполните поле'),
        isTrigger: boolean().required('Заполните поле'),
        type: number().default(0).required('Заполните поле'),
        applicability: array().of(string().optional()).default([]),
    });
