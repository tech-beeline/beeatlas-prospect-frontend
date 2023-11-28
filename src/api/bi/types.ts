export interface IBIForm {
    channel: {
        name: string;
    }[];
    clientScenario: string;
    communal: boolean;
    descr: string;
    document: {
        descr: string;
        url: string;
    }[];
    draft: boolean;
    dtCreated: Date;
    dtUpdated: Date;
    eaGuid: string;
    feelings: number;
    id: number;
    mockupLink: {
        descr: string;
        url: string;
    }[];
    name: string;
    ownerRole: string;
    participants: {
        descr: string;
        participant: number;
        value: string;
    }[];
    productId: string;
    scenario: {
        descr: string;
        url: string;
    }[];
    statusId: number;
    target: boolean;
    touchPoints: string;
    ucsReaction: string;
    uniqueIdent: string;
}

export interface IBILink {
    descr: string;
    url: string;
    type: {
        id: number;
        type: number;
    };
}

// interface IParticipants {
//     descr: string;
//     participant: number;
//     value: string;
// }

interface IChannel {
    id: number;
    name: string;
}

interface IFeelings {
    id: number;
    name: string;
}

interface IStatus {
    id: number;
    name: string;
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
    participants: {
        id: 'string';
        name: 'string';
    }[];
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
