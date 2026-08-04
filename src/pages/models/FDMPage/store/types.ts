export enum ItemTypes {
    TECH = 'TECH',
    BUSINESS = 'BUSINESS',
}

export interface DomainData {
    id: number;
    name: string;
}

export interface Item {
    id: number;
    name: string;
    description: string;
    code: string;
    author: string;
    owner?: string | null;
    children: Item[];
    type: ItemTypes;
    system?: ISystem;
    isDomain?: boolean;
    hasChildren?: boolean;
    parent: number | null;
    domainData?: DomainData;
}

export interface ISystem {
    alias: string;
    id: string;
    name: string;
    struturizrURL: string;
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
    removeItem: (id: number, type: ItemTypes) => void;
}
