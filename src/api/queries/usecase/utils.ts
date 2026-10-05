import {
    IProjectUsecaseDiscoveredInterface,
    IProjectUsecaseOperationApplication,
    IProjectUsecaseOperationNode,
    IProjectUsecaseOperationsViewData,
    IProjectUsecaseOperationTableItem,
    IProjectUsecaseParticipant,
    ProjectUsecaseOperationStatus,
    ProjectUsecaseParticipantStatus,
} from 'api/usecase/types';

const joinValues = (...values: Array<string | null>): string | null => {
    const result = values.filter(Boolean).join(' ');

    return result || null;
};

const getApplication = (
    discoveredInterface: IProjectUsecaseDiscoveredInterface,
): IProjectUsecaseOperationApplication => {
    if (discoveredInterface.product) {
        return {
            mnemonic: discoveredInterface.product.alias,
            isPlanned: false,
        };
    }

    return {
        mnemonic: discoveredInterface.productPlanned,
        isPlanned: true,
    };
};

const getOperationStatus = (
    isPlanned: boolean,
    hasConnectedOperation: boolean,
): ProjectUsecaseOperationStatus => {
    if (isPlanned) {
        return hasConnectedOperation
            ? ProjectUsecaseOperationStatus.REVIEW
            : ProjectUsecaseOperationStatus.PLANNED;
    }

    return hasConnectedOperation
        ? ProjectUsecaseOperationStatus.CONFIRMED
        : ProjectUsecaseOperationStatus.NOT_MAPPED;
};

const getParticipant = (
    discoveredInterface: IProjectUsecaseDiscoveredInterface,
): IProjectUsecaseParticipant | null => {
    const { product, productPlanned } = discoveredInterface;

    if (product && (product.alias || product.name)) {
        return {
            mnemonic: product.alias,
            name: product.name,
            status: ProjectUsecaseParticipantStatus.CONFIRMED,
        };
    }

    if (productPlanned) {
        return {
            mnemonic: productPlanned,
            name: null,
            status: ProjectUsecaseParticipantStatus.NOT_CONFIRMED,
        };
    }

    return null;
};

export const mapProjectUsecaseOperations = (
    rootNodes: IProjectUsecaseOperationNode[],
): IProjectUsecaseOperationsViewData => {
    const operations: IProjectUsecaseOperationTableItem[] = [];
    const participants = new Map<string | null, IProjectUsecaseParticipant>();

    const visitNode = (
        node: IProjectUsecaseOperationNode,
        parentApplication: IProjectUsecaseOperationApplication | null,
    ) => {
        const { discoveredOperation } = node;
        const application = getApplication(discoveredOperation.discoveredInterface);
        const connectedOperation = discoveredOperation.operation;
        const participant = getParticipant(discoveredOperation.discoveredInterface);

        operations.push({
            id: node.discoveredOperationId,
            order: node.order,
            caller: parentApplication,
            callee: application,
            action: discoveredOperation.description,
            call: connectedOperation
                ? joinValues(connectedOperation.type, connectedOperation.name)
                : joinValues(discoveredOperation.type, discoveredOperation.name),
            technicalCapability: connectedOperation?.techCapability
                ? joinValues(
                      connectedOperation.techCapability.name,
                      connectedOperation.techCapability.code,
                  )
                : null,
            status: getOperationStatus(discoveredOperation.isPlanned, Boolean(connectedOperation)),
        });

        if (participant) {
            if (!participants.has(participant.mnemonic)) {
                participants.set(participant.mnemonic, participant);
            }
        }

        node.children.forEach((child) => visitNode(child, application));
    };

    rootNodes.forEach((node) => visitNode(node, null));

    return { operations, participants: Array.from(participants.values()) };
};
