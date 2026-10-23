export interface IProcessParticipation {
    cmdb: string | null;
}

export interface IParticipationRow<T> {
    key: string;
    title: string;
    code: string;
    url: string | null;
    methods: T[];
}

export interface IParticipationSearchOption {
    id: number;
    value: string;
    code: string;
    rowKey: string;
    methodIndex?: number;
}
