import { number, object, string } from 'yup';

export type FormValues = {
    name: string;
    group: number | null | undefined;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    group: number().nullable(),
});
