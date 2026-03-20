import type { ICypherDiagram } from 'api/graph/types';

export interface ICypherGraph {
    data: ICypherDiagram[];
}

export interface GraphNode {
    id: string;
    name: string;
    label: string;
    cmdb: string;
    description: string;
    graphTag: string;
    tags: string;
    originalName: string;
    structurizrDslIdentifier: string;
    externalName: string;

    val?: number;
    color?: string;
    x?: number;
    y?: number;
    fx?: number;
    fy?: number;
    vx?: number;
    vy?: number;
}

export interface GraphLink {
    source: string | GraphNode;
    target: string | GraphNode;
    label?: string;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}
