import { boolean, object, string } from 'yup';

export type FormValues = {
    name: string;
    createPermission: boolean;
    editPermission: boolean;
    deletePermission: boolean;
};

export const validationSchema = object().shape({
    name: string().required('Заполните название'),
    createPermission: boolean().default(false),
    editPermission: boolean().default(false),
    deletePermission: boolean().default(false),
});
