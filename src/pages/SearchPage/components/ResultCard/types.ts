interface IDataForResult {
    name: string;
    descr: string;
    id: number;
    guid: string;
    author: string;
    owner: string;
    alias: string;
    stereotype: string;
    last_modified: string;
    domain_ref: { name: string; id: number; guid: string };
}

export interface IResultCard {
    data?: IDataForResult;
    request?: string | any;
}
