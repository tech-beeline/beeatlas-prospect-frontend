import { C4Node } from '../GraphCanvas/types';

export interface RightPanelProps {
    selectedNode: C4Node;
    onHide: () => void;
    pinnedNodeIds: Set<string>;
    onTogglePin: (node: C4Node) => void;
    selectedTags: string[];
    newTag: string;
    onNewTagChange: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (index: number) => void;
    error: string | null;
}
