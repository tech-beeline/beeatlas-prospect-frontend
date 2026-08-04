interface IComment {
    id: number;
    comment: string;
    createdDate: string;
    fullName: string;
}

export enum ApplicationStatus {
    WTXCTR = 'wtxctr',
    RW = 'rw',
    RFCTR = 'rfctr',
    DN = 'dn',
    CNCL = 'cncl',
}

interface IApplicationStatus {
    id: number;
    isEndStatus: boolean;
    name: string;
    alias: ApplicationStatus;
}

interface IApplicationType {
    description: string;
    entityType: string;
    id: number;
    name: string;
}

export interface IApplication {
    id: number;
    businessKey: string;
    authorId: number;
    comments: IComment[];
    createDate: string;
    executorId: number;
    name: string;
    responsibleId: number;
    status: IApplicationStatus;
    type: IApplicationType;
    updateDate: string;
}

export interface IExtendedApplication
    extends Omit<IApplication, 'createDate' | 'updateDate' | 'businessKey'> {
    entity_id: number;
    executor: {
        email: string;
        fullName: string;
        id: number;
    } | null;
    update_date: string | null;
    create_date: string | null;
    business_key: string;
}

export interface IApplicationEntity {
    author: string;
    createdDate: string;
    description: string;
    mutable: { code: string; name: string; id: number } | null;
    name: string;
    owner: string;
    parent: { code: string; name: string; id: number };
    updateDate: string | null;
}

export interface IBCApplicationForm {
    author?: string;
    comment?: string;
    description?: string;
    mutableBcId?: number;
    name?: string;
    owner?: string;
    parentId?: number;
}

export interface IApplicationPatchForm {
    comment?: string;
    description?: string;
    name?: string;
    owner?: string;
    parentId?: number;
}
