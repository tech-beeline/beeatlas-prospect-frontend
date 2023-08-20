export interface IFDMStore {
    generalMenuItems: INestingMenuItem[];
    getGeneralMenuItems: () => void;
    setGeneralMenuItems: (arr: any[]) => void;

    activeFDMItem: INestingMenuItem;
    setActiveFDMItem: (item: INestingMenuItem) => void;

    treeExpandArray: number[];
    handleCheckTreeExpandId: (id: number) => void;

    // TODO: type
    itemChildren: any[];
    isItemChildren: boolean;
    getItemChildren: (id: number, level: number) => Promise<any> | unknown;

    isLoadingMenuItems: boolean;
    isLoadingChildren: boolean;
    setLoadingMenuItems: (bool: boolean) => void;
    setLoadingChildren: (bool: boolean) => void;

    setMenuTreeItems: (data: INestingMenuItem[]) => void;
    menuTreeItems: INestingMenuItem[];

    breadCrumbsFormat: (id: number) => void;
    breadCrumbsItems: any[]; // [{...}, {...}]
    breadCrumbsIds: number[]; // [1,2,3]

    findElementById: (id: number, parentId: number, level?: number) => void;
    alreadyResponse: number[];
}

export interface INestingMenuItem {
    id: number;
    name: string;
    guid: string;
    descr: string;
    parent: number;
    alias?: string;
    level: number;
    children?: any[];
    stereotype?: 'TECHNICAL' | 'BUSINESS';

    activeFDMItem: INestingMenuItem;
    setActiveFDMItem(props: INestingMenuItem): void;
    treeExpandArray: number[];
    getItemChildren(id: number, level: number): Promise<any> | unknown;
    // TODO: type
    itemChildren: any[];
    // TODO: убрать
    isItemChildren: boolean;
    isChildren: boolean;
}
