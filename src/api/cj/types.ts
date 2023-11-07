export interface ICJForm {
    draft: boolean;
    name: string;
    user_portrait: string;
}

export interface ICJData {
    id: number;
    name: string;
    user_portrait: string;
    last_updated: string;
    draft: boolean;
    id_user_profile: number;
    id_product: string;
}

export interface ICJStepForm {
    name: string;
    order: number;
}

export interface ICJStepData {
    id: number;
    order: number;
    name: string;
    id_cj: number;
}
