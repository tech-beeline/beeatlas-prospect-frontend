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
    user_portrait?: string | null;
    dashboardLink?: string;
    productId: string;
    businessOwner: number;
    techOwners: number[];
}

export interface ICJAuthor {
    email: string;
    fullName: string;
    id: number;
}

export interface ICJData {
    id: number;
    name: string;
    userPortrait: string;
    lastModifiedDate: string;
    draft: boolean;
    id_user_profile: number;
    uniqueIdent: string;
    productId: string;
    bpmn: boolean;
    dashboardLink?: string | null;
}

export interface ICJNewData extends ICJData {
    id_product?: string;
    user_portrait?: string;
    idProductExt?: string;
}

export interface ICompleteStepData extends ICJStepData {
    bi: IBIData[];
}

export interface ICompleteCJData extends ICJData {
    steps: ICompleteStepData[];
    author: ICJAuthor | null;
    businessOwner: { email: string; fullName: string; id: number } | null;
    techOwners: { email: string; fullName: string; id: number }[];
    id_product?: string;
    idProductExt?: string;
    dashboardLink?: string | null;
}

export enum CJLibraryStatus {
    ALL = 'ALL',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLIC',
}

export interface IBPMNFileVersion {
    id: string;
    key: string;
    created_date: string;
}

export interface ICJDocumentTypesData {
    docType: string;
    id: number;
    name: string;
}

export interface IDashboardData {
    id: number;
    path: string;
    slug: string;
    status: string;
    uid: string;
    url: string;
    version: number;
}
