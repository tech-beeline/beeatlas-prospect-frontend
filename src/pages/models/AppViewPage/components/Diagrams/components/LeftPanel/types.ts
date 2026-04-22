import { C4Label } from '../../types';
import { C4Node } from '../GraphCanvas/types';

export interface LeftPanelProps {
    labels: C4Label[];
    typeVisibility: Record<C4Label, boolean>;
    onTypeVisibilityChange: (label: C4Label, checked: boolean) => void;
    filterValue: string;
    onFilterChange: (value: string) => void;
    nodes: C4Node[];
    selectedNodeId: string | null;
    onNodeClick: (node: C4Node) => void;
    onClose: () => void;
}
