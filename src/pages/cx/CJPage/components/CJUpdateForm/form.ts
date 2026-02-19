import { object, string } from 'yup';

export type FormValues = {
    name: string;
    userPortrait: string | undefined | null;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    userPortrait: string().nullable().notRequired(),
});
