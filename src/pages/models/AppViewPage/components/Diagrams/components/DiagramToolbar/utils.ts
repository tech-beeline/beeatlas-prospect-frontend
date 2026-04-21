import { RefObject } from 'react';

import { GraphCanvasHandle } from '../GraphCanvas/types';

export const runGraphAction = (
    graphRef: RefObject<GraphCanvasHandle>,
    action: (handle: GraphCanvasHandle) => void,
) => {
    const handle = graphRef.current;
    if (!handle) {
        return;
    }
    action(handle);
};
