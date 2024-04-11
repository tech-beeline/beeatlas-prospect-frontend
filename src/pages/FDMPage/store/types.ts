export enum ItemTypes {
    TECH = 'TECH',
    BUSINESS = 'BUSINESS',
}

export interface Item {
    id: number;
    name: string;
    description: string;
    code: string;
    author: string;
    children: Item[];
    type: ItemTypes;
    domain?: boolean;
    hasChildren?: boolean;
    parentId: number | null;
}

export interface Breadcrumb {
    id: number;
    type: ItemTypes;
    name: string;
}

export interface IFDMStore {
    activeItem: Item | null;
    path: number[];
    breadcrumbs: Breadcrumb[];
    items: Item[];
    requestedCapabilities: string[];
    loading: boolean;
    setActiveItem: (itemId: number, typ: ItemTypes) => void;
    clearActiveItem: () => void;
    getCoreCababilities: () => Promise<void>;
    getParentCapabilities: (id: number, type: ItemTypes) => Promise<void>;
    getСhildrenСapabilities: (id: number) => Promise<void>;
}
