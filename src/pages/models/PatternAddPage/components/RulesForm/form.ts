import { object, string } from 'yup';

export type FormValues = {
    rule: string;
};

export const getValidationSchema = () =>
    object().shape({
        rule: string().default(''),
    });
