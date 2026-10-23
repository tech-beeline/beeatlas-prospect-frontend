import { defaultBusinessOwner, defaultOwner, OwnerFormValue } from 'features/cx/components/utils';
import { array, number, object, string } from 'yup';

export type { OwnerFormValue };

export type FormValues = {
    name: string;
    tags: string[];
    userPortrait: string | undefined | null;
    businessOwner: OwnerFormValue;
    product: number | null;
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
    id: number().nullable().default(null),
    employeeNumber: string().default(''),
    login: string().default(''),
    fullname: string().default(''),
    email: string().default(''),
}).default(defaultBusinessOwner);

export const getValidationSchema = () => {
    return object().shape({
        name: string().required('Заполните название'),
        tags: array().of(string().defined()).ensure().default([]),
        userPortrait: string().nullable().notRequired(),
        businessOwner: ownerSchema.required('Укажите владельца сценария'),
        product: number().defined().nullable(),
        techOwner: array().of(optionalOwnerSchema).ensure().default([]),
    });
};
