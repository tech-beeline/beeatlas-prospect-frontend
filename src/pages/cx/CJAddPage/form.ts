import { defaultBusinessOwner, defaultOwner, OwnerFormValue } from 'features/cx/components/utils';
import { array, number, object, string } from 'yup';

export type { OwnerFormValue };

export type FormValues = {
    name: string;
    userPortrait: string | undefined | null;
    businessOwner: OwnerFormValue;
    product: number;
    techOwner: OwnerFormValue[];
};

export { defaultBusinessOwner, defaultOwner };

const ownerSchema = object({
    id: number().nullable().defined(),
    employeeNumber: string().required('Укажите владельца сценария'),
    login: string().required(),
    fullname: string().required(),
    email: string().required(),
});

const optionalOwnerSchema = object({
    id: number().nullable().defined(),
    employeeNumber: string().defined(),
    login: string().defined(),
    fullname: string().defined(),
    email: string().defined(),
});

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    userPortrait: string().nullable().notRequired(),
    businessOwner: ownerSchema.required('Укажите владельца сценария'),
    product: number().defined().default(0),
    techOwner: array().of(optionalOwnerSchema).ensure().default([]),
});
