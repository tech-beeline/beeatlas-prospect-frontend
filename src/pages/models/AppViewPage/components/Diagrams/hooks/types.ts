import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';

import { C4Node, GraphCanvasHandle, GraphData } from '../components';
import { C4Label, DiagramLayoutPersist, DiagramSnapshot, GraphTag, PinnedEntry } from '../types';

export interface UseDiagramsControllerResult {
    graphRef: RefObject<GraphCanvasHandle>;
    graphLoading: boolean;
    systemRootLoaded: boolean;
    visibleGraphData: GraphData;
    selectedNode: C4Node | null;
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

export interface IFocusableNode {
    id: string;
}

export interface IFocusSyncController {
    selectedNode: IFocusableNode | null;
    graphLoading: boolean;
    systemRootLoaded: boolean;
    openByNodeId: (nodeId: string) => Promise<void>;
}

export interface IUseDiagramsState {
    graphRef: RefObject<GraphCanvasHandle>;
    graphDataRef: MutableRefObject<GraphData>;
    selectedNodeRef: MutableRefObject<C4Node | null>;
    pinnedEntriesRef: MutableRefObject<PinnedEntry[]>;
    diagramLayoutRef: MutableRefObject<DiagramLayoutPersist | null>;
    graphTag: GraphTag;
    graphLoading: boolean;
    setGraphLoading: Dispatch<SetStateAction<boolean>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    graph: GraphData;
    setGraph: Dispatch<SetStateAction<GraphData>>;
    selectedNode: C4Node | null;
    setSelectedNode: Dispatch<SetStateAction<C4Node | null>>;
    productName: string;
    setProductName: Dispatch<SetStateAction<string>>;
    productAlias: string;
    setProductAlias: Dispatch<SetStateAction<string>>;
    diagramNameFilter: string;
    setDiagramNameFilter: Dispatch<SetStateAction<string>>;
    diagramLayout: DiagramLayoutPersist | null;
    setDiagramLayout: Dispatch<SetStateAction<DiagramLayoutPersist | null>>;
    interactionMode: 'view' | 'edit';
    setInteractionMode: Dispatch<SetStateAction<'view' | 'edit'>>;
    diagramHistory: DiagramSnapshot[];
    setDiagramHistory: Dispatch<SetStateAction<DiagramSnapshot[]>>;
    typeVisibility: Record<C4Label, boolean>;
    setTypeVisibility: Dispatch<SetStateAction<Record<C4Label, boolean>>>;
    tagsState: Record<string, string[]>;
    setTagsState: Dispatch<SetStateAction<Record<string, string[]>>>;
    newTag: string;
    setNewTag: Dispatch<SetStateAction<string>>;
    pinnedEntries: PinnedEntry[];
    setPinnedEntries: Dispatch<SetStateAction<PinnedEntry[]>>;
    selectedTags: string[];
    pinnedIdSet: Set<string>;
}

export interface IUseDiagramsActions {
    state: IUseDiagramsState;
    loadMergedSubgraph: (
        selected: C4Node,
        tag: GraphTag,
        pins: PinnedEntry[],
    ) => Promise<GraphData>;
}

export interface IUseDiagramsEffects {
    cmdb: string | null;
    productAlias: string;
    setProductAlias: (value: string) => void;
    setProductName: (value: string) => void;
    setError: (value: string) => void;
    setPinnedEntries: Dispatch<SetStateAction<PinnedEntry[]>>;
    setDiagramHistory: Dispatch<SetStateAction<DiagramSnapshot[]>>;
    loadSystemRoot: () => Promise<void>;
}
