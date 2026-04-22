import { array, number, object } from 'yup';

export type FormValues = {
    nfr: Array<number | null | undefined>;
};

export const getValidationSchema = () =>
    object().shape({
        nfr: array().of(number().nullable()).defined(),
    });
