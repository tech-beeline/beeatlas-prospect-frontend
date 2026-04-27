import { array, number, object } from 'yup';

export type FormValues = {
    nfr: Array<{ value: number | null }>;
};

export const getValidationSchema = () =>
    object().shape({
        nfr: array()
            .of(
                object().shape({
                    value: number().nullable().defined(),
                }),
            )
            .defined(),
    });
