import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DIAGRAM_FOCUS_PARAM } from '../const';

import { IFocusSyncController } from './types';

export const useDiagramFocusSync = (controller: IFocusSyncController) => {
    const [params, setSearchParams] = useSearchParams();
    const focusedRef = useRef(false);

    useEffect(() => {
        if (!controller.selectedNode) return;

        const current = params.get(DIAGRAM_FOCUS_PARAM);
        if (current === controller.selectedNode.id) return;

        const next = new URLSearchParams(params);
        next.set(DIAGRAM_FOCUS_PARAM, controller.selectedNode.id);

        setSearchParams(next, { replace: true });
    }, [controller.selectedNode?.id]);

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
    }, [controller.graphLoading]);
};
