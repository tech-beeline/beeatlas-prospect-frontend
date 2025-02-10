import { array, number, object, string } from 'yup';

export type FormValues = {
    versions: VersionValues[];
};

export type VersionValues = {
    versionStart: string;
    versionEnd: string;
    status: number;
};

export const getValidationSchema = () =>
    object().shape({
        versions: array()
            .of(
                object().shape({
                    versionStart: string().required('Заполните поле'),
                    versionEnd: string().default(''),
                    status: number().required('Заполните поле'),
                }),
            )
            .default([]),
    });
