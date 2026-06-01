import { object, string } from 'yup';

export type FormValues = {
    link: string;
};

export const getValidationSchema = () =>
    object().shape({
        link: string()
            .required('Заполните поле')
            .test(
                'url',
                'Недопустимые символы в URL. Проверьте слеши, двоеточия и другие знаки',
                (value) => {
                    if (!value) return true;

                    try {
                        new URL(value);
                        return true;
                    } catch {
                        return false;
                    }
                },
            ),
    });
