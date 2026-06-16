import { useCallback } from 'react';

import { C4Node } from '../components';
import { TAG_STORAGE_KEY } from '../const';
import { C4Label, DiagramLayoutPersist, PinnedEntry } from '../types';
import {
    cloneC4Node,
    cloneGraphData,
    layoutStorageKey,
    loadLayout,
    persistPinnedEntries,
    saveLayout,
} from '../utils';

import { IUseDiagramsActions } from './types';

export const useDiagramsActions = ({ state, loadMergedSubgraph }: IUseDiagramsActions) => {
    const persistTags = useCallback(
        (next: Record<string, string[]>) => {
            state.setTagsState(next);
            localStorage.setItem(TAG_STORAGE_KEY, JSON.stringify(next));
        },
        [state],
    );

    const refetchGraphForPins = useCallback(
        async (nextPins: PinnedEntry[]) => {
            if (!state.selectedNode) {
                return;
            }
            state.setGraphLoading(true);
            state.setError(null);
            try {
                const nextGraph = await loadMergedSubgraph(
                    state.selectedNode,
                    state.graphTag,
                    nextPins,
                );
                state.setGraph(nextGraph);
            } catch (e) {
                state.setError(e instanceof Error ? e.message : 'Ошибка загрузки диаграммы');
            } finally {
                state.setGraphLoading(false);
            }
        },
        [loadMergedSubgraph, state],
    );

    const handlePinToggle = useCallback(
        (node: C4Node, pinned: boolean) => {
            state.setPinnedEntries((prev) => {
                let next: PinnedEntry[];
                if (pinned) {
                    if (prev.some((entry) => entry.id === node.id)) {
                        return prev;
                    }
                    const originalName =
                        typeof node.properties.originalName === 'string'
                            ? node.properties.originalName
                            : undefined;
                    next = [
                        ...prev,
                        {
                            id: node.id,
                            name: node.name,
                            labels: [...node.labels],
                            ...(originalName ? { originalName } : {}),
                        },
                    ];
                } else {
                    next = prev.filter((entry) => entry.id !== node.id);
                }
                persistPinnedEntries(state.productAlias, next);
                state.pinnedEntriesRef.current = next;
                void refetchGraphForPins(next);
                return next;
            });
        },
        [refetchGraphForPins, state],
    );

    const onOpenNode = useCallback(
        async (node: C4Node) => {
            const currentGraph = state.graphDataRef.current;
            const currentSelected = state.selectedNodeRef.current;
            if (currentSelected && currentGraph.nodes.length > 0) {
                state.setDiagramHistory((history) => [
                    ...history,
                    {
                        graph: cloneGraphData(currentGraph),
                        selectedNode: cloneC4Node(currentSelected),
                        diagramLayout: state.diagramLayoutRef.current,
                    },
                ]);
            }
            state.setGraphLoading(true);
            state.setError(null);
            try {
                const subgraph = await loadMergedSubgraph(
                    node,
                    state.graphTag,
                    state.pinnedEntriesRef.current,
                );
                state.setDiagramLayout(loadLayout(layoutStorageKey(state.productAlias, node.id)));
                state.setGraph(subgraph);
                state.setSelectedNode(node);
            } catch (e) {
                state.setError(e instanceof Error ? e.message : 'Ошибка загрузки узла');
            } finally {
                state.setGraphLoading(false);
            }
        },
        [loadMergedSubgraph, state],
    );

    const onBack = useCallback(() => {
        state.setDiagramHistory((prev) => {
            if (prev.length === 0) return prev;
            const entry = prev[prev.length - 1]!;
            state.setGraph(entry.graph);
            state.setSelectedNode(entry.selectedNode);
            state.setDiagramLayout(
                entry.diagramLayout ??
                    loadLayout(layoutStorageKey(state.productAlias, entry.selectedNode.id)),
            );
            return prev.slice(0, -1);
        });
    }, [state]);

    const onLayoutPersist = useCallback(
        (layout: DiagramLayoutPersist) => {
            if (!state.selectedNode) return;
            state.setDiagramLayout(layout);
            saveLayout(layoutStorageKey(state.productAlias, state.selectedNode.id), layout);
        },
        [state],
    );

    const onTypeVisibilityChange = useCallback(
        (label: C4Label, checked: boolean) => {
            state.setTypeVisibility((prev) => ({ ...prev, [label]: checked }));
        },
        [state],
    );

    const onAddTag = useCallback(() => {
        const tag = state.newTag.trim();
        if (!tag || !state.selectedNode) return;
        const current = state.tagsState[state.selectedNode.id] ?? [];
        persistTags({ ...state.tagsState, [state.selectedNode.id]: [...current, tag] });
        state.setNewTag('');
    }, [persistTags, state]);

    const onRemoveTag = useCallback(
        (index: number) => {
            if (!state.selectedNode) return;
            const current = state.tagsState[state.selectedNode.id] ?? [];
            const nextTags = current.filter((_, i) => i !== index);
            const next = { ...state.tagsState };
            if (nextTags.length === 0) delete next[state.selectedNode.id];
            else next[state.selectedNode.id] = nextTags;
            persistTags(next);
        },
        [persistTags, state],
    );

    const onTogglePin = useCallback(
        (node: C4Node) => handlePinToggle(node, !state.pinnedIdSet.has(node.id)),
        [handlePinToggle, state.pinnedIdSet],
    );

    const onGraphNodeClick = useCallback(
        (node: C4Node) => {
            state.setSelectedNode(node);
            void onOpenNode(node);
        },
        [onOpenNode, state],
    );

    return {
        onOpenNode,
        onBack,
        onLayoutPersist,
        onTypeVisibilityChange,
        onAddTag,
        onRemoveTag,
        onTogglePin,
        onGraphNodeClick,
    };
};
