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
