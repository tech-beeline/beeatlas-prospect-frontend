import { C4Node, DiagramLayoutPersist, GraphData } from './components';

export type {
    ICypherDiagram,
    ICypherNode,
    ICypherRecordValue,
    ICypherRelationship,
} from 'api/graph/types';

export interface IDiagrams {
    cmdb: string | null;
}

export type GraphTag = 'Global' | 'Local' | 'All';
export type C4Label =
    | 'SoftwareSystem'
    | 'Container'
    | 'Component'
    | 'DeploymentNode'
    | 'Environment'
    | 'ContainerInstance'
    | 'InfrastructureNode';

export type PinnedEntry = { id: string; name: string; labels: string[]; originalName?: string };
export type DiagramSnapshot = {
    graph: GraphData;
    selectedNode: C4Node;
    diagramLayout?: DiagramLayoutPersist | null;
};
