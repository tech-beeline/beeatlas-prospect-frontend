import { ReactNode } from 'react';

import { AssessmentResults } from 'api/projects/types';

export interface IAssessmentViewRequirement {
    id: number | string;
    uniqueIdent: string;
    title: string;
    description: string;
}

export interface IAssessmentViewOpenQuestion {
    id: number | string;
    uniqueIdent: string;
    questionText: string;
}

export interface IAssessmentViewTechnicalCapability {
    id: number | string;
    tcCode: string;
    productAlias: string;
    productName: string;
    parentBcCode: string;
    frIds: string[];
    name?: string;
    description?: string;
    relevance?: number;
}

export interface IAssessmentViewDesignTechnicalCapability {
    id: number | string;
    name: string;
    description: string;
    productAlias: string;
    productName: string;
    parentBcCode: string;
    frIds: string[];
    relevance?: number;
}

export interface IAssessmentViewData {
    impactLevel: AssessmentResults;
    reqFunc: IAssessmentViewRequirement[];
    reqNonFunc: IAssessmentViewRequirement[];
    openQuestions: IAssessmentViewOpenQuestion[];
    tc: IAssessmentViewTechnicalCapability[];
    designTc: IAssessmentViewDesignTechnicalCapability[];
}

export interface IAssessmentViewProps {
    assessment: IAssessmentViewData;
    header?: ReactNode;
}
