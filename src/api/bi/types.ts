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
}

interface IParticipants {
    descr: string;
    participant: number;
    value: string;
}

export interface IBIData {
    channel: { name: string }[];
    clientScenario: string;
    communal: boolean;
    descr: string;
    document: IBILink[];
    draft: boolean;
    dtCreated: Date;
    dtUpdated: Date;
    eaGuid: string;
    feelings: number;
    id: number;
    mockupLink: IBILink[];
    name: string;
    ownerRole: string;
    participants: IParticipants[];
    productId: string;

    scenario: IBILink[];
    statusId: number;
    touchPoints: string;
    type: number;
    ucsReaction: string;
    uniqueIdent: string;
}
