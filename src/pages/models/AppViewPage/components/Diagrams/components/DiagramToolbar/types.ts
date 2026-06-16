import { RefObject } from 'react';

import { GraphCanvasHandle } from '../GraphCanvas/types';

export interface DiagramToolbarProps {
    canGoBack: boolean;
    graphRef: RefObject<GraphCanvasHandle>;
    onBack: () => void;
    interactionMode: 'view' | 'edit';
    onToggleInteractionMode: () => void;
}
