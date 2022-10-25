interface IDataForResult {
    name: string;
    descr: string;
    guid: string;
    author: string;
    lastModified: string;
    domainRef: { name: string; guid: string };
}

export interface IResultCard {
    data?: IDataForResult;
}
