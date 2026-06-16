export enum PersonalMapTypes {
    BUSINESS_CAPABILITY = 'BUSINESS_CAPABILITY',
    TECH_CAPABILITY = 'TECH_CAPABILITY',
}

export interface IMapCriteria {
    id: number;
    name: string;
    description: string | null;
    interval: number | null;
    maxDesc: string | null;
    minDesc: string | null;
    revers: boolean;
    threshold: number | null;
    type: string;
}

export interface ICriteriaForm {
    name: string;
    description: string;
    type: string;
    interval: number;
    threshold: number | null;
    revers: boolean;
    minDesc: string;
    maxDesc: string;
}

export interface IPersonalMapType {
    id: number;
    name: PersonalMapTypes;
    title: string;
}

export interface IPersonalMapData {
    createdDate: string;
    description: string;
    id: number;
    name: string;
    type: IPersonalMapType;
    updatedDate?: string | null;
}

export interface IMapCapability {
    author: string;
    code: string;
    createdDate: string;
    description: string;
    id: number;
    isDomain: boolean;
    link: string;
    name: string;
    owner: string;
    responsibilityProductId: number;
    status: string;
    updatedDate: string;
    criteria: { criteria_id: number; grade: number; value: number; comment: string | null }[];
}

export interface IPersonalMapGroup {
    capability: IMapCapability[];
    childrenGroup: {
        capability: IMapCapability[];
        groupId: number;
        nameGroup: string;
        parentId: number;
    }[];
    groupId: number;
    nameGroup: string;
}

export interface IPersonalMapСompleteData {
    description: string;
    groups: IPersonalMapGroup[] | null;
    name: string;
    type: IPersonalMapType;
}

export interface IPersonalMapForm {
    name: string;
    description: string;
    typeId: number;
}

export interface IPersonalMapUpdateForm {
    name: string;
    description: string;
    type: { id: number };
}

export interface IPersonalMapGroupForm {
    nameGroup: string;
    id?: number;
    capabilityIds?: number[];
    childrenGroups?: { capabilityId: number[]; childrenGroupId?: number; nameGroup: string }[];
}
