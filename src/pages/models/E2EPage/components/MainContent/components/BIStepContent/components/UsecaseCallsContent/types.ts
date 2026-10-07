import {
    IProjectUsecaseOperationNode,
    IProjectUsecaseOperationTableItem,
} from 'api/usecase/types';

export interface IUsecaseCallsContent {
    biStepCode: string;
}

export interface IUsecaseCallNode {
    id: string;
    node: IProjectUsecaseOperationNode;
    item: IProjectUsecaseOperationTableItem;
    children: IUsecaseCallNode[];
}
