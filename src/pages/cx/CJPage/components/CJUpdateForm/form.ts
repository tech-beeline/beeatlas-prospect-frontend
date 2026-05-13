import { array, number, object, string } from 'yup';

export type FormValues = {
    name: string;
    userPortrait: string | undefined | null;
    businessOwner: number;
    product: number;
    techOwner: Array<{ value: number | null }>;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    userPortrait: string().nullable().notRequired(),
    businessOwner: number().defined().default(0),
    product: number().defined().default(0),
    techOwner: array()
        .of(
            object().shape({
                value: number().nullable().defined(),
            }),
        )
        .defined(),
});
