import { mapProjectUsecaseOperationNode } from 'api/queries/usecase/utils';
import {
    IProjectUsecaseOperationApplication,
    IProjectUsecaseOperationNode,
} from 'api/usecase/types';
import * as R from 'router/const';

import { IUsecaseCallNode } from './types';

export const buildUsecaseCallTree = (
    nodes: IProjectUsecaseOperationNode[],
    parentApplication: IProjectUsecaseOperationApplication | null = null,
    pathPrefix = '',
): IUsecaseCallNode[] =>
    [...nodes]
        .sort((a, b) => a.order - b.order)
        .map((node, index) => {
            const item = mapProjectUsecaseOperationNode(node, parentApplication);
            const id = `${pathPrefix}${index}-${node.discoveredOperationId}`;

            return {
                id,
                node,
                item,
                children: buildUsecaseCallTree(node.children, item.callee, `${id}/`),
            };
        });

export const findUsecaseCall = (
    nodes: IUsecaseCallNode[],
    id: string | null,
): IUsecaseCallNode | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        const child = findUsecaseCall(node.children, id);
        if (child) return child;
    }
    return null;
};

export const getUsecaseUrl = (usecaseId: number) =>
    `${R.MODELS_PATH}${R.PROJECTS_PATH}${R.USECASE_PATH}?id=${usecaseId}`;
