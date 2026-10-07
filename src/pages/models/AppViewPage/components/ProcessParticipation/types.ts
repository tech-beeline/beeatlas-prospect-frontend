export interface IProcessParticipation {
    cmdb: string | null;
}

export interface IParticipationRow<T> {
    key: string;
    title: string;
    code: string;
    url: string | null;
    methods: T[];
    expanded: boolean;
}
