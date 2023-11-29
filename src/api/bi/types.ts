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
    feeling: {
        id: number;
    };
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
        id: number;
        descr: string;
        value: string;
    }[];
    status: {
        id: number;
    };
    target: boolean;
    ucsReaction: string;
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

interface IFeelings {
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

export interface IBIData {
    channel: IChannel[];
    clientScenario: string;
    communal: boolean;
    descr: string;
    document: IBILink[];
    draft: boolean;
    dtCreated: Date;
    dtUpdated: Date;
    eaGuid: string;
    feelings: IFeelings;
    flowLink: IBILink[];
    id: number;
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
}

export interface IBIEditabilityData {
    editability: boolean;
}
