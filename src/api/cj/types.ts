import { IBIData } from 'api/bi/types';

export interface ICJStepForm {
    name: string;
    order: number;
    description?: string;
}

export interface ICJStepData {
    id: number;
    order: number;
    name: string;
    description: string | null;
    id_cj: number;
}

export interface ICJForm {
    draft?: boolean;
    name: string;
    user_portrait: string;
}

export interface ICJCreateForm {
    draft: boolean;
    name: string;
    userPortrait?: string;
    productId?: number;
}

interface IAuthor {
    id: number;
    fullName: string;
    email: string;
}

export interface ICJData {
    id: number;
    name: string;
    user_portrait: string;
    lastModifiedDate: string;
    draft: boolean;
    id_user_profile: number;
    id_product: number;
}

export interface ICJDataV2 {
    id: number;
    name: string;
    userPortrait: string;
    draft: boolean;
    lastModifiedDate: string;
    createdDate: string;
    productId: number;
}

export interface ICompleteStepData extends ICJStepData {
    bi: IBIData[];
}

export interface ICompleteCJData extends ICJDataV2 {
    steps: ICompleteStepData[];
    author: IAuthor;
}

export enum CJLibraryStatus {
    ALL = 'ALL',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLIC',
}
