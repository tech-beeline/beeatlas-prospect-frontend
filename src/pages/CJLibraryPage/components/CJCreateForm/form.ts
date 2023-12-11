import { object, string } from 'yup';

export type FormValues = {
    name: string;
    userPortrait: string;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    userPortrait: string().required('Заполните портрет пользователя'),
});
