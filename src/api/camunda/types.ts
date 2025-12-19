export interface IProcess {
    id: number;
    procId: string;
    businessKey: string;
    type: {
        id: number;
        name: string;
        description: string;
    };
    status: {
        id: number;
        name: string;
        alias: string;
        isError: boolean;
        isDone: boolean;
        createdDate: string;
    };
}

export interface IProcessForm {
    businessKey: string;
    cmdb: string;
    isSync: true;
    docId: number;
}

export interface IProcessFullData extends IProcess {
    context: { name: string; value: string }[];
}
