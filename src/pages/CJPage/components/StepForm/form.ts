import { object, string } from 'yup';

export type FormValues = {
    name: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
});
