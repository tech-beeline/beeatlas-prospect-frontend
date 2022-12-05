interface IDataForResult {
    name: string;
    descr: string;
    guid: string;
    author: string;
    owner: string;
    lastModified: string;
    domainRef: { name: string; guid: string };
}

export interface IResultCard {
    data?: IDataForResult;
    search?: string | any;
}
