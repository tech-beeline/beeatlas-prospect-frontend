import { number, object, string } from 'yup';

export type MapFormValues = {
    name: string;
    type: number;
    description: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    type: number().required('Выберите тип карты'),
    description: string().default(''),
});
