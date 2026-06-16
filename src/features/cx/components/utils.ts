export type OwnerFormValue = {
    id: number | null;
    employeeNumber: string;
    login: string;
    fullname: string;
    email: string;
};

export type OwnerFieldsFormValues = {
    businessOwner: OwnerFormValue;
    techOwner: OwnerFormValue[];
};

export const defaultOwner: OwnerFormValue = {
    id: null,
    employeeNumber: '',
    login: '',
    fullname: '',
    email: '',
};

export const defaultBusinessOwner: OwnerFormValue = defaultOwner;

export type EmployeeOption = {
    id: string;
    value: string;
    ownerId: number | null;
    employeeNumber: string;
    login: string;
    fullname: string;
    email: string;
};

export const isOwnerSelected = (owner: OwnerFormValue) =>
    Boolean(owner.employeeNumber || owner.id !== null || owner.fullname);

export const getFilledTechOwners = (techOwners: OwnerFormValue[]) =>
    techOwners.filter(isOwnerSelected);

export const getSelectedOwnerOption = (
    owner: OwnerFormValue,
    employeeOptions: EmployeeOption[],
): EmployeeOption | null => {
    if (!isOwnerSelected(owner)) {
        return null;
    }

    return (
        employeeOptions.find(
            (option) =>
                (owner.employeeNumber && option.employeeNumber === owner.employeeNumber) ||
                (owner.id !== null && option.ownerId === owner.id),
        ) ?? {
            id: owner.employeeNumber || String(owner.id ?? ''),
            value: owner.fullname || owner.employeeNumber,
            ownerId: owner.id,
            employeeNumber: owner.employeeNumber,
            login: owner.login,
            fullname: owner.fullname,
            email: owner.email,
        }
    );
};
