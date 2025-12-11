import { array, number, object, string } from 'yup';

export type FormValues = {
    steps: {
        product?: number | undefined | null;
        tc?: number | undefined | null;
        iface?: number | undefined | null;
        operation?: number | undefined | null;
        description: string;
    }[];
};

export const validationSchema = object().shape({
    steps: array()
        .of(
            object().shape({
                product: number().nullable(),
                tc: number().nullable(),
                iface: number().nullable(),
                operation: number().nullable(),
                description: string().default(''),
            }),
        )
        .default([]),
});
