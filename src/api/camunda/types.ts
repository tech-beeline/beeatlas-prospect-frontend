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
    isSync: true;
    variables: {
        cmdb: { value: string; type: 'String' };
        docId: { value: string; type: 'Integer' };
    };
}

export interface IProcessFullData extends IProcess {
    context: { name: string; value: string }[];
}
