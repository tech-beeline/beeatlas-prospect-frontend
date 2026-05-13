import { ICompleteCJData } from 'api/cj/types';

import { FormValues } from './components/CJUpdateForm';

export enum SideSheetVariants {
    DATA_CJ = 'DATA_CJ',
    IMPORT_CJ = 'IMPORT_CJ',
    UPDATE_CJ = 'UPDATE_CJ',
    VERSION_CJ = 'VERSION_CJ',
    INFO_CJ = 'INFO_CJ',
    SIDEBLOCK_BI = 'SIDEBLOCK_BI',
    EDIT_SCENARIO_BI = 'EDIT_SCENARIO_BI',
    EDIT_SLA_BI = 'EDIT_SLA_BI',
}

export type ButtonState = 'default' | 'loading' | 'success';

export const mapCJToFormValues = (data: ICompleteCJData): FormValues => ({
    name: data.name,
    userPortrait: data.userPortrait,
    businessOwner: {
        id: data.businessOwner?.id ?? null,
        employeeNumber: '',
        login: '',
        fullname: data.businessOwner?.fullName ?? '',
        email: data.businessOwner?.email ?? '',
    },
    product: Number(data.productId),
    techOwner: (data.techOwners ?? []).map((owner) => ({
        id: owner.id ?? null,
        employeeNumber: '',
        login: '',
        fullname: owner.fullName ?? '',
        email: owner.email ?? '',
    })),
});
