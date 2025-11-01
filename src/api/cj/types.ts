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

export interface ICJData {
    id: number;
    name: string;
    user_portrait: string;
    lastModifiedDate: string;
    draft: boolean;
    id_user_profile: number;
    id_product: string;
}

export interface ICompleteStepData extends ICJStepData {
    bi: IBIData[];
}

export interface ICompleteCJData extends ICJData {
    steps: ICompleteStepData[];
}

export enum CJLibraryStatus {
    ALL = 'ALL',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLIC',
}
