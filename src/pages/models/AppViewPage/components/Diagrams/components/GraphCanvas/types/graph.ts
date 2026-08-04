export type NodeId = string;

export type C4Label =
    | 'SoftwareSystem'
    | 'Container'
    | 'Component'
    | 'DeploymentNode'
    | 'Environment'
    | 'ContainerInstance'
    | 'InfrastructureNode';

export interface C4Node {
    id: string;
    labels: string[];
    properties: Record<string, unknown>;
    name: string;
    description?: string;
    technology?: string;
}

export interface GraphEdge {
    source: string;
    target: string;
    type: string;
    technology?: string;
}

export type GraphNode = C4Node;

export interface GraphData {
    nodes: C4Node[];
    edges: GraphEdge[];
}
