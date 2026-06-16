import React, { FC } from 'react';

import { ImageVariants, NotFoundBlock } from 'components/other';
import { Skeleton } from 'components/ui';

import {
    DiagramToolbar,
    GraphCanvas,
    LeftPanel,
    PanelRestoreButton,
    RightPanel,
} from './components';
import { KNOWN_LABELS } from './const';
import { useDiagramFocusSync, useDiagramsController, usePanelsState } from './hooks';
import { IDiagrams } from './types';
import * as S from './units';

export const Diagrams: FC<IDiagrams> = ({ cmdb }) => {
    const controller = useDiagramsController(cmdb);
    const { visibleGraphData, selectedNode, interactionMode, graphRef, pinnedIdSet } = controller;
    const panels = usePanelsState();

    useDiagramFocusSync(controller);

    const hasNodes = visibleGraphData.nodes.length > 0;

    if (!controller.systemRootLoaded) {
        return <Skeleton height={300} style={{ width: '100%' }} radius={12} />;
    }

    return (
        <S.Root>
            {panels.leftVisible && (
                <LeftPanel
                    labels={KNOWN_LABELS}
                    typeVisibility={controller.typeVisibility}
                    onTypeVisibilityChange={controller.onTypeVisibilityChange}
                    filterValue={controller.diagramNameFilter}
                    onFilterChange={controller.onFilterChange}
                    nodes={visibleGraphData.nodes}
                    selectedNodeId={selectedNode?.id ?? null}
                    onNodeClick={controller.onOpenNode}
                    onClose={panels.hideLeft}
                />
            )}

            <S.Main>
                <DiagramToolbar
                    canGoBack={controller.diagramHistoryLength > 0}
                    graphRef={graphRef}
                    onBack={controller.onBack}
                    interactionMode={interactionMode}
                    onToggleInteractionMode={controller.onToggleInteractionMode}
                />

                <S.CanvasWrap>
                    {hasNodes ? (
                        <GraphCanvas
                            ref={graphRef}
                            nodes={visibleGraphData.nodes}
                            edges={visibleGraphData.edges}
                            focusNodeId={selectedNode?.id ?? null}
                            selectedNodeId={selectedNode?.id ?? null}
                            tagCountByNodeId={controller.tagCountByNodeId}
                            pinnedNodeIds={pinnedIdSet}
                            onPinToggle={controller.onTogglePin}
                            interactionMode={controller.interactionMode}
                            onNodeClick={controller.onGraphNodeClick}
                            initialLayout={controller.diagramLayout}
                            onLayoutPersist={controller.onLayoutPersist}
                        />
                    ) : (
                        <S.CanvasState>
                            <NotFoundBlock
                                imageVariant={ImageVariants.EMPTY_BOX}
                                title="Диаграмма пуста"
                                text={null}
                            />
                        </S.CanvasState>
                    )}
                </S.CanvasWrap>
                {!panels.leftVisible && (
                    <PanelRestoreButton side="left" onClick={panels.showLeft} />
                )}
                {!panels.rightVisible && (
                    <PanelRestoreButton side="right" onClick={panels.showRight} />
                )}
            </S.Main>

            {panels.rightVisible && selectedNode && (
                <RightPanel
                    selectedNode={selectedNode}
                    onHide={panels.hideRight}
                    pinnedNodeIds={pinnedIdSet}
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
