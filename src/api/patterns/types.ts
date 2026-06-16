import { ITech } from 'api/technologies/types';

export interface IPattern {
    id: number;
    code: string;
    name: string;
    rule: string;
    dsl: string;
    description: string;
    isAntiPattern: boolean;
    createDate: string;
    updateDate: string | null;
    deleteDate: string | null;
    technologies: ITech[];
    groups: { id: number; name: string }[];
}

export interface IPatternDocumentTypesData {
    docType: string;
    id: number;
    name: string;
}

export interface IPatternForm {
    name: string;
    rule: string;
    isAntiPattern: boolean;
    description: string;
    dsl: string;
    groups: number[];
    relationsTech: number[];
    nfr: number[];
}

export interface IPatternGroup {
    id: number;
    name: string;
}

export interface IPatternGroupTree {
    id: number;
    name: string;
    children: IPatternGroupTree[];
}

export interface IPatternGroupForm {
    name: string;
    parentId: number | null;
}

export interface IValidateWorkspaceRequest {
    workspace: string;
}

export interface IValidateRulesResponse {
    readOnly: string | null;
    error: string | null;
    valid: string;
}
