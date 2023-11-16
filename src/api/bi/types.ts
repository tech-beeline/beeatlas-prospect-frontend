export interface IBIForm {
    channelIds: number[];
    clientScenario: string;
    communal?: boolean;
    descr: string;
    eaGuid?: string;
    name: string;
    ownerRole?: string;
    productId: string;
    scenarioId?: number;
    statusId: number;
    touchPoints?: string;
    type: number;
    ucsReaction?: string;
    uniqueIdent: string;
}

interface IBILink {
    descr: string;
    id: number;
    url: string;
}

interface IParticipants {
    descr: string;
    id: number;
    value: string;
}

export interface IBIData {
    channel: { id: number; name: string }[];
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
