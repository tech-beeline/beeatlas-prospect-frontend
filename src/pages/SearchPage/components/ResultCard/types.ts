interface IDataForResult {
    name: string;
    descr: string;
    guid: string;
    author: string;
    owner: string;
    alias: string;
    stereotype: string;
    last_modified: string;
    domain_ref: { name: string; guid: string };
}

export interface IResultCard {
    data?: IDataForResult;
    request?: string | any;
}
