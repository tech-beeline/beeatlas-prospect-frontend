interface IRing {
    id: number;
    name: string;
    order: number;
}

interface ISector {
    id: number;
    name: string;
    order: number;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface ICategoryForm {
    name: string;
}

export interface IMergeCategoriesForm {
    joinCategoryName: string;
    joinedCategoriesId: number[];
}

export interface ITech {
    category: ICategory[];
    createdDate: Date;
    deletedDate?: Date | null;
    description: string;
    id: number;
    label: string;
    lastModifiedDate: Date;
    link?: string | null;
    ring: IRing;
    sector: ISector;
}

export interface ITechForm {
    id: number;
    categories: { id: number }[];
    descr: string;
    label: string;
    link: string;
    ring_id: number;
    sector_id: number;
}

export interface ISubscribedTechnologyData {
    desription: string;
    id: number;
    label: string;
}
