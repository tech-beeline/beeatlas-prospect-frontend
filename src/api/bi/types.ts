export interface IBIForm {
    name: string;
}

export interface IBIData {
    clientScenario: string;
    communal: boolean;
    descr: string;
    dtCreated: Date;
    dtUpdated: Date;
    eaGuid: string;
    id: number;
    name: string;
    ownerRole: string;
    productId: string;
    scenarioId: number;
    statusId: number;
    touchPoints: string;
    type: number;
    ucsReaction: string;
    uniqueIdent: string;
}
