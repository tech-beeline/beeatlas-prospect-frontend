import { object, string } from 'yup';

export type FormValues = {
    parent: string;
    name: string;
    description: string;
    owner: string;
    link: string;
};

export const validationSchema = object().shape({
    parent: string().required('Укажите родительскую возможность'),
    name: string().required('Заполните поле'),
    description: string().default(''),
    owner: string().default(''),
    link: string().default(''),
});
