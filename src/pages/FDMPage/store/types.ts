export interface Item {
    id: number;
    name: string;
    guid: string;
    descr: string;
    parent: number;
    alias?: string;
    level: number;
    children?: Item[];
    stereotype?: 'TECHNICAL' | 'BUSINESS';
    domain_ref?: { id: number; name: string };
    owner?: string;
}

export interface Breadcrumb {
    id: number;
    level: number;
    name: string;
    domainId?: number;
}

export interface IFDMStore {
    activeItem: Item | null;
    activeItemPath: number[];
    breadcrumbs: Breadcrumb[];
    flatItems: Item[];
    menuItems: Item[];
    requesetedDomainIds: number[];
    loading: boolean;
    setActiveItem: (itemId: number, level: number) => void;
    clearActiveItem: () => void;
    getGroupsAndDomains: () => Promise<void>;
    getEntitiesByDomain: (domainId: number) => Promise<boolean>;
}
