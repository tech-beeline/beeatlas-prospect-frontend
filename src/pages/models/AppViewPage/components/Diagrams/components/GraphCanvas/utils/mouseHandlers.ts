import type React from 'react';

import type { UseGraphCanvasMouseHandlersParams } from '../hooks/types';

export const useGraphCanvasMouseHandlers = (params: UseGraphCanvasMouseHandlersParams) => {
    const {
        canvasRef,
        interactionModeRef,
        layoutRef,
        clusterMetaRef,
        clusterMemberOffsetsRef,
        panRef,
        zoomRef,
        pinnedNodeIdsRef,
        onPinToggleRef,
        onNodeClick,
        simNodesRef,
        layoutVersionRef,
        clearGeometryCache,
        drawRef,
        dragRef,
        editDragRef,
        suppressClickRef,
        setContainerTooltip,
        nodeDisplayName,
        isClusterNode,
        hitTestRectLast,
        hitTestPinToggle,
        hitTestEditDrag,
        hitTestClusterMember,
        clampMemberOffset,
        clusterMemberOffsetKey,
        isNameTruncated,
        NODE_NAME_MAX_CHARS,
        CLUSTER_MEMBER_NAME_MAX_CHARS,
        emitLayoutPersist,
        onLayoutPersistRef,
    } = params;

    const toWorld = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const x = (clientX - rect.left - panRef.current.x) / zoomRef.current;
        const y = (clientY - rect.top - panRef.current.y) / zoomRef.current;
        return { x, y, rect };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (
            canvas &&
            onPinToggleRef.current &&
            pinnedNodeIdsRef.current !== undefined &&
            pinnedNodeIdsRef.current !== null
        ) {
            const w = toWorld(e.clientX, e.clientY);
            if (!w) return;
            const hit = hitTestRectLast(layoutRef.current, w.x, w.y);
            if (hit && !isClusterNode(hit.node) && hitTestPinToggle(hit, w.x, w.y)) {
                return;
            }
        }

        if (!canvas) return;
        const w = toWorld(e.clientX, e.clientY);
        if (!w) return;

        if (interactionModeRef.current === 'edit') {
            const eh = hitTestEditDrag(
                layoutRef.current,
                clusterMetaRef.current,
                w.x,
                w.y,
                clusterMemberOffsetsRef.current,
            );
            if (eh) {
                suppressClickRef.current = false;
                if (eh.kind === 'member') {
                    editDragRef.current = {
                        type: 'member',
                        nodeId: eh.clusterId,
                        clusterId: eh.clusterId,
                        memberId: eh.member.id,
                        memberIdx: eh.memberIdx,
                        startClientX: e.clientX,
                        startClientY: e.clientY,
                        lastClientX: e.clientX,
                        lastClientY: e.clientY,
                    };
                } else {
                    editDragRef.current = {
                        type: 'node',
                        nodeId: eh.nodeId,
                        startClientX: e.clientX,
                        startClientY: e.clientY,
                        lastClientX: e.clientX,
                        lastClientY: e.clientY,
                    };
                }
                dragRef.current.dragging = false;
                canvas.style.cursor = 'move';
                return;
            }
        }

        dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
        canvas.style.cursor = 'grabbing';
    };

    const handleMouseHover = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || dragRef.current.dragging) return;
        const w = toWorld(e.clientX, e.clientY);
        if (!w) return;

        if (interactionModeRef.current === 'edit') {
            const eh = hitTestEditDrag(
                layoutRef.current,
                clusterMetaRef.current,
                w.x,
                w.y,
                clusterMemberOffsetsRef.current,
            );
            if (eh) {
                canvas.style.cursor = 'move';
                return;
            }
        }

        const hovered = hitTestRectLast(layoutRef.current, w.x, w.y);
        if (!hovered) {
            canvas.style.cursor = 'grab';
            setContainerTooltip((prev) => (prev.open ? { ...prev, open: false } : prev));
            return;
        }

        if (
            pinnedNodeIdsRef.current !== undefined &&
            !isClusterNode(hovered.node) &&
            hitTestPinToggle(hovered, w.x, w.y)
        ) {
            canvas.style.cursor = 'pointer';
            return;
        }

        if (!isClusterNode(hovered.node)) {
            canvas.style.cursor = 'pointer';
            const full = nodeDisplayName(hovered.node);
            if (isNameTruncated(full, NODE_NAME_MAX_CHARS)) {
                const left = e.clientX - w.rect.left;
                const top = e.clientY - w.rect.top;
                setContainerTooltip({ open: true, x: left, y: top, text: full });
            } else {
                setContainerTooltip((prev) => (prev.open ? { ...prev, open: false } : prev));
            }
            return;
        }

        const cm = clusterMetaRef.current.get(hovered.node.id);
        if (cm) {
            const member = hitTestClusterMember(
                hovered,
                cm,
                w.x,
                w.y,
                clusterMemberOffsetsRef.current,
            );
            if (member) {
                canvas.style.cursor = interactionModeRef.current === 'edit' ? 'move' : 'pointer';
                const full = nodeDisplayName(member);
                if (isNameTruncated(full, CLUSTER_MEMBER_NAME_MAX_CHARS)) {
                    const left = e.clientX - w.rect.left;
                    const top = e.clientY - w.rect.top;
                    setContainerTooltip({ open: true, x: left, y: top, text: full });
                } else {
                    setContainerTooltip((prev) => (prev.open ? { ...prev, open: false } : prev));
                }
                return;
            }
        }

        canvas.style.cursor = 'grab';
        setContainerTooltip((prev) => (prev.open ? { ...prev, open: false } : prev));
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ed = editDragRef.current;
        if (ed) {
            const z = zoomRef.current;
            const dx = (e.clientX - ed.lastClientX) / z;
            const dy = (e.clientY - ed.lastClientY) / z;
            ed.lastClientX = e.clientX;
            ed.lastClientY = e.clientY;

            if (ed.type === 'node') {
                const sn = simNodesRef.current.find((s) => s.id === ed.nodeId);
                if (sn) {
                    sn.x = (sn.x ?? 0) + dx;
                    sn.y = (sn.y ?? 0) + dy;
                    sn.fx = sn.x;
                    sn.fy = sn.y;
                }
            } else if (ed.clusterId && ed.memberId != null && ed.memberIdx !== undefined) {
                const ln = layoutRef.current.find((l) => l.node.id === ed.clusterId);
                const cm = clusterMetaRef.current.get(ed.clusterId);
                if (ln && cm) {
                    const key = clusterMemberOffsetKey(ed.clusterId, ed.memberId);
                    const prev = clusterMemberOffsetsRef.current[key] ?? { dx: 0, dy: 0 };
                    clusterMemberOffsetsRef.current[key] = clampMemberOffset(
                        ln,
                        cm,
                        ed.memberIdx,
                        prev.dx + dx,
                        prev.dy + dy,
                    );
                }
            }
            layoutVersionRef.current += 1;
            clearGeometryCache();
            drawRef.current();
            return;
        }

        if (!dragRef.current.dragging) {
            handleMouseHover(e);
            return;
        }

        const panDx = e.clientX - dragRef.current.lastX;
        const panDy = e.clientY - dragRef.current.lastY;
        panRef.current.x += panDx;
        panRef.current.y += panDy;
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
        drawRef.current();
        canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        const ed = editDragRef.current;
        if (ed) {
            const moved = Math.hypot(e.clientX - ed.startClientX, e.clientY - ed.startClientY);
            if (moved > 6) suppressClickRef.current = true;
            editDragRef.current = null;
            if (onLayoutPersistRef.current) emitLayoutPersist();
        }
        dragRef.current.dragging = false;
        if (canvas) {
            canvas.style.cursor = 'grab';
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const w = toWorld(e.clientX, e.clientY);
        if (!w) return;

        const clicked = hitTestRectLast(layoutRef.current, w.x, w.y);
        if (!clicked) return;

        if (
            onPinToggleRef.current &&
            pinnedNodeIdsRef.current !== undefined &&
            !isClusterNode(clicked.node) &&
            hitTestPinToggle(clicked, w.x, w.y)
        ) {
            const pinned = pinnedNodeIdsRef.current.has(clicked.node.id);
            onPinToggleRef.current(clicked.node, !pinned);
            return;
        }

        if (isClusterNode(clicked.node)) {
            const cm = clusterMetaRef.current.get(clicked.node.id);
            const member = cm
                ? hitTestClusterMember(clicked, cm, w.x, w.y, clusterMemberOffsetsRef.current)
                : null;
            if (member) onNodeClick(member);
            return;
        }

        onNodeClick(clicked.node);
    };

    const handleMouseLeave = () => {
        setContainerTooltip((prev) => (prev.open ? { ...prev, open: false } : prev));
        if (editDragRef.current && onLayoutPersistRef.current) emitLayoutPersist();
        dragRef.current.dragging = false;
        editDragRef.current = null;
        const c = canvasRef.current;
        if (c) c.style.cursor = 'grab';
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseHover,
        handleClick,
        handleMouseLeave,
    };
};
