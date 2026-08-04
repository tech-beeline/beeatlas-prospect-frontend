import { ICompleteStepData } from 'api/cj/types';

export interface ITable {
    productId: string;
    cjId: number;
    draft: boolean;
    tableData: ICompleteStepData[];
    bpmn?: boolean;
    canEditCJ: boolean;
}

export enum RowIds {
    NAME = 'name',
    IDENTIFICATOR = 'identificator',
    DESCRIPTION = 'descr',
    COMMUNAL = 'communal',
    TYPE = 'type',
    STATUS = 'status',
    PARTICIPANTS = 'participants',
    FEELING = 'feeling',
    CLIENT_SCENARIO = 'clientScenario',
    SCENARION_BI = 'scenarioBI',
    FLOW_LINK = 'flowLink',
    UCS_REACTION = 'ucsReaction',
    CHANNEL = 'channel',
    DOCUMENT = 'document',
    MOCKUP = 'mockup',
    METRICS = 'metrics',
}
