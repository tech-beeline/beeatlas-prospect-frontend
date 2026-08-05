export interface IPage {
    pageId: string;
    context: string;
}

export interface IUsePageContext {
    page: IPage;

    entityType?: string;
    entityId?: string | number;

    activeTab?: string;
}
