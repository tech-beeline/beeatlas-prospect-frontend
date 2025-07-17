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

export interface ITechVersion {
    createdDate: string;
    deletedDate: string;
    id: number;
    lastModifiedDate: string;
    ring: IRing;
    versionEnd: string;
    versionStart: string;
}

interface ITechHistory {
    version: number;
    ring: IRing;
    createdDate: string;
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
    versions: ITechVersion[];
    history?: ITechHistory[] | null;
    isCritical: boolean;
}

export interface ITechForm {
    id: number;
    categories: { id: number }[];
    descr: string;
    label: string;
    ring_id: number;
    sector_id: number;
    review?: boolean;
    isCritical: boolean;
}

export interface ITechVersionForm {
    statusId: number;
    versionEnd: string;
    versionStart: string;
}

export interface ISubscribedTechnologyData {
    desription: string;
    id: number;
    label: string;
}

export interface ITechDocumentTypesData {
    docType: string;
    id: number;
    name: string;
}
