import { array, number, object, string } from 'yup';

export type FormValues = {
    steps: {
        id?: number | undefined | null;
        product?: number | undefined | null;
        tc?: number | undefined | null;
        iface?: number | undefined | null;
        operation?: number | undefined | null;
        description: string;
        stepName: string;
    }[];
};

export const validationSchema = object().shape({
    steps: array()
        .of(
            object().shape({
                id: number().nullable(),
                product: number().nullable(),
                tc: number().nullable(),
                iface: number().nullable(),
                operation: number().nullable(),
                description: string().default(''),
                stepName: string().default(''),
            }),
        )
        .default([]),
});
