interface IDataForResult {
    name: string;
    descr: string;
    guid: string;
    author: string;
    owner: string;
    alias: string;
    stereotype: string;
    lastModified: string;
    domainRef: { name: string; guid: string };
}

export interface IResultCard {
    data?: IDataForResult;
    request?: string | any;
}
