import { RefObject } from 'react';

import { C4Node, DiagramLayoutPersist, GraphCanvasHandle, GraphData } from '../components';
import { C4Label } from '../types';

export interface UseDiagramsControllerResult {
    graphRef: RefObject<GraphCanvasHandle>;
    graphLoading: boolean;
    systemRootLoaded: boolean;
    visibleGraphData: GraphData;
    selectedNode: C4Node;
    diagramHistoryLength: number;
    typeVisibility: Record<C4Label, boolean>;
    diagramNameFilter: string;
    tagCountByNodeId: ReadonlyMap<string, number>;
    pinnedIdSet: Set<string>;
    selectedTags: string[];
    newTag: string;
    error: string | null;
    diagramLayout: DiagramLayoutPersist | null;
    interactionMode: 'view' | 'edit';
    onToggleInteractionMode: () => void;
    openByNodeId: (nodeId: string) => Promise<void>;
    openNodeAsync: (node: C4Node) => Promise<void>;
    onTypeVisibilityChange: (label: C4Label, checked: boolean) => void;
    onFilterChange: (value: string) => void;
    onOpenNode: (node: C4Node) => void;
    onCloseNode: () => void;
    onGraphNodeClick: (node: C4Node) => void;
    onBack: () => void;
    onTogglePin: (node: C4Node) => void;
    onNewTagChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (index: number) => void;
    onLayoutPersist: (layout: DiagramLayoutPersist) => void;
}
