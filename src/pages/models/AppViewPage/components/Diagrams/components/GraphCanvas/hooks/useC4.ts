/** Тег графа в Neo4j (см. graphTag в architect-graph-service) */
export type GraphTag = 'Global' | 'Local' | 'All';

/** Лейблы узлов в Neo4j (PascalCase, как в Cypher) */
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

export function nodeDisplayName(n: C4Node): string {
    const p = n.properties as Record<string, unknown>;
    const raw = p.originalName ?? p.original_name;
    if (typeof raw === 'string' && raw.trim().length > 0) return raw.trim();
    return n.name;
}

export function isStructuralEdgeRelationship(type: string): boolean {
    const t = type.trim().toLowerCase();
    return t === 'child' || t === 'deploy';
}

export function graphEdgeLabel(edge: GraphEdge): string {
    const t = edge.type.trim();
    if (t.toLowerCase() === 'child') return '';
    if (t.toLowerCase() === 'relationship' && edge.technology?.trim()) {
        return edge.technology.trim();
    }
    return edge.type;
}

export const C4_COLORS: Record<string, string> = {
    SoftwareSystem: '#1A73E8',
    Container: '#00897B',
    Component: '#7B1FA2',
    DeploymentNode: '#E65100',
    Environment: '#455A64',
    ContainerInstance: '#00897B',
    InfrastructureNode: '#6D4C41',
};
