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
    employeeNumber: string().defined(),
    login: string().defined(),
    fullname: string().defined(),
    email: string().defined(),
}).test('owner-selected', 'Укажите владельца сценария', (owner) => {
    if (!owner) {
        return false;
    }

    if (owner.id !== null) {
        return true;
    }

    return Boolean(owner.employeeNumber);
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
