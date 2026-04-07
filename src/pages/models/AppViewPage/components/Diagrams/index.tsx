import React, { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon, Skeleton } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont';

import { DiagramToolbar, GraphCanvas, LeftPanel, RightPanel } from './components';
import { KNOWN_LABELS } from './const';
import { useDiagramsController } from './hooks';
import { IDiagrams } from './types';
import * as S from './units';
import { DIAGRAM_FOCUS_PARAM } from './url';

export const Diagrams: FC<IDiagrams> = ({ cmdb }) => {
    const controller = useDiagramsController(cmdb);
    const [params, setSearchParams] = useSearchParams();
    const focusedRef = useRef(false);
    const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
    const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
    const isLoading = !controller.systemRootLoaded;

    // Sync only selected node into URL so it can be shared.
    useEffect(() => {
        if (!controller.selectedNode) return;
        const current = params.get(DIAGRAM_FOCUS_PARAM);
        if (current === controller.selectedNode.id) return;
        const next = new URLSearchParams(params);
        next.set(DIAGRAM_FOCUS_PARAM, controller.selectedNode.id);
        setSearchParams(next, { replace: true });
    }, [controller.selectedNode?.id]);

    // Open specific node from URL (readable link): ?node=<english-id>
    useEffect(() => {
        if (focusedRef.current) return;
        if (controller.graphLoading) return;
        if (!controller.systemRootLoaded) return;

        const focusId = params.get(DIAGRAM_FOCUS_PARAM);
        if (!focusId || focusId === controller.selectedNode?.id) {
            focusedRef.current = true;
            return;
        }

        focusedRef.current = true;
        void controller.openByNodeId(focusId);
    }, [controller.graphLoading, controller.selectedNode?.id]);

    if (isLoading) {
        return <Skeleton height={300} style={{ width: '100%' }} radius={12} />;
    }

    return (
        <S.Root>
            {isLeftPanelVisible && (
                <LeftPanel
                    labels={KNOWN_LABELS}
                    typeVisibility={controller.typeVisibility}
                    onTypeVisibilityChange={controller.onTypeVisibilityChange}
                    filterValue={controller.diagramNameFilter}
                    onFilterChange={controller.onFilterChange}
                    nodes={controller.visibleGraphData.nodes}
                    selectedNodeId={controller.selectedNode?.id ?? null}
                    onNodeClick={controller.onOpenNode}
                    onClose={() => setIsLeftPanelVisible(false)}
                />
            )}

            <S.Main>
                <DiagramToolbar
                    canGoBack={controller.diagramHistoryLength > 0}
                    graphRef={controller.graphRef}
                    onBack={controller.onBack}
                    interactionMode={controller.interactionMode}
                    onToggleInteractionMode={controller.onToggleInteractionMode}
                />

                <S.CanvasWrap>
                    {controller.visibleGraphData.nodes.length === 0 && (
                        <S.CanvasState>Диаграмма пуста</S.CanvasState>
                    )}
                    {controller.visibleGraphData.nodes.length > 0 && (
                        <GraphCanvas
                            ref={controller.graphRef}
                            nodes={controller.visibleGraphData.nodes}
                            edges={controller.visibleGraphData.edges}
                            focusNodeId={controller.selectedNode?.id ?? null}
                            selectedNodeId={controller.selectedNode?.id ?? null}
                            tagCountByNodeId={controller.tagCountByNodeId}
                            pinnedNodeIds={controller.pinnedIdSet}
                            onPinToggle={(node) => controller.onTogglePin(node)}
                            interactionMode={controller.interactionMode}
                            onNodeClick={controller.onGraphNodeClick}
                            initialLayout={controller.diagramLayout}
                            onLayoutPersist={controller.onLayoutPersist}
                        />
                    )}
                </S.CanvasWrap>
                {!isLeftPanelVisible && (
                    <S.LeftPanelRestoreHit>
                        <S.PanelEdgeToggleButton
                            type="button"
                            $surface="leftPanel"
                            onClick={() => setIsLeftPanelVisible(true)}
                            aria-label="Показать панель"
                        >
                            <Icon size="medium" iconName={Icons.NavArrowRight} />
                        </S.PanelEdgeToggleButton>
                    </S.LeftPanelRestoreHit>
                )}
                {!isRightPanelVisible && (
                    <S.RightPanelRestoreHit>
                        <S.PanelEdgeToggleButton
                            type="button"
                            $surface="rightPanel"
                            onClick={() => setIsRightPanelVisible(true)}
                            aria-label="Показать панель"
                        >
                            <Icon size="medium" iconName={Icons.NavArrowLeft} />
                        </S.PanelEdgeToggleButton>
                    </S.RightPanelRestoreHit>
                )}
            </S.Main>

            {isRightPanelVisible && (
                <RightPanel
                    selectedNode={controller.selectedNode}
                    onHide={() => setIsRightPanelVisible(false)}
                    pinnedNodeIds={controller.pinnedIdSet}
                    onTogglePin={controller.onTogglePin}
                    selectedTags={controller.selectedTags}
                    newTag={controller.newTag}
                    onNewTagChange={controller.onNewTagChange}
                    onAddTag={controller.onAddTag}
                    onRemoveTag={controller.onRemoveTag}
                    error={controller.error}
                />
            )}
        </S.Root>
    );
};
