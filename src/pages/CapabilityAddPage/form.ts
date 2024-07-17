import { number, object, string } from 'yup';

export type FormValues = {
    parent: number;
    name: string;
    description: string;
    owner: string;
    link: string;
};

export const validationSchema = object().shape({
    parent: number().required('Укажите родительскую возможность'),
    name: string().required('Заполните поле'),
    description: string().default(''),
    owner: string().default(''),
    link: string().default(''),
});
