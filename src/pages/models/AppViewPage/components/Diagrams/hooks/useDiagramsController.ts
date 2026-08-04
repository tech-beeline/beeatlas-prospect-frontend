import { useCallback, useState } from 'react';

import { layoutStorageKey, loadLayout } from '../utils';

import { UseDiagramsControllerResult } from './types';
import { useDiagramsActions } from './useDiagramsActions';
import { useDiagramsDerived } from './useDiagramsDerived';
import { useDiagramsEffects } from './useDiagramsEffects';
import { useDiagramsGraph } from './useDiagramsGraph';
import { useDiagramsState } from './useDiagramsState';

export const useDiagramsController = (cmdb: string | null): UseDiagramsControllerResult => {
    const state = useDiagramsState();
    const { findNodeByStableId, searchByLabelAndName, loadMergedSubgraph } = useDiagramsGraph();
    const [systemRootLoaded, setSystemRootLoaded] = useState(false);
    const {
        productAlias,
        productName,
        graphTag,
        pinnedEntriesRef,
        setGraphLoading,
        setError,
        setGraph,
        setSelectedNode,
        setDiagramLayout,
        setDiagramHistory,
    } = state;

    const loadSystemRoot = useCallback(async () => {
        if (!productAlias.trim() && !productName.trim()) {
            return;
        }
        setGraphLoading(true);
        setError(null);
        try {
            const systemsByName = productName.trim()
                ? await searchByLabelAndName(graphTag, 'SoftwareSystem', productName)
                : [];
            const systems = systemsByName.length
                ? systemsByName
                : await searchByLabelAndName(graphTag, 'SoftwareSystem', productAlias);
            const exact =
                systems.find(
                    (system) =>
                        system.name.trim().toLowerCase() === productName.trim().toLowerCase(),
                ) ??
                systems.find(
                    (system) =>
                        system.name.trim().toLowerCase() === productAlias.trim().toLowerCase(),
                ) ??
                systems[0];
            if (!exact) {
                setGraph({ nodes: [], edges: [] });
                setSelectedNode(null);
                setDiagramLayout(null);
                return;
            }
            const subgraph = await loadMergedSubgraph(exact, graphTag, pinnedEntriesRef.current);
            setDiagramLayout(loadLayout(layoutStorageKey(productAlias, exact.id)));
            setGraph(subgraph);
            setSelectedNode(exact);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка загрузки диаграммы');
        } finally {
            setGraphLoading(false);
            setSystemRootLoaded(true);
        }
    }, [
        graphTag,
        loadMergedSubgraph,
        pinnedEntriesRef,
        productAlias,
        productName,
        searchByLabelAndName,
        setDiagramLayout,
        setError,
        setGraph,
        setGraphLoading,
        setSelectedNode,
    ]);

    const {
        onOpenNode,
        onBack,
        onLayoutPersist,
        onTypeVisibilityChange,
        onAddTag,
        onRemoveTag,
        onTogglePin,
        onGraphNodeClick,
    } = useDiagramsActions({ state, loadMergedSubgraph });
    const onCloseNode = useCallback(() => {
        setSelectedNode(null);
    }, [setSelectedNode]);
    useDiagramsEffects({
        cmdb,
        productAlias: state.productAlias,
        setProductAlias: state.setProductAlias,
        setProductName: state.setProductName,
        setError: (message) => state.setError(message),
        setPinnedEntries: state.setPinnedEntries,
        setDiagramHistory: state.setDiagramHistory,
        loadSystemRoot,
    });
    const { visibleGraphData, tagCountByNodeId } = useDiagramsDerived(state);

    const openByNodeId = useCallback(
        async (nodeId: string) => {
            const trimmed = nodeId.trim();
            if (!trimmed) return;
            setGraphLoading(true);
            setError(null);
            try {
                const node = await findNodeByStableId(graphTag, trimmed);
                if (!node) {
                    setError('Узел не найден');
                    return;
                }
                const subgraph = await loadMergedSubgraph(node, graphTag, pinnedEntriesRef.current);
                setDiagramHistory([]);
                setDiagramLayout(loadLayout(layoutStorageKey(productAlias, node.id)));
                setGraph(subgraph);
                setSelectedNode(node);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Ошибка открытия узла');
            } finally {
                setGraphLoading(false);
            }
        },
        [
            findNodeByStableId,
            graphTag,
            loadMergedSubgraph,
            pinnedEntriesRef,
            productAlias,
            setDiagramHistory,
            setDiagramLayout,
            setError,
            setGraph,
            setGraphLoading,
            setSelectedNode,
        ],
    );

    const onToggleInteractionMode = useCallback(() => {
        state.setInteractionMode((prev) => (prev === 'edit' ? 'view' : 'edit'));
    }, [state]);

    return {
        graphRef: state.graphRef,
        graphLoading: state.graphLoading,
        systemRootLoaded,
        visibleGraphData,
        selectedNode: state.selectedNode,
        diagramHistoryLength: state.diagramHistory.length,
        typeVisibility: state.typeVisibility,
        diagramNameFilter: state.diagramNameFilter,
        tagCountByNodeId,
        pinnedIdSet: state.pinnedIdSet,
        selectedTags: state.selectedTags,
        newTag: state.newTag,
        error: state.error,
        diagramLayout: state.diagramLayout,
        interactionMode: state.interactionMode,
        onToggleInteractionMode,
        openByNodeId,
        openNodeAsync: onOpenNode,
        onTypeVisibilityChange,
        onFilterChange: state.setDiagramNameFilter,
        onOpenNode: (node) => void onOpenNode(node),
        onCloseNode,
        onGraphNodeClick,
        onBack,
        onTogglePin,
        onNewTagChange: state.setNewTag,
        onAddTag,
        onRemoveTag,
        onLayoutPersist,
    };
};
