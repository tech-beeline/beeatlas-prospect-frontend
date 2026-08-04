export interface IBIForm {
    channel: {
        id: number;
    }[];
    clientScenario: string;
    communal: boolean;
    descr: string;
    document: {
        descr: string;
        url: string;
    }[];
    draft: boolean;
    flowLink: {
        descr: string;
        url: string;
    }[];
    mockupLink: {
        descr: string;
        url: string;
    }[];
    name: string;
    participants: {
        idType: number;
        descr: string;
        value: string;
    }[];
    productId: string;
    status: {
        id: number;
    };
    target: boolean;
    ucsReaction: string;
    metrics: string;
}

export interface IBILink {
    descr: string;
    url: string;
    type: {
        id: number;
        type: number;
    };
}

export interface IChannel {
    id: number;
    name: string;
}

export interface IStatus {
    id: number;
    name: string;
}

export interface IParticipant {
    descr: string;
    participant: {
        id: number;
        name: string;
    };
    value: string;
}

export interface IRelations {
    id: number;
    user_id: string;
    description: string;
    tcId: number;
    tcName: string;
    tcCode: string;
    productId: number;
    productName: string;
    productAlias: string;
    interfaceId: number;
    interfaceName: string;
    interfaceCode: string;
    operationId: number;
    operation: string;
    order: number;
}

export interface IRelationForm {
    description: string;
    interfaceId: number | null;
    operationId: number | null;
    productId: number | null;
    tcId: number | null;
}

export interface IStepsScenarion {
    name: string;
    id: number;
    uniqueIdent: string;
    type: string;
    latency: number;
    errorRate: number;
    rps: number;
    relations: IRelations[];
}

export interface ISLAForm {
    latency: number | null;
    errorRate: number | null;
    rps: number | null;
}

interface IBIAuthor {
    email: string;
    fullName: string;
    id: number;
}
export interface IBIData {
    author: IBIAuthor;
    channel: IChannel[];
    clientScenario: string;
    communal: boolean;
    descr: string;
    document: IBILink[];
    draft: boolean;
    dtCreated: Date;
    dtUpdated: Date;
    eaGuid: string;
    flowLink: IBILink[];
    id: number;
    biSteps: IStepsScenarion[];
    mockupLink: IBILink[];
    name: string;
    ownerRole: string;
    participants: IParticipant[];
    productId: string;
    status: IStatus;
    target: boolean;
    touchPoints: string;
    ucsReaction: string;
    uniqueIdent: string;
    metrics: string | null;
    lastModifiedDate: string;
    bpmn: boolean;
}

export interface IBIEditabilityData {
    editability: boolean;
}

export interface ITechCapability {
    author: string;
    code: string;
    createdDate: string;
    description: string;
    id: number;
    link: string;
    name: string;
    owner: string;
}
