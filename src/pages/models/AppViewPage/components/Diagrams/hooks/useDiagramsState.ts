import { useMemo, useRef, useState } from 'react';

import { C4Node, GraphCanvasHandle, GraphData } from '../components';
import { KNOWN_LABELS, TAG_STORAGE_KEY } from '../const';
import { C4Label, DiagramLayoutPersist, DiagramSnapshot, GraphTag, PinnedEntry } from '../types';

import { IUseDiagramsState } from './types';

export const useDiagramsState = (): IUseDiagramsState => {
    const graphRef = useRef<GraphCanvasHandle>(null);
    const graphDataRef = useRef<GraphData>({ nodes: [], edges: [] });
    const selectedNodeRef = useRef<C4Node | null>(null);
    const pinnedEntriesRef = useRef<PinnedEntry[]>([]);
    const diagramLayoutRef = useRef<DiagramLayoutPersist | null>(null);

    const [graphTag] = useState<GraphTag>('Global');
    const [graphLoading, setGraphLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [graph, setGraph] = useState<GraphData>({ nodes: [], edges: [] });
    const [selectedNode, setSelectedNode] = useState<C4Node | null>(null);
    const [productName, setProductName] = useState('');
    const [productAlias, setProductAlias] = useState('');
    const [diagramNameFilter, setDiagramNameFilter] = useState('');
    const [diagramLayout, setDiagramLayout] = useState<DiagramLayoutPersist | null>(null);
    const [interactionMode, setInteractionMode] = useState<'view' | 'edit'>('view');
    const [diagramHistory, setDiagramHistory] = useState<DiagramSnapshot[]>([]);
    const [typeVisibility, setTypeVisibility] = useState<Record<C4Label, boolean>>(() => {
        const m = {} as Record<C4Label, boolean>;
        KNOWN_LABELS.forEach((label) => {
            m[label] = true;
        });
        return m;
    });
    const [tagsState, setTagsState] = useState<Record<string, string[]>>(() => {
        try {
            const raw = localStorage.getItem(TAG_STORAGE_KEY);
            if (!raw) {
                return {};
            }
            const parsed = JSON.parse(raw) as unknown;
            return parsed && typeof parsed === 'object' ? (parsed as Record<string, string[]>) : {};
        } catch {
            return {};
        }
    });
    const [newTag, setNewTag] = useState('');
    const [pinnedEntries, setPinnedEntries] = useState<PinnedEntry[]>([]);

    graphDataRef.current = graph;
    selectedNodeRef.current = selectedNode;
    pinnedEntriesRef.current = pinnedEntries;
    diagramLayoutRef.current = diagramLayout;

    const selectedTags = selectedNode ? tagsState[selectedNode.id] ?? [] : [];
    const pinnedIdSet = useMemo(
        () => new Set(pinnedEntries.map((entry) => entry.id)),
        [pinnedEntries],
    );

    return {
        graphRef,
        graphDataRef,
        selectedNodeRef,
        pinnedEntriesRef,
        diagramLayoutRef,
        graphTag,
        graphLoading,
        setGraphLoading,
        error,
        setError,
        graph,
        setGraph,
        selectedNode,
        setSelectedNode,
        productName,
        setProductName,
        productAlias,
        setProductAlias,
        diagramNameFilter,
        setDiagramNameFilter,
        diagramLayout,
        setDiagramLayout,
        interactionMode,
        setInteractionMode,
        diagramHistory,
        setDiagramHistory,
        typeVisibility,
        setTypeVisibility,
        tagsState,
        setTagsState,
        newTag,
        setNewTag,
        pinnedEntries,
        setPinnedEntries,
        selectedTags,
        pinnedIdSet,
    };
};
